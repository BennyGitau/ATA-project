from django.urls import path
from .views import register_user, activate_user, login_user, password_reset, delete_account
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('api/register/', register_user, name='register_user'),
    path('api/activate/<uidb64>/<token>/', activate_user, name='activate_user'),
    path('api/activate/<uidb64>/<token>/', activate_user, name='activate_user'),
    path('api/login/', login_user, name='login_user'),
    path('api/password_reset/', password_reset, name='password_reset'),
    path('api/logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/delete_account/', delete_account, name='delete_account'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
 
]
