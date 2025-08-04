import { formatCurrency, formatDate, capitalizeFirst } from './helpers.js';

// Product data parsers
export const parseProductData = (rawProduct) => {
  if (!rawProduct) return null;
  
  return {
    id: rawProduct.id || rawProduct.product_id || '',
    name: rawProduct.name || rawProduct.product_name || 'Unnamed Product',
    price: parseFloat(rawProduct.price) || 0,
    formattedPrice: formatCurrency(rawProduct.price),
    sku: rawProduct.sku || rawProduct.product_sku || '',
    category: capitalizeFirst(rawProduct.category) || 'Uncategorized',
    status: capitalizeFirst(rawProduct.status) || 'Draft',
    description: rawProduct.description || '',
    image: rawProduct.image || `https://placehold.co/300x200?text=${encodeURIComponent(rawProduct.name || 'Product+Image')}`,
    createdAt: rawProduct.created_at ? formatDate(rawProduct.created_at) : '',
    updatedAt: rawProduct.updated_at ? formatDate(rawProduct.updated_at) : ''
  };
};

export const parseProductList = (rawProducts) => {
  if (!Array.isArray(rawProducts)) return [];
  
  return rawProducts.map(parseProductData).filter(Boolean);
};

// Order data parsers
export const parseOrderData = (rawOrder) => {
  if (!rawOrder) return null;
  
  return {
    id: rawOrder.id || rawOrder.order_id || '',
    productName: rawOrder.product_name || rawOrder.productName || 'Unknown Product',
    customerName: rawOrder.customer_name || rawOrder.customerName || 'Unknown Customer',
    price: parseFloat(rawOrder.price) || 0,
    formattedPrice: formatCurrency(rawOrder.price),
    sku: rawOrder.sku || rawOrder.product_sku || '',
    category: capitalizeFirst(rawOrder.category) || 'Uncategorized',
    status: capitalizeFirst(rawOrder.status) || 'Pending',
    quantity: parseInt(rawOrder.quantity) || 1,
    total: parseFloat(rawOrder.total) || parseFloat(rawOrder.price) || 0,
    formattedTotal: formatCurrency(rawOrder.total || rawOrder.price),
    orderDate: rawOrder.order_date ? formatDate(rawOrder.order_date) : '',
    deliveryDate: rawOrder.delivery_date ? formatDate(rawOrder.delivery_date) : ''
  };
};

export const parseOrderList = (rawOrders) => {
  if (!Array.isArray(rawOrders)) return [];
  
  return rawOrders.map(parseOrderData).filter(Boolean);
};

// User/Customer data parsers
export const parseUserData = (rawUser) => {
  if (!rawUser) return null;
  
  return {
    id: rawUser.id || rawUser.user_id || '',
    name: rawUser.name || rawUser.full_name || 'Unknown User',
    email: rawUser.email || '',
    phone: rawUser.phone || rawUser.phone_number || '',
    avatar: rawUser.avatar || `https://placehold.co/40x40?text=${encodeURIComponent(rawUser.name?.charAt(0) || 'U')}`,
    status: capitalizeFirst(rawUser.status) || 'Active',
    joinDate: rawUser.join_date || rawUser.created_at ? formatDate(rawUser.join_date || rawUser.created_at) : '',
    lastLogin: rawUser.last_login ? formatDate(rawUser.last_login) : '',
    totalOrders: parseInt(rawUser.total_orders) || 0,
    totalSpent: parseFloat(rawUser.total_spent) || 0,
    formattedTotalSpent: formatCurrency(rawUser.total_spent)
  };
};

export const parseUserList = (rawUsers) => {
  if (!Array.isArray(rawUsers)) return [];
  
  return rawUsers.map(parseUserData).filter(Boolean);
};

