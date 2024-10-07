from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from google.oauth2 import service_account
from google.auth.transport.requests import Request
from rest_framework.views import APIView
import time
class GetAccessToken(APIView):
  def get(self, request):
    # Load the service account key
    credentials = service_account.Credentials.from_service_account_file(
        'airtravelassistance-561a34090111.json',
        scopes=['https://www.googleapis.com/auth/cloud-platform']
    )
    credentials.refresh(Request())
    access_token = credentials.token
    expiry_timestamp = credentials.expiry.timestamp()
    current_timestamp = time.time()
    return JsonResponse({
        'access_token': access_token,
        'expires_in': expiry_timestamp - current_timestamp,  
        })

