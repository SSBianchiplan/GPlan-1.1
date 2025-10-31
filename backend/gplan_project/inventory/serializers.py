from rest_framework import serializers
from .models import Product, StockMovement, ProductionOrder, PickingList, PickingItem


class ProductSerializer(serializers.ModelSerializer):
    needs_restock = serializers.BooleanField(read_only=True)
    total_value = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class StockMovementSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = StockMovement
        fields = '__all__'
        read_only_fields = ('created_at',)


class ProductionOrderSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    created_by_name = serializers.CharField(source='created_by.username', read_only=True)
    
    class Meta:
        model = ProductionOrder
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class PickingItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_code = serializers.CharField(source='product.code', read_only=True)
    
    class Meta:
        model = PickingItem
        fields = '__all__'


class PickingListSerializer(serializers.ModelSerializer):
    items = PickingItemSerializer(many=True, read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.username', read_only=True)
    production_order_number = serializers.CharField(
        source='production_order.order_number',
        read_only=True
    )
    
    class Meta:
        model = PickingList
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
