"use client";

import React, { useState, useEffect } from 'react';
import GenericTable from '../../components/common/GenericTable';
import Button from '../../components/common/Button';
import DialogBox from '../../components/common/DialogBox';
import { mockData } from '../../api/apiMethods';
import { parseOrderList } from '../../utils/parsers.js';
import { formatCurrency, formatDate } from '../../utils/helpers.js';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const parsedOrders = parseOrderList(mockData.orders.map(order => ({
        ...order,
        customerName: 'John Doe',
        orderDate: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      })));
      setOrders(parsedOrders);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      width: '120px'
    },
    {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-3">
          <img
            src={`https://placehold.co/32x32?text=${encodeURIComponent(value.charAt(0))}`}
            alt={value}
            className="w-8 h-8 rounded-full"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/32x32?text=U";
            }}
          />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'productName',
      label: 'Product',
      sortable: true
    },
    {
      key: 'formattedTotal',
      label: 'Total',
      sortable: true,
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    {
      key: 'orderDate',
      label: 'Order Date',
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-muted-foreground">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    }
  ];

  const actions = [
    {
      label: 'View Details',
      onClick: (row: any) => {
        setSelectedOrder(row);
        setShowOrderDialog(true);
      },
      variant: 'outline' as const
    },
    {
      label: 'Update Status',
      onClick: (row: any) => {
        const newStatus = row.status === 'Process' ? 'Delivered' : 'Process';
        setOrders(prev => prev.map(order => 
          order.id === row.id 
            ? { ...order, status: newStatus }
            : order
        ));
      },
      variant: 'primary' as const
    }
  ];

  const getStatusStats = () => {
    const stats = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: orders.length,
      process: stats['Process'] || 0,
      delivered: stats['Delivered'] || 0,
      pending: stats['Pending'] || 0
    };
  };

  const stats = getStatusStats();

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="space-y-6">
        {/* Order Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Order {selectedOrder.id}
            </h3>
            <p className="text-sm text-muted-foreground">
              Placed on {selectedOrder.orderDate}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedOrder.status === 'Delivered' 
              ? 'bg-green-100 text-green-800'
              : selectedOrder.status === 'Process'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {selectedOrder.status}
          </span>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Customer Information</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://placehold.co/40x40?text=${encodeURIComponent(selectedOrder.customerName.charAt(0))}`}
                  alt={selectedOrder.customerName}
                  className="w-10 h-10 rounded-full"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/40x40?text=U";
                  }}
                />
                <div>
                  <p className="font-medium text-foreground">{selectedOrder.customerName}</p>
                  <p className="text-sm text-muted-foreground">customer@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">{selectedOrder.formattedTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-green-600">{selectedOrder.formattedTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Product Details</h4>
          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={`https://placehold.co/60x60?text=${encodeURIComponent(selectedOrder.productName.charAt(0))}`}
                alt={selectedOrder.productName}
                className="w-15 h-15 rounded-md"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://placehold.co/60x60?text=P";
                }}
              />
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{selectedOrder.productName}</h5>
                <p className="text-sm text-muted-foreground">SKU: {selectedOrder.sku}</p>
                <p className="text-sm text-muted-foreground">Category: {selectedOrder.category}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">Qty: {selectedOrder.quantity || 1}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.formattedPrice} each</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setShowOrderDialog(false)}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              const newStatus = selectedOrder.status === 'Process' ? 'Delivered' : 'Process';
              setOrders(prev => prev.map(order => 
                order.id === selectedOrder.id 
                  ? { ...order, status: newStatus }
                  : order
              ));
              setSelectedOrder({ ...selectedOrder, status: newStatus });
            }}
          >
            {selectedOrder.status === 'Process' ? 'Mark as Delivered' : 'Mark as Processing'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders
          </p>
        </div>
        <Button>
          Export Orders
        </Button>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.process}</p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivered</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.delivered}</p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-card-foreground">{stats.pending}</p>
            </div>
            <div className="p-3 bg-orange-500 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">Recent Orders</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Status</option>
              <option>Process</option>
              <option>Delivered</option>
              <option>Pending</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
        </div>

        <GenericTable
          data={orders}
          columns={columns}
          actions={actions}
          searchKeys={['customerName', 'productName', 'id']}
          loading={loading}
          emptyMessage="No orders found."
        />
      </div>

      {/* Order Details Dialog */}
      <DialogBox
        isOpen={showOrderDialog}
        onClose={() => {
          setShowOrderDialog(false);
          setSelectedOrder(null);
        }}
        title="Order Details"
        size="xl"
      >
        <OrderDetailsModal />
      </DialogBox>
    </div>
  );
};

export default Orders;