// Dashboard analytics data parsers
export const parseDashboardData = (rawData) => {
  if (!rawData) return null;
  
  return {
    totalEarning: parseFloat(rawData.total_earning) || 0,
    formattedTotalEarning: formatCurrency(rawData.total_earning),
    orders: parseInt(rawData.orders) || 0,
    customers: parseInt(rawData.customers) || 0,
    products: parseInt(rawData.products) || 0,
    growthRate: parseFloat(rawData.growth_rate) || 0,
    revenueChange: parseFloat(rawData.revenue_change) || 0,
    ordersChange: parseFloat(rawData.orders_change) || 0,
    customersChange: parseFloat(rawData.customers_change) || 0
  };
};

// Chart data parsers
export const parseChartData = (rawChartData) => {
  if (!Array.isArray(rawChartData)) return [];
  
  return rawChartData.map(item => ({
    name: item.name || item.label || '',
    value: parseFloat(item.value) || 0,
    first: parseFloat(item.first) || parseFloat(item.dataset1) || 0,
    second: parseFloat(item.second) || parseFloat(item.dataset2) || 0,
    third: parseFloat(item.third) || parseFloat(item.dataset3) || 0,
    date: item.date ? formatDate(item.date) : ''
  }));
};

// Form data parsers
export const parseFormData = (formData) => {
  if (!formData) return {};
  
  return {
    manufacturerName: formData.manufacturer_name || formData.manufacturerName || '',
    manufacturerBrand: formData.manufacturer_brand || formData.manufacturerBrand || '',
    stocks: parseInt(formData.stocks) || 0,
    price: parseFloat(formData.price) || 0,
    discount: parseFloat(formData.discount) || 0,
    orders: parseInt(formData.orders) || 0,
    colors: Array.isArray(formData.colors) ? formData.colors : [],
    size: formData.size || '',
    description: formData.description || '',
    category: formData.category || '',
    tags: Array.isArray(formData.tags) ? formData.tags : []
  };
};

// Discount data parsers
export const parseDiscountData = (rawDiscount) => {
  if (!rawDiscount) return null;
  
  return {
    id: rawDiscount.id || rawDiscount.discount_id || '',
    productName: rawDiscount.product_name || rawDiscount.productName || '',
    userName: rawDiscount.user_name || rawDiscount.userName || '',
    discountAmount: parseFloat(rawDiscount.discount_amount) || parseFloat(rawDiscount.discount) || 0,
    formattedDiscount: formatCurrency(rawDiscount.discount_amount || rawDiscount.discount),
    discountType: rawDiscount.discount_type || 'fixed',
    status: capitalizeFirst(rawDiscount.status) || 'Active',
    validFrom: rawDiscount.valid_from ? formatDate(rawDiscount.valid_from) : '',
    validTo: rawDiscount.valid_to ? formatDate(rawDiscount.valid_to) : '',
    usageCount: parseInt(rawDiscount.usage_count) || 0,
    maxUsage: parseInt(rawDiscount.max_usage) || 0
  };
};

export const parseDiscountList = (rawDiscounts) => {
  if (!Array.isArray(rawDiscounts)) return [];
  
  return rawDiscounts.map(parseDiscountData).filter(Boolean);
};

// API response parsers
export const parseApiResponse = (response, dataType = 'generic') => {
  if (!response || !response.success) {
    return {
      success: false,
      data: null,
      error: response?.error || 'Unknown error occurred'
    };
  }
  
  let parsedData = response.data;
  
  switch (dataType) {
    case 'products':
      parsedData = Array.isArray(response.data) ? parseProductList(response.data) : parseProductData(response.data);
      break;
    case 'orders':
      parsedData = Array.isArray(response.data) ? parseOrderList(response.data) : parseOrderData(response.data);
      break;
    case 'users':
      parsedData = Array.isArray(response.data) ? parseUserList(response.data) : parseUserData(response.data);
      break;
    case 'dashboard':
      parsedData = parseDashboardData(response.data);
      break;
    case 'chart':
      parsedData = parseChartData(response.data);
      break;
    case 'discounts':
      parsedData = Array.isArray(response.data) ? parseDiscountList(response.data) : parseDiscountData(response.data);
      break;
    default:
      // Keep original data for generic responses
      break;
  }
  
  return {
    success: true,
    data: parsedData,
    error: null
  };
};
