from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


from .serializers import UserSerializer, UserProfileSerializer
from users.models import UserProfile


# Create your views here.
#register view

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate JWT Token upon successful registration
            refresh = RefreshToken.for_user(user)
            tokens = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }

            return Response({
                'message': 'User registered successfully.',
                'tokens': tokens
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#login view
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # If authenticated, generate JWT tokens
            response = super().post(request, *args, **kwargs)
            return response
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class TokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

#logout view
class LogoutView(APIView):
    persmission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Logout successful'}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": str(e)},status=status.HTTP_400_BAD_REQUEST)
   

#profile view
class ProfileView(APIView):
    persmission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            logged_in_user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        user = request.user
        profile_details = {
            'username': user.username,
            'email': user.email,
            'phone_number': logged_in_user.phone_number,
            'address': logged_in_user.address,
            'bio': logged_in_user.bio,
            'profile_pic': logged_in_user.profile_pic.url if logged_in_user.profile_pic else None,
        }

        return Response(profile_details, status=status.HTTP_200_OK)
  
    persmission_classes = [IsAuthenticated]
    def put(self, request):
        try:
            logged_in_user = UserProfile.objects.get(user=request.user)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = UserProfileSerializer(logged_in_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
