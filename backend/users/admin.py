# users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # Import your custom User model

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff', 'role')
    ordering = ('email',)
    search_fields = ('email', 'first_name', 'last_name')
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'organization_name', 'bio', 'profile_pic', 'phone_number', 'address', 'email_verified',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'organization_name', 'bio', 'profile_pic', 'phone_number', 'address', 'email_verified',)}),
    )

# Register the custom user model with the admin
admin.site.register(User, CustomUserAdmin)
