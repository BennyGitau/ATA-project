from django.contrib.auth import get_user_model
from django.shortcuts import render
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
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.forms import PasswordResetForm
from .serializers import UserSerializer


User = get_user_model()

@api_view(['POST'])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(email=data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_409_CONFLICT)
        user = User.objects.create_user(
            password=data['password'],
            username=data['firstname'] + data['lastname'],
            email=data['email'],

        )
        user.first_name=data['firstname'] or None,
        user.last_name=data['lastname'] or None,
        user.organization_name=data['organization_name'],
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
        })
        send_mail(subject, message, 'bensonkamaugitau@gmail.com', [user.email], fail_silently=False, html_message=message)

        return Response({'message': 'User created. Please verify your email.'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def activate_user(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user is not None and token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return HttpResponseRedirect('http://localhost:5173/login') #replace with live url on production
        # return render(request, 'users/account_activation_success.html')
    else:
        return render(request, 'users/activation_invalid.html')
    

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
            return Response({'error': 'Account not activated'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

    #logout view
    #password_reset view
@api_view(['POST'])
def password_reset(request):
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not User.objects.filter(email=email).exists():
        return Response({'error': 'Email not registered'}, status=status.HTTP_404_NOT_FOUND)
    form = PasswordResetForm({'email': email})
    if form.is_valid():
        form.save(
            request=request,
            use_https=False,
            from_email='bensonkamaugitau@gmail.com',
            email_template_name='users/password_reset.html'
        )
        return Response({'message': 'Password reset email sent.'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)

#profile view
class ProfileView:
    def get(self, request):
        return render(request, 'users/profile.html')

    def put(self, request):
        return render(request, 'users/profile.html')
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    try:
        user = request.user
        user.delete()
        return Response({'message': 'Account deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)