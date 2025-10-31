from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductViewSet,
    StockMovementViewSet,
    ProductionOrderViewSet,
    PickingListViewSet,
    PickingItemViewSet
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'movements', StockMovementViewSet, basename='stock-movement')
router.register(r'production-orders', ProductionOrderViewSet, basename='production-order')
router.register(r'picking-lists', PickingListViewSet, basename='picking-list')
router.register(r'picking-items', PickingItemViewSet, basename='picking-item')

urlpatterns = [
    path('', include(router.urls)),
]
