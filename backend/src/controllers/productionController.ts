import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

export class ProductionController {
  // Production Plans
  async createProductionPlan(req: AuthRequest, res: Response) {
    try {
      const { name, description, startDate, endDate } = req.body;
      const userId = req.userId!;

      const plan = await prisma.productionPlan.create({
        data: {
          name,
          description,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          userId,
        },
      });

      return res.status(201).json(plan);
    } catch (error) {
      console.error('Create production plan error:', error);
      return res.status(500).json({ error: 'Erro ao criar plano de produção' });
    }
  }

  async getProductionPlans(req: AuthRequest, res: Response) {
    try {
      const { status, page = 1, limit = 10 } = req.query;

      const where: any = {};
      if (status) {
        where.status = status;
      }

      const plans = await prisma.productionPlan.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { productionOrders: true },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { createdAt: 'desc' },
      });

      const total = await prisma.productionPlan.count({ where });

      return res.json({
        data: plans,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get production plans error:', error);
      return res.status(500).json({ error: 'Erro ao buscar planos de produção' });
    }
  }

  async getProductionPlanById(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;

      const plan = await prisma.productionPlan.findUnique({
        where: { id },
        include: {
          user: {
            select: { id: true, name: true, email: true },
          },
          productionOrders: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!plan) {
        return res.status(404).json({ error: 'Plano de produção não encontrado' });
      }

      return res.json(plan);
    } catch (error) {
      console.error('Get production plan error:', error);
      return res.status(500).json({ error: 'Erro ao buscar plano de produção' });
    }
  }

  async updateProductionPlan(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, startDate, endDate, status } = req.body;

      const plan = await prisma.productionPlan.update({
        where: { id },
        data: {
          name,
          description,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          status,
        },
      });

      return res.json(plan);
    } catch (error) {
      console.error('Update production plan error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar plano de produção' });
    }
  }

  // Production Orders
  async createProductionOrder(req: AuthRequest, res: Response) {
    try {
      const { orderNumber, productionPlanId, productId, quantity, priority, scheduledDate } = req.body;
      const userId = req.userId!;

      const order = await prisma.productionOrder.create({
        data: {
          orderNumber,
          productionPlanId,
          productId,
          quantity,
          priority: priority || 'NORMAL',
          scheduledDate: new Date(scheduledDate),
          userId,
        },
        include: {
          product: true,
        },
      });

      return res.status(201).json(order);
    } catch (error) {
      console.error('Create production order error:', error);
      return res.status(500).json({ error: 'Erro ao criar ordem de produção' });
    }
  }

  async getProductionOrders(req: AuthRequest, res: Response) {
    try {
      const { status, priority, page = 1, limit = 10 } = req.query;

      const where: any = {};
      if (status) where.status = status;
      if (priority) where.priority = priority;

      const orders = await prisma.productionOrder.findMany({
        where,
        include: {
          product: true,
          productionPlan: {
            select: { id: true, name: true },
          },
          user: {
            select: { id: true, name: true },
          },
        },
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: { scheduledDate: 'asc' },
      });

      const total = await prisma.productionOrder.count({ where });

      return res.json({
        data: orders,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error('Get production orders error:', error);
      return res.status(500).json({ error: 'Erro ao buscar ordens de produção' });
    }
  }

  async updateProductionOrderStatus(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const data: any = { status };
      if (status === 'COMPLETED') {
        data.completedDate = new Date();
      }

      const order = await prisma.productionOrder.update({
        where: { id },
        data,
        include: {
          product: true,
        },
      });

      return res.json(order);
    } catch (error) {
      console.error('Update production order error:', error);
      return res.status(500).json({ error: 'Erro ao atualizar ordem de produção' });
    }
  }
}
