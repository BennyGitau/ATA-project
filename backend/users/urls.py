from django.urls import path
from .views import register_user, activate_user, login_user, logout_user, password_reset, delete_account, CustomPasswordResetConfirmView, validate_password_strength, ProfileView
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('api/register/', register_user, name='register_user'),
    path('activate/<uidb64>/<token>/', activate_user, name='activate_user'),
    path('api/login/', login_user, name='login_user'),
    path('api/password_reset/', password_reset, name='password_reset'),
    path('api/logout/', logout_user, name='logout'),
    path('api/delete_account/', delete_account, name='delete_account'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset_form'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('api/validate_password/', validate_password_strength, name='validate_password_strength'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_complete.html'), name='password_reset_complete'),
    path('api/profile/', ProfileView, name='profile'),
]
