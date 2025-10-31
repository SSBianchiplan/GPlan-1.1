from django.contrib import admin
from .models import ProductionPlan, FinancialPlan, QualityPlan, StrategicPlan


@admin.register(ProductionPlan)
class ProductionPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'product_name', 'quantity', 'status', 'priority', 'start_date', 'end_date')
    list_filter = ('status', 'priority', 'start_date')
    search_fields = ('name', 'product_name', 'description')
    date_hierarchy = 'start_date'


@admin.register(FinancialPlan)
class FinancialPlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'status', 'planned_amount', 'actual_amount', 'date')
    list_filter = ('type', 'status', 'date')
    search_fields = ('title', 'description', 'category')
    date_hierarchy = 'date'


@admin.register(QualityPlan)
class QualityPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'responsible', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'description')


@admin.register(StrategicPlan)
class StrategicPlanAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'start_date', 'end_date', 'responsible')
    list_filter = ('status', 'start_date')
    search_fields = ('name', 'description', 'vision', 'mission')
    date_hierarchy = 'start_date'
