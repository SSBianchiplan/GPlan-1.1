import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export class StockController {
  // Products
  async createProduct(req: AuthRequest, res: Response) {
    try {
      const { code, name, description, category, unit, minStock, maxStock, unitPrice } = req.body;

      const product = await prisma.product.create({
        data: {
          code,
          name,
          description,
          category,
          unit,
          minStock: minStock || 0,
          maxStock,
          unitPrice: unitPrice || 0,
        },
      });

      return res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }

  async getProducts(req: AuthRequest, res: Response) {
    try {
      const { category, active, page = 1, limit = 10, search } = req.query;

      interface WhereClause {
        category?: string;
        active?: boolean;
        OR?: Array<{ code?: { contains: string; mode: 'insensitive' }; name?: { contains: string; mode: 'insensitive' } }>;
      }

      const where: WhereClause = {};
      if (category) where.category = category as string;
      if (active !== undefined) where.active = active === 'true';
      if (search) {
        where.OR = [
          { code: { contains: search as string, mode: 'insensitive' } },
          { name: { contains: search as string, mode: 'insensitive' } },
        ];
      }

      const products = await prisma.product.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { name: 'asc' },
      });

      const total = await prisma.product.count({ where });

      return res.json({
        data: products,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get products error:', error);
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
  }

  async getProductById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          stockMovements: {
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
              user: {
                select: { id: true, name: true },
              },
            },
          },
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.json(product);
    } catch (error) {
      console.error('Get product error:', error);
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  }

  async updateProduct(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { code, name, description, category, unit, minStock, maxStock, unitPrice, active } = req.body;

      const product = await prisma.product.update({
        where: { id },
        data: {
          code,
          name,
          description,
          category,
          unit,
          minStock,
          maxStock,
          unitPrice,
          active,
        },
      });

      return res.json(product);
    } catch (error) {
      console.error('Update product error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  // Stock Movements
  async createStockMovement(req: AuthRequest, res: Response) {
    try {
      const { productId, type, quantity, reference, notes } = req.body;
      const userId = req.userId!;

      // Buscar produto atual
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Calcular novo estoque
      let newStock = product.currentStock;
      if (type === 'IN') {
        newStock += quantity;
      } else if (type === 'OUT') {
        newStock -= quantity;
        if (newStock < 0) {
          return res.status(400).json({ error: 'Estoque insuficiente' });
        }
      } else if (type === 'ADJUSTMENT') {
        newStock = quantity;
      }

      // Criar movimento e atualizar estoque em transação
      const [movement] = await prisma.$transaction([
        prisma.stockMovement.create({
          data: {
            productId,
            type,
            quantity,
            reference,
            notes,
            userId,
          },
          include: {
            product: true,
            user: {
              select: { id: true, name: true },
            },
          },
        }),
        prisma.product.update({
          where: { id: productId },
          data: { currentStock: newStock },
        }),
      ]);

      return res.status(201).json(movement);
    } catch (error) {
      console.error('Create stock movement error:', error);
      return res.status(500).json({ error: 'Erro ao criar movimentação de estoque' });
    }
  }

  async getStockMovements(req: AuthRequest, res: Response) {
    try {
      const { productId, type, page = 1, limit = 10 } = req.query;

      const where: { productId?: string; type?: string } = {};
      if (productId) where.productId = productId as string;
      if (type) where.type = type as string;

      const movements = await prisma.stockMovement.findMany({
        where,
        include: {
          product: {
            select: { id: true, code: true, name: true },
          },
          user: {
            select: { id: true, name: true },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      });

      const total = await prisma.stockMovement.count({ where });

      return res.json({
        data: movements,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get stock movements error:', error);
      return res.status(500).json({ error: 'Erro ao buscar movimentações de estoque' });
    }
  }

  async getLowStockProducts(req: AuthRequest, res: Response) {
    try {
      // Use raw query to compare currentStock with minStock
      const products = await prisma.$queryRaw<any[]>`
        SELECT * FROM products
        WHERE active = true AND "currentStock" <= "minStock"
        ORDER BY "currentStock" ASC
      `;

      return res.json(products);
    } catch (error) {
      console.error('Get low stock products error:', error);
      return res.status(500).json({ error: 'Erro ao buscar produtos com estoque baixo' });
    }
  }
}
