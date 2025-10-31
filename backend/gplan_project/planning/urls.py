from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductionPlanViewSet,
    FinancialPlanViewSet,
    QualityPlanViewSet,
    StrategicPlanViewSet
)

router = DefaultRouter()
router.register(r'production', ProductionPlanViewSet, basename='production-plan')
router.register(r'financial', FinancialPlanViewSet, basename='financial-plan')
router.register(r'quality', QualityPlanViewSet, basename='quality-plan')
router.register(r'strategic', StrategicPlanViewSet, basename='strategic-plan')

urlpatterns = [
    path('', include(router.urls)),
]
