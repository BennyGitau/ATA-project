from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#saved flights
class SearchQuery(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    origin = models.CharField(max_length=64, null=True, blank=True)
    originIataCode = models.CharField(max_length=6, null=True, blank=True)
    destination = models.CharField(max_length=64, null=True, blank=True)
    destinationIataCode = models.CharField(max_length=6, null=True, blank=True)
    departure_date= models.DateTimeField(null=True, blank=True)
    departure_time = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    duration = models.IntegerField(null=True)
    one_way = models.BooleanField(default=False, null=True)
    return_flight = models.BooleanField(default=False, null=True)
    airline = models.CharField(max_length=64, null=True, blank=True)
    trip_purpose = models.CharField(max_length=64, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    travel_class = models.CharField(max_length=64, null=True, blank=True)

#booked flights
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    origin = models.CharField(max_length=64, null=True, blank=True)
    originIataCode = models.CharField(max_length=6, null=True, blank=True)
    destination = models.CharField(max_length=64, null=True, blank=True)
    destinationIataCode = models.CharField(max_length=6, null=True, blank=True)
    departure_date= models.DateTimeField(null=True, blank=True)
    departure_time = models.DateTimeField(null=True, blank=True)
    return_date = models.DateTimeField(null=True, blank=True)
    duration = models.IntegerField(null=True, blank=True)
    one_way = models.BooleanField(default=False)
    return_flight = models.BooleanField(default=False)
    airline = models.CharField(max_length=64, null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    seats = models.IntegerField(null=True, blank=True)
    num_tickets = models.IntegerField(null=True)
    passenger_names = models.CharField(max_length=255, null=True)
    contact_email = models.EmailField(null=True)
    payment_status = models.CharField(max_length=32, null=True)


