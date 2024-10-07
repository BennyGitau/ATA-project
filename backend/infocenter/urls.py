from .views import GetAccessToken
from django.urls import path

urlpatterns = [
    path('get-google-token/', GetAccessToken.as_view(), name='get-access-token'),
]