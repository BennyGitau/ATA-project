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

from .serializers import FlightBookingSerializer, FlightSearchSerializer
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
    
    def post(self, request):
        serializer = FlightSearchSerializer(data=request.data) 
        
        if serializer.is_valid():
            # Extract the validated data
            origin = serializer.validated_data.get('origin') #originLocationCode required
            destination = serializer.validated_data.get('destination') #destinationLocationCode required
            departure_date = serializer.validated_data.get('departure_date') #departureDate required
            return_date = serializer.validated_data.get('return_date') or None #returnDate
            adults = serializer.validated_data.get('adults') #ok required
            children = serializer.validated_data.get('children') or None
            infants = serializer.validated_data.get('infants') or None
            travel_class = serializer.validated_data.get('travel_class') or None #travelClass         
            tripPurpose = serializer.validated_data.get('tripPurpose') or None
            duration = serializer.validated_data.get('duration') or None
            one_way = serializer.validated_data.get('one_way') or None
            return_flight = serializer.validated_data.get('return_flight') or None
            airlines = serializer.validated_data.get('airlines') or None
            price = serializer.validated_data.get('price') or None
             
        #validate the required parameters
        # if not origin or not destination or not departure_date or not return_date:
        #     return Response({"error": "Missing required parameters"}, status=status.HTTP_400_BAD_REQUEST)
        #get location code
        def get_location_code(location):
            try:
                response = amadeus.reference_data.locations.get(
                    subType='CITY,AIRPORT',
                    keyword=location
                    )
                if response.data and len(response.data) > 0:

                    return response.data[0]['iataCode']
            except ResponseError:
                return Response({"error":"location not found"})

        originIataCode = get_location_code(origin)
        destinationIataCode = get_location_code(destination)
        if not originIataCode:
            return Response({"error":"Invalid origin"}, status=status.HTTP_404_NOT_FOUND)
        if not destinationIataCode:
            return Response({"error":"Invalid destination"}, status=status.HTTP_404_NOT_FOUND)
        
        print(originIataCode, destinationIataCode)

          #add departure_date to cache key and replace hyphens with underscores
        cache_key = f"flight_search_{originIataCode}_{destinationIataCode}_{return_date}_{travel_class}_{tripPurpose}_{duration}_{one_way}_{return_flight}_{airlines}_{price}"
        
        cache_timeout = 60 * 60 # 1 hour

        cached_response = cache.get(cache_key)
        if cached_response:
            return Response({
                'flights':cached_response,
                'cache_key': cache_key
                }, status=status.HTTP_200_OK)
          #save the search query in database before making the request if the search query exists do not save
        if not SearchQuery.objects.filter(origin=origin, destination=destination, departure_date=departure_date, return_date=return_date).exists():
            SearchQuery.objects.create(
                origin=origin,
                destination=destination,
                originIataCode=originIataCode,
                destinationIataCode=destinationIataCode,
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
        

        #get the flight search data from amadeus
        try:
            response = amadeus.shopping.flight_offers_search.get(
                originLocationCode=originIataCode,
                destinationLocationCode=destinationIataCode,
                departureDate=departure_date.strftime('%Y-%m-%d'),
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
            if response_data:
                cache.set(cache_key, response_data, cache_timeout)
                return Response({
                    'flights':response_data,
                    'cache_key': cache_key
                    }, status=status.HTTP_200_OK)
            #save the cache
        except ResponseError as error:
            # Cache the miss with shorter timeout to prevent hammering the API
            cache.set(cache_key, {"error": str(error)}, cache_timeout // 2)
            return Response({"error": str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
 #flight offers search
class FlightAvailabilityView(APIView):
    @swagger_auto_schema(
        operation_description="Flight availability",
        request_body=FlightBookingSerializer,
        responses={
            200: FlightBookingSerializer(many=True),
            404: openapi.Response(description="flight not found"),
            500: openapi.Response(description="internal server error"),
            },
    )
    def post(self, request):
        serializer = FlightBookingSerializer(data=request.data) 
        if serializer.is_valid():
            travelers_data = serializer.create(serializer.validated_data)
        
        try:
            '''
            Confirm availability and price from SYD to BKK in summer 2022 //add the flight offer from f/
            '''
            flights = amadeus.shopping.flight_offers_search.get(originLocationCode='SYD', destinationLocationCode='BKK',
                                                                departureDate='2022-07-01', adults=1).data
            response_one_flight = amadeus.shopping.flight_offers.pricing.post(
                flights[0])
            # print(response_one_flight.data)

            response_two_flights = amadeus.shopping.flight_offers.pricing.post(
                flights[0:2])
            print(response_two_flights.data)
        except ResponseError as error:
            raise error
        
        # #flight availability search

        # try:
        #     body = {
        #         "originDestinations": [
        #             {
        #                 "id": "1",
        #                 "originLocationCode": "MIA",
        #                 "destinationLocationCode": "ATL",
        #                 "departureDateTime": {
        #                     "date": "2022-11-01"
        #                 }
        #             }
        #         ],
        #         "travelers": [
        #             {
        #                 "id": "1",
        #                 "travelerType": "ADULT"
        #             }
        #         ],
        #         "sources": [
        #             "GDS"
        #         ]
        #     }

        #     response = amadeus.shopping.availability.flight_availabilities.post(body)
        #     print(response.data)
        # except ResponseError as error:
        #     raise error
        
        # #seatmap display of flight in an order    
        # try:
        #     '''
        #     Retrieve the seat map of a flight present in an order
        #     '''
        #     response = amadeus.shopping.seatmaps.get(flightorderId='eJzTd9cPDPMwcooAAAtXAmE=')
        #     print(response.data)
        # except ResponseError as error:
        #     raise error


        # #seat map of a flight offer

        # try:
        #     '''
        #     Retrieve the seat map of a given flight offer 
        #     '''
        #     body = amadeus.shopping.flight_offers_search.get(originLocationCode='MAD',
        #                                                     destinationLocationCode='NYC',
        #                                                     departureDate='2022-11-01',
        #                                                     adults=1,
        #                                                     max=1).result
        #     response = amadeus.shopping.seatmaps.post(body)
        #     print(response.data)
        # except ResponseError as error:
        #     raise error

        #flight create order
class FlightBookingView(APIView):
    @swagger_auto_schema(
        operation_description="Flight booking",
        request_body=FlightBookingSerializer,
        responses={
            200: FlightBookingSerializer(many=True),
            404: openapi.Response(description="flight not found"),
            500: openapi.Response(description="internal server error"),
            },
    )
    def post(self, request):
        booking_data = request.data

        serializer = FlightBookingSerializer(data=request.data)

        if serializer.is_valid():
            travelers_data = serializer.create(serializer.validated_data)
            flightOfferId = serializer.validated_data.get('flightOfferId')
            cache_key = serializer.validated_data.get('cache_key')

        flight_search_results = cache.get(cache_key)
        if not flight_search_results:
            return Response({"error": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)

        flight_to_book = flight_search_results.get(flightOfferId)
        if not flight_to_book:
            return Response({"error": "Flight not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Flight Offers Price to confirm the price of the chosen flight
            price_confirm = amadeus.shopping.flight_offers.pricing.post(
                flight_to_book)
            
            #add error handling

            # Flight Create Orders to book the flight
            book_flight = amadeus.booking.flight_orders.post(
                price_confirm.data, travelers_data)

            response_data = book_flight.data
            #before saving the booking data comfirm if booking is successful
            if response_data.data.get('status') == 'SUCCESS'  and len(response_data) > 0:
                    #change to get the data from response after booking....
                    booked_flight = Booking.objects.create(
                    flight_id=response_data.get('id'),
                    origin=response_data.get('departure'),
                    destination=response_data.get('arrival'),
                    departure_date=response_data.get('departureDate'),
                    return_date=response_data.get('returnDate'),
                    price=response_data.get('price'),
                    travel_class=response_data.get('cabin'),
                    airline=response_data.get('airline'),
                    duration=response_data.get('duration'),
                    one_way=response_data.get('oneWay'),
                    return_flight=response_data.get('returnFlight'),
                    seats=response_data.get('seats'),
                    num_tickets=response_data.get('numTickets'),
                    passenger_names=response_data.get('passengerNames'),
                    contact_email=response_data.get('contactEmail'),
                    payment_status=response_data.get('paymentStatus'),
                    #booking_data=booking_data  # Save booking data if needed
                )
                    cache.delete(cache_key)
                    return Response({"message": "Flight booked successfully", "data": response_data})
            else:
                return Response({"error": "Flight booking failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
            # return Response({'message': 'Flight booked successfully', 'booked_flight': FlightSearchSerializer(booked_flight).data})

        except ResponseError as error:
            raise error

        #flight order management
class FlightOrderView(APIView):
    #flight order retrievement
    def get(self, request):

        try:
            '''
            # Retrieve the flight order based on it's id
            '''
            response = amadeus.booking.flight_order('MlpZVkFMfFdBVFNPTnwyMDE1LTExLTAy').get()
            print(response.data)
        except ResponseError as error:
            raise error
        
        #flight order delete
    def delete(self, request):
        try:
            '''
            # Delete a given flight order based on it's id
            '''
            response = amadeus.booking.flight_order('MlpZVkFMfFdBVFNPTnwyMDE1LTExLTAy').delete()
            print(response.data)
        except ResponseError as error:
            raise error


# #cheapest date search
# # Install the Python library from https://pypi.org/project/amadeus
# from amadeus import Client, ResponseError

# amadeus = Client(
#     client_id='YOUR_AMADEUS_API_KEY',
#     client_secret='YOUR_AMADEUS_API_SECRET'
# )

# try:
#     '''
#     Find cheapest dates from Madrid to Munich
#     '''
#     response = amadeus.shopping.flight_dates.get(origin='MAD', destination='MUC')
#     print(response.data)
# except ResponseError as error:
#     raise error

        
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