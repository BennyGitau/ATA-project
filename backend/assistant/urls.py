from django.contrib import admin
from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import QueryView, detect_intent_knowledge

schema_view = get_schema_view(
    openapi.Info(
        title="Flight Booking API",
        default_version='v1',
        description="Flight Booking API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="Lx4uq@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
    )

urlpatterns = [
    path('assistant/', QueryView.as_view(), name='assistant'),
    path('detect_intent_knowledge/', detect_intent_knowledge, name='detect-intent-knowledge'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

]