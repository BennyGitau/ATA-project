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
        fields = '__all__'