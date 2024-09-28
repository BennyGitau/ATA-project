from rest_framework import serializers
from .models import SearchQuery

#flights list serializer
class FlightListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchQuery
        fields = ['origin', 'destination', 'duration']


class FlightSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SearchQuery
        fields = ['origin', 'destination', 'departure_date']


#traveler data
class NameSerializer(serializers.Serializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()

class PhoneSerializer(serializers.Serializer):
    deviceType = serializers.CharField()
    countryCallingCode = serializers.CharField()
    number = serializers.CharField()

class ContactSerializer(serializers.Serializer):
    emailAddress = serializers.EmailField()
    phones = PhoneSerializer(many=True)

class DocumentSerializer(serializers.Serializer):
    documentType = serializers.CharField()
    birthPlace = serializers.CharField()
    issuanceLocation = serializers.CharField()
    issuanceDate = serializers.DateField()
    docNumber = serializers.CharField()
    expiryDate = serializers.DateField()
    issuanceCountry = serializers.CharField()
    validityCountry = serializers.CharField()
    nationality = serializers.CharField()
    holder = serializers.BooleanField()

class TravelerSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    dateOfBirth = serializers.DateField()
    name = NameSerializer()
    gender = serializers.CharField()
    contact = ContactSerializer()
    documents = DocumentSerializer(many=True)

class FlightBookingSerializer(serializers.Serializer):
    flightOfferId = serializers.CharField()
    cache_key = serializers.CharField()
    traveler = TravelerSerializer(many=True)
    def create(self, validated_data):
        # Handle how you create a flight booking instance from validated data
        # Extract nested data
        travelers_data = validated_data.pop('traveler')

        traveler_list= []

        for traveler in travelers_data:

            name_data = traveler.pop('name')
            contact_data = traveler.pop('contact')
            documents_data = traveler.pop('documents')

        # You can manipulate the data or pass it on to an external service (e.g., Amadeus API)
        traveler_data = {
            'id': traveler['id'],
            'dateOfBirth': traveler['dateOfBirth'],
            'name': {
                'firstName': name_data['firstName'],
                'lastName': name_data['lastName']
            },           
            'gender': validated_data['gender'],
            'contact': {
                'emailAddress': contact_data['emailAddress'],
                'phones': contact_data['phones']
            },
            'documents': documents_data
        }
        traveler_list.append(traveler_data)

        return traveler_list

    def update(self, instance, validated_data):
        # Handle how you update an existing flight booking instance
        pass

