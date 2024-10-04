from django.contrib.auth import get_user_model, views as auth_views, logout
from django.shortcuts import render, redirect
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator as token_generator
from django.core.mail import send_mail
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import PasswordResetForm
from .serializers import UserSerializer, ProfileSerializer

from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.conf import settings
from django.urls import reverse_lazy
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib import messages



User = get_user_model()

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_409_CONFLICT)
        user = User.objects.create_user(
            password=data['password'],
            username=data['firstname'] + '' + data['lastname'] or data['company_name'],
            email=data['email'],
        )
        user.first_name=data['firstname'] or None,
        user.last_name=data['lastname'] or None,
        user.organization_name=data['company_name'] or None,
        user.role=data['role'],
        user.is_active = False  # Set to inactive until email is verified
        user.save()

        # Send email verification
        current_site = get_current_site(request)
        subject = 'Activate your account'
        message = render_to_string('users/activation_email.html', {
            'user': user,
            'domain': current_site.domain if current_site else 'localhost:8000',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': token_generator.make_token(user),
            'date_joined': user.date_joined
        })
        send_mail(subject, message, 'bensonkamaugitau@gmail.com', [user.email], html_message=message)

        return Response({'message': 'User created. Please verify your email.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

#activation token expiry
class ActivationTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        # Include the timestamp in the hash to prevent reusing the token
        return str(user.pk) + str(timestamp) + str(user.is_active)

    # def check_token(self, user, token):
    #     # Check if the token is valid and not expired
    #     if not user.is_active:
    #         return False
    #     # Call the superclass method to validate the token
    #     return super().check_token(user, token)

    def is_token_expired(self, user, timestamp):
        # Token is considered expired if it's older than 24 hours
        expiration_time = timezone.now() - timedelta(hours=24)
        return timestamp < expiration_time

# Create an instance of the custom token generator
activation_token_generator = ActivationTokenGenerator()


def activate_user(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
        # return render(request, 'users/account_invalid.html')
        
    if user is not None and token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponseRedirect('http://localhost:5173/login')  # Replace with live URL on production
    else:
        return render(request, 'users/account_invalid.html')

    # if user is not None:
    #     if activation_token_generator.check_token(user, token):
    #         user.is_active = True
    #         user.save()
    #         return HttpResponseRedirect('http://localhost:5173/login')  # Replace with live URL on production
    #         # return render(request, 'users/account_activation_success.html')
    #     elif activation_token_generator.is_token_expired(user, user.date_joined):
    #         user.delete()
    #         return render(request, 'users/account_invalid.html')
    # return render(request, 'users/account_invalid.html')
    

    #login view
@api_view(['POST'])
def login_user(request):
    data = request.data
    email = data.get('email')
    password = data.get('password')

    # Authenticate the user
    user = authenticate(email=email, password=password)

    if user is not None:
        if user.is_active:
            # Get or create the token
            refresh = RefreshToken.for_user(user)
            
            # Serialize the user data
            user_data = UserSerializer(user).data

            # Return both the token and user data
            return Response({'token': str(refresh.access_token), 'refresh': str(refresh), 'user': user_data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Account not activated. Please check your email within 24hrs'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

#logout view
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def logout_user(request):
    logout(request)
    return HttpResponseRedirect('http://localhost:5173/login')

#password_reset view
#password_reset_confirm default override
class CustomPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
    template_name = 'users/password_reset_confirm.html'
    success_url = reverse_lazy('password_reset_complete')

    class Meta:
        fields = ('new_password1', 'new_password2',)

    def form_valid(self, form):
        # Update the user's password
        new_password = form.cleaned_data['new_password1']

        try:
            validate_password(new_password, self.request.user)
        except ValidationError as e:
            form.add_error('new_password1', e)
            return self.form_invalid(form)
        user = form.save()
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(self.request, user)
        messages.success(self.request, 'Your password has been reset successfully.')
        return super().form_valid(form)

#AJAX real time password errors
@api_view(['POST'])
def validate_password_strength(request):
    password = request.data.get('password')
    
    try:
        validate_password(password)
        return Response({'valid': True})
    except ValidationError as e:
        return Response({'valid': False, 'errors': e.messages}, status=400)

@api_view(['POST'])
def password_reset(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Always show success, even if email is not registered (for security reasons)
    if not User.objects.filter(email=email).exists():
        return Response({'message': 'If an account with that email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

    # Prepare the password reset form
    form = PasswordResetForm({'email': email})

    if form.is_valid():
        # Determine whether to use HTTPS based on the environment
        use_https = not settings.DEBUG  # Use HTTPS in production

        # Send the password reset email
        form.save(
            request=request,
            use_https=use_https,
            from_email='bensonkamaugitau@gmail.com',
            email_template_name='users/password_reset_form.html',
            html_email_template_name='users/password_reset_form.html',
            # domain_override='your-custom-domain.com', # Uncomment this if you want to override domain
        )
        return Response({'message': 'If an account with that email exists, a password reset link has been sent.'}, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)

#profile view
@permission_classes([IsAuthenticated])
class ProfileView:
    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def put(self, request):
        user = request.user
        data = request
        serializer = ProfileSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request):
        user = request.user
        data = request.data

        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not old_password or not new_password:
            return Response({'error': 'Old password and new password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if old_password == new_password:
            return Response({'error': 'Old password and new password cannot be the same'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(old_password):
            return Response({'error': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password, user)
        except ValidationError as e:
            return Response({'error': e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password changed successfully'}, status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        user = request.user
        user.delete()
        return Response({'message': 'Account deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)