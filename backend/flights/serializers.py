from rest_framework import serializers
from .models import Flight

#flights list serializer
class FlightListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ['origin', 'destination', 'duration']