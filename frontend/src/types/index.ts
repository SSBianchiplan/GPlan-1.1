export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER';
  active: boolean;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ProductionPlan {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: 'DRAFT' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    productionOrders: number;
  };
}

export interface ProductionOrder {
  id: string;
  orderNumber: string;
  productionPlanId?: string;
  productId: string;
  quantity: number;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  scheduledDate: string;
  completedDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  product?: Product;
  productionPlan?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    name: string;
  };
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: string;
  unit: string;
  minStock: number;
  maxStock?: number;
  currentStock: number;
  unitPrice: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT' | 'TRANSFER';
  quantity: number;
  reference?: string;
  notes?: string;
  userId: string;
  createdAt: string;
  product?: {
    id: string;
    code: string;
    name: string;
  };
  user?: {
    id: string;
    name: string;
  };
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
