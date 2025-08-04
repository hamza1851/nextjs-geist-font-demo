// Generic API handler for CRUD operations
interface ApiOptions {
  url: string;
  baseURL?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  headers?: Record<string, string>;
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export const callApi = async <T = any>(options: ApiOptions): Promise<ApiResponse<T>> => {
  const {
    url,
    baseURL = '/api',
    method = 'GET',
    payload,
    headers = {}
  } = options;

  try {
    const fullUrl = `${baseURL}${url}`;
    
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (payload && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(payload);
    }

    const response = await fetch(fullUrl, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      data,
      status: response.status
    };
  } catch (error) {
    console.error('API call failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 500
    };
  }
};

// Specific API methods using the generic handler
export const apiMethods = {
  // Products API
  getProducts: () => callApi({ url: '/products' }),
  createProduct: (product: any) => callApi({ 
    url: '/products', 
    method: 'POST', 
    payload: product 
  }),
  updateProduct: (id: string, product: any) => callApi({ 
    url: `/products/${id}`, 
    method: 'PUT', 
    payload: product 
  }),
  deleteProduct: (id: string) => callApi({ 
    url: `/products/${id}`, 
    method: 'DELETE' 
  }),

  // Orders API
  getOrders: () => callApi({ url: '/orders' }),
  updateOrderStatus: (id: string, status: string) => callApi({
    url: `/orders/${id}/status`,
    method: 'PUT',
    payload: { status }
  }),

  // Users/Discounts API
  getUsers: () => callApi({ url: '/users' }),
  getDiscounts: () => callApi({ url: '/discounts' }),
  applyDiscount: (discountData: any) => callApi({
    url: '/discounts/apply',
    method: 'POST',
    payload: discountData
  }),

  // Dashboard Analytics
  getDashboardData: () => callApi({ url: '/dashboard/analytics' })
};

// Mock data for initial development
export const mockData = {
  products: [
    {
      id: '#TB010331',
      name: 'Tery White',
      price: 200,
      sku: '000001',
      category: 'Cards',
      status: 'Draft'
    },
    {
      id: '#TB010332',
      name: 'Tery White',
      price: 200,
      sku: '000002',
      category: 'Flex',
      status: 'Publish'
    },
    {
      id: '#TB010333',
      name: 'Tery White',
      price: 200,
      sku: '000003',
      category: 'Flex',
      status: 'Publish'
    }
  ],
  orders: [
    {
      id: '#TB010331',
      productName: 'Tery White',
      price: 200,
      sku: '000001',
      category: 'Cards',
      status: 'Process'
    },
    {
      id: '#TB010332',
      productName: 'Tery White',
      price: 200,
      sku: '000002',
      category: 'Flex',
      status: 'Delivered'
    },
    {
      id: '#TB010333',
      productName: 'Tery White',
      price: 200,
      sku: '000003',
      category: 'Flex',
      status: 'Delivered'
    }
  ],
  revenueData: [
    { name: 'Jan', first: 80, second: 45, third: 60 },
    { name: 'Feb', first: 60, second: 50, third: 65 },
    { name: 'Mar', first: 85, second: 60, third: 55 },
    { name: 'Apr', first: 50, second: 85, third: 70 },
    { name: 'May', first: 40, second: 45, third: 80 },
    { name: 'Jun', first: 75, second: 40, third: 45 }
  ]
};
