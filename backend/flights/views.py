from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, schema
from rest_framework.views import APIView
from rest_framework.schemas import ManualSchema
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .serializers import FlightListSerializer
from .models import Flight

# Create your views here.

class FlightsView(APIView):
    @swagger_auto_schema(
        operation_description="Get all flights",
        responses={
            200: FlightListSerializer(many=True),
            404: openapi.Response(description="flight not found"),
            500: openapi.Response(description="internal server error"),
            },
    )
    def get(self, request):
        flights = Flight.objects.all()
        serializer = FlightListSerializer(flights, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_description="Create a new flight",
        request_body=FlightListSerializer,
        responses={
            201: FlightListSerializer,
            400: openapi.Response(description="bad request"),
            500: openapi.Response(description="internal server error"),
            },
    )
    def post(self, request):
        serializer = FlightListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
