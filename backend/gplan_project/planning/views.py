from rest_framework import viewsets, permissions
from .models import ProductionPlan, FinancialPlan, QualityPlan, StrategicPlan
from .serializers import (
    ProductionPlanSerializer,
    FinancialPlanSerializer,
    QualityPlanSerializer,
    StrategicPlanSerializer
)


class ProductionPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Production Planning
    """
    queryset = ProductionPlan.objects.all()
    serializer_class = ProductionPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status', None)
        priority = self.request.query_params.get('priority', None)
        
        if status:
            queryset = queryset.filter(status=status)
        if priority:
            queryset = queryset.filter(priority=priority)
        
        return queryset


class FinancialPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Financial Planning
    """
    queryset = FinancialPlan.objects.all()
    serializer_class = FinancialPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        type_filter = self.request.query_params.get('type', None)
        status = self.request.query_params.get('status', None)
        
        if type_filter:
            queryset = queryset.filter(type=type_filter)
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset


class QualityPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Quality Planning
    """
    queryset = QualityPlan.objects.all()
    serializer_class = QualityPlanSerializer
    permission_classes = [permissions.IsAuthenticated]


class StrategicPlanViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Strategic Planning
    """
    queryset = StrategicPlan.objects.all()
    serializer_class = StrategicPlanSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status', None)
        
        if status:
            queryset = queryset.filter(status=status)
        
        return queryset
