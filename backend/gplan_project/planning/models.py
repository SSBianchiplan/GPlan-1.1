from django.db import models
from django.contrib.auth.models import User


class ProductionPlan(models.Model):
    """Model for Production Planning"""
    
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('approved', 'Aprovado'),
        ('in_progress', 'Em Andamento'),
        ('completed', 'Concluído'),
        ('cancelled', 'Cancelado'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Baixa'),
        ('medium', 'Média'),
        ('high', 'Alta'),
        ('urgent', 'Urgente'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='Nome do Plano')
    description = models.TextField(verbose_name='Descrição')
    product_name = models.CharField(max_length=200, verbose_name='Produto')
    quantity = models.IntegerField(verbose_name='Quantidade')
    unit = models.CharField(max_length=50, verbose_name='Unidade', default='UN')
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',
        verbose_name='Status'
    )
    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default='medium',
        verbose_name='Prioridade'
    )
    
    start_date = models.DateField(verbose_name='Data de Início')
    end_date = models.DateField(verbose_name='Data de Término')
    
    estimated_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Custo Estimado',
        null=True,
        blank=True
    )
    actual_cost = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Custo Real',
        null=True,
        blank=True
    )
    
    responsible = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='production_plans',
        verbose_name='Responsável'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Plano de Produção'
        verbose_name_plural = 'Planos de Produção'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.product_name}"


class FinancialPlan(models.Model):
    """Model for Financial Planning"""
    
    TYPE_CHOICES = [
        ('income', 'Receita'),
        ('expense', 'Despesa'),
        ('investment', 'Investimento'),
    ]
    
    STATUS_CHOICES = [
        ('planned', 'Planejado'),
        ('executed', 'Executado'),
        ('cancelled', 'Cancelado'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='Título')
    description = models.TextField(verbose_name='Descrição')
    
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name='Tipo'
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='planned',
        verbose_name='Status'
    )
    
    planned_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Valor Planejado'
    )
    actual_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        verbose_name='Valor Real',
        null=True,
        blank=True
    )
    
    category = models.CharField(max_length=100, verbose_name='Categoria')
    date = models.DateField(verbose_name='Data')
    
    responsible = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='financial_plans',
        verbose_name='Responsável'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Plano Financeiro'
        verbose_name_plural = 'Planos Financeiros'
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.title} - {self.get_type_display()}"


class QualityPlan(models.Model):
    """Model for Quality Planning"""
    
    STATUS_CHOICES = [
        ('active', 'Ativo'),
        ('inactive', 'Inativo'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='Nome do Plano')
    description = models.TextField(verbose_name='Descrição')
    
    quality_standards = models.TextField(verbose_name='Padrões de Qualidade')
    inspection_criteria = models.TextField(verbose_name='Critérios de Inspeção')
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='Status'
    )
    
    responsible = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='quality_plans',
        verbose_name='Responsável'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Plano de Qualidade'
        verbose_name_plural = 'Planos de Qualidade'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name


class StrategicPlan(models.Model):
    """Model for Strategic Planning"""
    
    STATUS_CHOICES = [
        ('draft', 'Rascunho'),
        ('active', 'Ativo'),
        ('completed', 'Concluído'),
        ('archived', 'Arquivado'),
    ]
    
    name = models.CharField(max_length=200, verbose_name='Nome do Plano')
    description = models.TextField(verbose_name='Descrição')
    
    vision = models.TextField(verbose_name='Visão')
    mission = models.TextField(verbose_name='Missão')
    objectives = models.TextField(verbose_name='Objetivos')
    
    start_date = models.DateField(verbose_name='Data de Início')
    end_date = models.DateField(verbose_name='Data de Término')
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',
        verbose_name='Status'
    )
    
    responsible = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='strategic_plans',
        verbose_name='Responsável'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Plano Estratégico'
        verbose_name_plural = 'Planos Estratégicos'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
