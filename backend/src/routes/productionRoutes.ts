import { Router } from 'express';
import { ProductionController } from '../controllers/productionController';
import { authenticate, authorize } from '../middleware/auth';
import { apiLimiter, createLimiter } from '../middleware/rateLimiter';

const router = Router();
const productionController = new ProductionController();

// Apply general rate limiting to all routes
router.use(apiLimiter);

// Production Plans
router.post('/plans', authenticate, authorize('ADMIN', 'MANAGER'), createLimiter, (req, res) =>
  productionController.createProductionPlan(req, res)
);
router.get('/plans', authenticate, (req, res) =>
  productionController.getProductionPlans(req, res)
);
router.get('/plans/:id', authenticate, (req, res) =>
  productionController.getProductionPlanById(req, res)
);
router.put('/plans/:id', authenticate, authorize('ADMIN', 'MANAGER'), (req, res) =>
  productionController.updateProductionPlan(req, res)
);

// Production Orders
router.post('/orders', authenticate, authorize('ADMIN', 'MANAGER', 'USER'), createLimiter, (req, res) =>
  productionController.createProductionOrder(req, res)
);
router.get('/orders', authenticate, (req, res) =>
  productionController.getProductionOrders(req, res)
);
router.patch('/orders/:id/status', authenticate, authorize('ADMIN', 'MANAGER', 'USER'), (req, res) =>
  productionController.updateProductionOrderStatus(req, res)
);

export default router;
