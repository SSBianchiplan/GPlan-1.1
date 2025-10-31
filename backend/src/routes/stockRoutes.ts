import { Router } from 'express';
import { StockController } from '../controllers/stockController';
import { authenticate, authorize } from '../middleware/auth';
import { apiLimiter, createLimiter } from '../middleware/rateLimiter';

const router = Router();
const stockController = new StockController();

// Apply general rate limiting to all routes
router.use(apiLimiter);

// Products
router.post('/products', authenticate, authorize('ADMIN', 'MANAGER'), createLimiter, (req, res) =>
  stockController.createProduct(req, res)
);
router.get('/products', authenticate, (req, res) =>
  stockController.getProducts(req, res)
);
router.get('/products/low-stock', authenticate, (req, res) =>
  stockController.getLowStockProducts(req, res)
);
router.get('/products/:id', authenticate, (req, res) =>
  stockController.getProductById(req, res)
);
router.put('/products/:id', authenticate, authorize('ADMIN', 'MANAGER'), (req, res) =>
  stockController.updateProduct(req, res)
);

// Stock Movements
router.post('/movements', authenticate, authorize('ADMIN', 'MANAGER', 'USER'), createLimiter, (req, res) =>
  stockController.createStockMovement(req, res)
);
router.get('/movements', authenticate, (req, res) =>
  stockController.getStockMovements(req, res)
);

export default router;
