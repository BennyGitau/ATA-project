from django.contrib import admin

# Register your models here.

from .models import Booking, SearchQuery

admin.site.register(Booking)
admin.site.register(SearchQuery)
