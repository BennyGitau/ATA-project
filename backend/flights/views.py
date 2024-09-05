#from django.shortcuts import render
from django.core.cache import cache
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
#from rest_framework.decorators import api_view, schema
from rest_framework.views import APIView
#from rest_framework.schemas import ManualSchema
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from amadeus import Client, Location, ResponseError

from .serializers import FlightListSerializer, FlightSearchSerializer
from .models import SearchQuery, Booking
from dotenv import load_dotenv
import os

load_dotenv()
# Create your views here.
AMADEUS_API_KEY = os.getenv('AMADEUS_API_KEY')
AMADEUS_API_SECRET= os.getenv('AMADEUS_API_SECRET')
class HomeView(APIView):
    def get(self, request):
        return Response({"message": "Welcome to ATA API"})

amadeus = Client(
    client_id=AMADEUS_API_KEY,
    client_secret=AMADEUS_API_SECRET
    )
    
class FlightsSearchView(APIView):

    @swagger_auto_schema(
        operation_description="Search flights",
        request_body=FlightSearchSerializer,
        responses={
            200: FlightSearchSerializer(many=True),
            404: openapi.Response(description="flight not found"),
            500: openapi.Response(description="internal server error"),
            },
    )
    
    def get(self, request):  
        
        origin=request.query_params.get('origin') or 'JFK'
        destination=request.query_params.get('destination') or 'NYC'
        departure_date = request.query_params.get('departure_date') or None
        return_date = request.query_params.get('return_date') or None
        travel_class=request.query_params.get('travel_class') or None
        tripPurpose = request.query_params.get('tripPurpose') or None
        duration = request.query_params.get('duration') or None
        one_way = request.query_params.get('one_way') or False
        return_flight = request.query_params.get('return_flight') or False
        airlines = request.query_params.get('airlines') or None
        price = request.query_params.get('price') or None
        
        #validate the required parameters
        # if not origin or not destination or not departure_date or not return_date:
        #     return Response({"error": "Missing required parameters"}, status=status.HTTP_400_BAD_REQUEST)

          #save the search query in database before making the request if the search query exists do not save
        if not SearchQuery.objects.filter(origin=origin, destination=destination, departure_date=departure_date, return_date=return_date).exists():
            flight = SearchQuery.objects.create(
                origin=origin,
                destination=destination,
                departure_date=departure_date,
                return_date=return_date,
                travel_class=travel_class,
                trip_purpose=tripPurpose,
                duration=duration,
                one_way=one_way,
                return_flight=return_flight,
                airline=airlines,
                price=price
            )
        cache_key = f"flight_search_{origin}_{destination}_{departure_date}_{return_date}_{travel_class}_{tripPurpose}_{duration}_{one_way}_{return_flight}_{airlines}_{price}"
        cache_timeout = 60 * 60 # 1 hour

        cached_response = cache.get(cache_key)
        if cached_response:
            return Response(cached_response, status=status.HTTP_200_OK)

        #get the flight search data from amadeus
        try:
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode='JFK',
                destinationLocationCode='MAD',
                departureDate='2024-11-01',
                adults=1,
                # returnDate='',
                # travelClass='',
                # max=5,
                # maxPrice='',
                # children=0,
                # infants=0,
                # currencyCode='EUR',
                # nonStop='false',
                # includedAirlineCodes='',
                )
            response_data = response.data
            print(response_data)
            #save the cache
            cache.set(cache_key, response_data, cache_timeout)
        except ResponseError as error:
            return Response({"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        #book a flight
        #get the index that user selects
        if response_data and 'data' in response_data and len(response_data['data']) > 0:
            flight_to_book = response_data['data'][0]  # Select the first flight for booking

            # Extract flight offer ID
            flight_offer_id = flight_to_book.get('id')

            # Proceed with booking 
            # add payment
            try:
                booking_response = amadeus.booking.flight_orders.post(
                    data={
                        'flightOffer': {
                            'offerId': flight_offer_id,
                            'travellers': [{'id': '1', 'dateOfBirth': '1990-01-01', 'surname': 'Doe', 'givenName': 'John'}],  # Example traveller details
                            'pricingOptions': {'includedCheckedBagsOnly': True}
                            #add more data
                        }
                    }
                )
                booking_data = booking_response.data

                # Save the selected flight details to BookedFlight model after booking
                #update as per the returned response
                # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
                # origin = models.CharField(max_length=64, null=True, blank=True)
                # destination = models.CharField(max_length=64, null=True, blank=True)
                # departure_date= models.DateTimeField(null=True, blank=True)
                # departure_time = models.DateTimeField(null=True, blank=True)
                # return_date = models.DateTimeField(null=True, blank=True)
                # duration = models.IntegerField(null=True, blank=True)
                # one_way = models.BooleanField(default=False)
                # return_flight = models.BooleanField(default=False)
                # airline = models.CharField(max_length=64, null=True, blank=True)
                # price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
                # seats = models.IntegerField(null=True, blank=True)
                # num_tickets = models.IntegerField(null=True)
                # passenger_names = models.CharField(max_length=255, null=True)
                # contact_email = models.EmailField(null=True)
                # payment_status = models.CharField(max_length=32, null=True)

                booked_flight = Booking.objects.create(
                    flight_id=flight_to_book.get('id'),
                    origin = flight_to_book.get('origin'),                    
                    origin=flight_to_book.get('origin'),
                    destination=flight_to_book.get('destination'),
                    departure_date=flight_to_book.get('departureDate'),
                    return_date=flight_to_book.get('returnDate'),
                    price=flight_to_book.get('price'),
                    travel_class=flight_to_book.get('travelClass'),
                    airline=flight_to_book.get('airline'),
                    duration=flight_to_book.get('duration'),
                    one_way=flight_to_book.get('oneWay'),
                    return_flight=flight_to_book.get('returnFlight'),
                    seats=flight_to_book.get('seats'),
                    num_tickets=flight_to_book.get('numTickets'),
                    passenger_names=flight_to_book.get('passengerNames'),
                    contact_email=flight_to_book.get('contactEmail'),
                    payment_status=flight_to_book.get('paymentStatus'),
                    booking_data=booking_data  # Save booking data if needed
                )
                return Response({'message': 'Flight booked successfully', 'booked_flight': FlightSearchSerializer(booked_flight).data})

            except ResponseError as error:
                return Response({"error": str(error)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'No flights found'}, status=status.HTTP_404_NOT_FOUND)

        
#takes the selected return of the flightsearch and send the data for booking   
# class FlightBookingView(APIView):
#     @swagger_auto_schema(
#         operation_description="Book a flight",
#         request_body=FlightSearchSerializer,
#         responses={
#             200: FlightSearchSerializer(many=True),
#             404: openapi.Response(description="failed to book flight"),
#             500: openapi.Response(description="internal server error"),
#             },
#         )
#views
#flight search to amadeus or skyscanner
#flight booking
#flight status
#flight tracking
#flight history
#flight availability
#flight price
#reminders
#implement chatbot assistant for flight search, booking

# import json
# import ast
# from amadeus import Client, ResponseError, Location
# from django.shortcuts import render
# from django.contrib import messages
# from .flight import Flight
# from .booking import Booking
# from django.http import HttpResponse

# amadeus = Client()


# def demo(request):
#     # Retrieve data from the UI form
#     origin = request.POST.get("Origin")
#     destination = request.POST.get("Destination")
#     departure_date = request.POST.get("Departuredate")
#     return_date = request.POST.get("Returndate")

#     # Prepare url parameters for search
#     kwargs = {
#         "originLocationCode": origin,
#         "destinationLocationCode": destination,
#         "departureDate": departure_date,
#         "adults": 1,
#     }

#     # For a round trip, we use AI Trip Purpose Prediction
#     # to predict if it is a leisure or business trip
#     tripPurpose = ""
#     if return_date:
#         # Adds the parameter returnDate for the Flight Offers Search API call
#         kwargs["returnDate"] = return_date
#         kwargs_trip_purpose = {
#             "originLocationCode": origin,
#             "destinationLocationCode": destination,
#             "departureDate": departure_date,
#             "returnDate": return_date,
#         }
#         try:
#             # Calls Trip Purpose Prediction API
#             trip_purpose_response = amadeus.travel.predictions.trip_purpose.get(
#                 **kwargs_trip_purpose
#             ).data
#             tripPurpose = trip_purpose_response["result"]
#         except ResponseError as error:
#             messages.add_message(
#                 request, messages.ERROR, error.response.result["errors"][0]["detail"]
#             )
#             return render(request, "demo/home.html", {})

#     # Perform flight search based on previous inputs
#     if origin and destination and departure_date:
#         try:
#             search_flights = amadeus.shopping.flight_offers_search.get(**kwargs)
#         except ResponseError as error:
#             messages.add_message(
#                 request, messages.ERROR, error.response.result["errors"][0]["detail"]
#             )
#             return render(request, "demo/home.html", {})
#         search_flights_returned = []
#         response = ""
#         for flight in search_flights.data:
#             offer = Flight(flight).construct_flights()
#             search_flights_returned.append(offer)
#             response = zip(search_flights_returned, search_flights.data)

#         return render(
#             request,
#             "demo/results.html",
#             {
#                 "response": response,
#                 "origin": origin,
#                 "destination": destination,
#                 "departureDate": departure_date,
#                 "returnDate": return_date,
#                 "tripPurpose": tripPurpose
#             },
#         )
#     return render(request, "demo/home.html", {})


# def book_flight(request, flight):
#     # Create a fake traveler profile for booking
#     traveler = {
#         "id": "1",
#         "dateOfBirth": "1982-01-16",
#         "name": {"firstName": "JORGE", "lastName": "GONZALES"},
#         "gender": "MALE",
#         "contact": {
#             "emailAddress": "jorge.gonzales833@telefonica.es",
#             "phones": [
#                 {
#                     "deviceType": "MOBILE",
#                     "countryCallingCode": "34",
#                     "number": "480080076",
#                 }
#             ],
#         },
#         "documents": [
#             {
#                 "documentType": "PASSPORT",
#                 "birthPlace": "Madrid",
#                 "issuanceLocation": "Madrid",
#                 "issuanceDate": "2015-04-14",
#                 "number": "00000000",
#                 "expiryDate": "2025-04-14",
#                 "issuanceCountry": "ES",
#                 "validityCountry": "ES",
#                 "nationality": "ES",
#                 "holder": True,
#             }
#         ],
#     }
#     # Use Flight Offers Price to confirm price and availability
#     try:
#         flight_price_confirmed = amadeus.shopping.flight_offers.pricing.post(
#             ast.literal_eval(flight)
#         ).data["flightOffers"]
#     except (ResponseError, KeyError, AttributeError) as error:
#         messages.add_message(request, messages.ERROR, error.response.body)
#         return render(request, "demo/book_flight.html", {})

#     # Use Flight Create Orders to perform the booking
#     try:
#         order = amadeus.booking.flight_orders.post(
#             flight_price_confirmed, traveler
#         ).data
#     except (ResponseError, KeyError, AttributeError) as error:
#         messages.add_message(
#             request, messages.ERROR, error.response.result["errors"][0]["detail"]
#         )
#         return render(request, "demo/book_flight.html", {})

#     passenger_name_record = []
#     booking = Booking(order).construct_booking()
#     passenger_name_record.append(booking)

#     return render(request, "demo/book_flight.html", {"response": passenger_name_record})


# def origin_airport_search(request):
#     if request.is_ajax():
#         try:
#             data = amadeus.reference_data.locations.get(
#                 keyword=request.GET.get("term", None), subType=Location.ANY
#             ).data
#         except (ResponseError, KeyError, AttributeError) as error:
#             messages.add_message(
#                 request, messages.ERROR, error.response.result["errors"][0]["detail"]
#             )
#     return HttpResponse(get_city_airport_list(data), "application/json")


# def destination_airport_search(request):
#     if request.is_ajax():
#         try:
#             data = amadeus.reference_data.locations.get(
#                 keyword=request.GET.get("term", None), subType=Location.ANY
#             ).data
#         except (ResponseError, KeyError, AttributeError) as error:
#             messages.add_message(
#                 request, messages.ERROR, error.response.result["errors"][0]["detail"]
#             )
#     return HttpResponse(get_city_airport_list(data), "application/json")


# def get_city_airport_list(data):
#     result = []
#     for i, val in enumerate(data):
#         result.append(data[i]["iataCode"] + ", " + data[i]["name"])
#     result = list(dict.fromkeys(result))
#     return json.dumps(result)