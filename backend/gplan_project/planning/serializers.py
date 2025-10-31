from rest_framework import serializers
from .models import ProductionPlan, FinancialPlan, QualityPlan, StrategicPlan


class ProductionPlanSerializer(serializers.ModelSerializer):
    responsible_name = serializers.CharField(source='responsible.username', read_only=True)
    
    class Meta:
        model = ProductionPlan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class FinancialPlanSerializer(serializers.ModelSerializer):
    responsible_name = serializers.CharField(source='responsible.username', read_only=True)
    
    class Meta:
        model = FinancialPlan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class QualityPlanSerializer(serializers.ModelSerializer):
    responsible_name = serializers.CharField(source='responsible.username', read_only=True)
    
    class Meta:
        model = QualityPlan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class StrategicPlanSerializer(serializers.ModelSerializer):
    responsible_name = serializers.CharField(source='responsible.username', read_only=True)
    
    class Meta:
        model = StrategicPlan
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
