from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    """Model for Products in Inventory"""
    
    TYPE_CHOICES = [
        ('raw_material', 'Matéria Prima'),
        ('finished_product', 'Produto Acabado'),
        ('semi_finished', 'Semi-Acabado'),
        ('consumable', 'Consumível'),
    ]
    
    code = models.CharField(max_length=50, unique=True, verbose_name='Código')
    name = models.CharField(max_length=200, verbose_name='Nome')
    description = models.TextField(verbose_name='Descrição', blank=True)
    
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name='Tipo'
    )
    
    unit = models.CharField(max_length=50, verbose_name='Unidade', default='UN')
    
    current_stock = models.IntegerField(verbose_name='Estoque Atual', default=0)
    minimum_stock = models.IntegerField(verbose_name='Estoque Mínimo', default=0)
    maximum_stock = models.IntegerField(verbose_name='Estoque Máximo', default=0)
    
    unit_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        verbose_name='Custo Unitário',
        default=0.00
    )
    
    location = models.CharField(max_length=100, verbose_name='Localização', blank=True)
    
    active = models.BooleanField(default=True, verbose_name='Ativo')
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        ordering = ['name']
    
    def __str__(self):
        return f"{self.code} - {self.name}"
    
    @property
    def needs_restock(self):
        """Check if product needs restocking"""
        return self.current_stock <= self.minimum_stock
    
    @property
    def total_value(self):
        """Calculate total inventory value for this product"""
        return self.current_stock * self.unit_cost


class StockMovement(models.Model):
    """Model for Stock Movements"""
    
    MOVEMENT_TYPE_CHOICES = [
        ('in', 'Entrada'),
        ('out', 'Saída'),
        ('adjustment', 'Ajuste'),
        ('transfer', 'Transferência'),
    ]
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='movements',
        verbose_name='Produto'
    )
    
    movement_type = models.CharField(
        max_length=20,
        choices=MOVEMENT_TYPE_CHOICES,
        verbose_name='Tipo de Movimentação'
    )
    
    quantity = models.IntegerField(verbose_name='Quantidade')
    
    reason = models.TextField(verbose_name='Motivo')
    reference = models.CharField(
        max_length=100,
        verbose_name='Referência',
        blank=True,
        help_text='Número do pedido, nota fiscal, etc.'
    )
    
    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='stock_movements',
        verbose_name='Usuário'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Data')
    
    class Meta:
        verbose_name = 'Movimentação de Estoque'
        verbose_name_plural = 'Movimentações de Estoque'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.product.name} - {self.get_movement_type_display()} - {self.quantity}"


class ProductionOrder(models.Model):
    """Model for Production Orders"""
    
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('in_progress', 'Em Andamento'),
        ('completed', 'Concluído'),
        ('cancelled', 'Cancelado'),
    ]
    
    order_number = models.CharField(max_length=50, unique=True, verbose_name='Número do Pedido')
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='production_orders',
        verbose_name='Produto'
    )
    
    quantity = models.IntegerField(verbose_name='Quantidade')
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Status'
    )
    
    start_date = models.DateField(verbose_name='Data de Início', null=True, blank=True)
    expected_completion_date = models.DateField(verbose_name='Data Prevista de Conclusão')
    actual_completion_date = models.DateField(
        verbose_name='Data Real de Conclusão',
        null=True,
        blank=True
    )
    
    notes = models.TextField(verbose_name='Observações', blank=True)
    
    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_production_orders',
        verbose_name='Criado por'
    )
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Ordem de Produção'
        verbose_name_plural = 'Ordens de Produção'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.order_number} - {self.product.name}"


class PickingList(models.Model):
    """Model for Picking Lists"""
    
    STATUS_CHOICES = [
        ('pending', 'Pendente'),
        ('in_progress', 'Em Andamento'),
        ('completed', 'Concluído'),
        ('cancelled', 'Cancelado'),
    ]
    
    picking_number = models.CharField(max_length=50, unique=True, verbose_name='Número do Picking')
    
    production_order = models.ForeignKey(
        ProductionOrder,
        on_delete=models.CASCADE,
        related_name='picking_lists',
        verbose_name='Ordem de Produção',
        null=True,
        blank=True
    )
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Status'
    )
    
    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='assigned_pickings',
        verbose_name='Responsável'
    )
    
    notes = models.TextField(verbose_name='Observações', blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Criado em')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Atualizado em')
    
    class Meta:
        verbose_name = 'Lista de Picking'
        verbose_name_plural = 'Listas de Picking'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.picking_number}"


class PickingItem(models.Model):
    """Model for Picking List Items"""
    
    picking_list = models.ForeignKey(
        PickingList,
        on_delete=models.CASCADE,
        related_name='items',
        verbose_name='Lista de Picking'
    )
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        verbose_name='Produto'
    )
    
    quantity_required = models.IntegerField(verbose_name='Quantidade Requerida')
    quantity_picked = models.IntegerField(verbose_name='Quantidade Coletada', default=0)
    
    class Meta:
        verbose_name = 'Item de Picking'
        verbose_name_plural = 'Itens de Picking'
    
    def __str__(self):
        return f"{self.product.name} - {self.quantity_picked}/{self.quantity_required}"
