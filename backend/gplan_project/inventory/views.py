from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, StockMovement, ProductionOrder, PickingList, PickingItem
from .serializers import (
    ProductSerializer,
    StockMovementSerializer,
    ProductionOrderSerializer,
    PickingListSerializer,
    PickingItemSerializer
)


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Products
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        product_type = self.request.query_params.get('type', None)
        active = self.request.query_params.get('active', None)
        needs_restock = self.request.query_params.get('needs_restock', None)
        
        if product_type:
            queryset = queryset.filter(type=product_type)
        if active is not None:
            queryset = queryset.filter(active=active.lower() == 'true')
        if needs_restock:
            queryset = [p for p in queryset if p.needs_restock]
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        """Get products with low stock"""
        products = Product.objects.filter(
            current_stock__lte=models.F('minimum_stock')
        )
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def inventory_value(self, request):
        """Calculate total inventory value"""
        products = Product.objects.all()
        total_value = sum(p.total_value for p in products)
        return Response({'total_inventory_value': total_value})


class StockMovementViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Stock Movements
    """
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        product_id = self.request.query_params.get('product', None)
        movement_type = self.request.query_params.get('movement_type', None)
        
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        if movement_type:
            queryset = queryset.filter(movement_type=movement_type)
        
        return queryset
    
    def perform_create(self, serializer):
        """Update product stock when creating a movement"""
        movement = serializer.save(user=self.request.user)
        product = movement.product
        
        if movement.movement_type == 'in':
            product.current_stock += movement.quantity
        elif movement.movement_type == 'out':
            product.current_stock -= movement.quantity
        elif movement.movement_type == 'adjustment':
            product.current_stock = movement.quantity
        
        product.save()


class ProductionOrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Production Orders
    """
    queryset = ProductionOrder.objects.all()
    serializer_class = ProductionOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)
        product_id = self.request.query_params.get('product', None)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class PickingListViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Picking Lists
    """
    queryset = PickingList.objects.all()
    serializer_class = PickingListSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status_filter = self.request.query_params.get('status', None)
        assigned_to = self.request.query_params.get('assigned_to', None)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if assigned_to:
            queryset = queryset.filter(assigned_to_id=assigned_to)
        
        return queryset
    
    @action(detail=True, methods=['post'])
    def complete(self, request, pk=None):
        """Mark picking list as completed"""
        picking_list = self.get_object()
        picking_list.status = 'completed'
        picking_list.save()
        serializer = self.get_serializer(picking_list)
        return Response(serializer.data)


class PickingItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Picking Items
    """
    queryset = PickingItem.objects.all()
    serializer_class = PickingItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        picking_list_id = self.request.query_params.get('picking_list', None)
        
        if picking_list_id:
            queryset = queryset.filter(picking_list_id=picking_list_id)
        
        return queryset
