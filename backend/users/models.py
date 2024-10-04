
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    INDIVIDUAL = 'individual'
    ORG_CONSUMER = 'org_consumer'
    ORG_PROVIDER = 'org_provider'
    
    ROLE_CHOICES = [
        (INDIVIDUAL, 'Individual'),
        (ORG_CONSUMER, 'Organization'),
        (ORG_PROVIDER, 'Service Provider'),
    ]
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    username=models.CharField(max_length=255, default='')
    email = models.EmailField(unique=True)
    email_verified = models.BooleanField(default=False)
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    organization_name = models.CharField(max_length=255, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    profile_pic = models.ImageField(upload_to='profile_pics', null=True, blank=True)
   

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.first_name} {self.last_name}'

    # Override the groups and user_permissions fields to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Custom related_name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Custom related_name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    # def set_password(self, raw_password: str | None) -> None:
    #     return super().set_password(raw_password)
