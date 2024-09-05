from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=255)
    bio = models.TextField()
    profile_pic = models.ImageField(upload_to='profile_pics', null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    
