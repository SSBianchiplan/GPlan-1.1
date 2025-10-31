"""
URL configuration for gplan_project project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication endpoints
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('auth_system.urls')),
    
    # App endpoints
    path('api/planning/', include('planning.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/engineering/', include('engineering.urls')),
    path('api/logistics/', include('logistics.urls')),
    path('api/crm/', include('crm.urls')),
]
