from django.contrib import admin
from .models import Product, StockMovement, ProductionOrder, PickingList, PickingItem


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'type', 'current_stock', 'minimum_stock', 'unit_cost', 'active')
    list_filter = ('type', 'active')
    search_fields = ('code', 'name', 'description')
    readonly_fields = ('created_at', 'updated_at')


@admin.register(StockMovement)
class StockMovementAdmin(admin.ModelAdmin):
    list_display = ('product', 'movement_type', 'quantity', 'user', 'created_at')
    list_filter = ('movement_type', 'created_at')
    search_fields = ('product__name', 'product__code', 'reference')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'


@admin.register(ProductionOrder)
class ProductionOrderAdmin(admin.ModelAdmin):
    list_display = ('order_number', 'product', 'quantity', 'status', 'expected_completion_date')
    list_filter = ('status', 'expected_completion_date')
    search_fields = ('order_number', 'product__name')
    readonly_fields = ('created_at', 'updated_at')
    date_hierarchy = 'expected_completion_date'


class PickingItemInline(admin.TabularInline):
    model = PickingItem
    extra = 1


@admin.register(PickingList)
class PickingListAdmin(admin.ModelAdmin):
    list_display = ('picking_number', 'production_order', 'status', 'assigned_to', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('picking_number', 'production_order__order_number')
    readonly_fields = ('created_at', 'updated_at')
    inlines = [PickingItemInline]
