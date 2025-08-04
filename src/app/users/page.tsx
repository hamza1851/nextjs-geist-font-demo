"use client";

import React, { useState, useEffect } from 'react';
import GenericTable from '../../components/common/GenericTable';
import Button from '../../components/common/Button';
import { mockData } from '../../api/apiMethods';
import { parseOrderList } from '../../utils/parsers.js';

const Users: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [discountData, setDiscountData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'orders' | 'discounts'>('orders');

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const parsedOrders = parseOrderList(mockData.orders);
      setOrders(parsedOrders);
      
      // Mock discount data
      setDiscountData([
        {
          id: 1,
          productName: 'Tery White',
          userName: 'John Doe',
          discount: 15,
          status: 'Active'
        },
        {
          id: 2,
          productName: 'Tery White',
          userName: 'Jane Smith',
          discount: 20,
          status: 'Active'
        }
      ]);
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const orderColumns = [
    {
      key: 'id',
      label: 'Order ID',
      sortable: true,
      width: '120px'
    },
    {
      key: 'productName',
      label: 'Product Name',
      sortable: true
    },
    {
      key: 'formattedPrice',
      label: 'Price',
      sortable: true,
      render: (value: string) => (
        <span className="font-semibold text-green-600">{value}</span>
      )
    },
    {
      key: 'sku',
      label: 'SKU',
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (value: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {value}
        </span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    }
  ];

  const discountColumns = [
    {
      key: 'productName',
      label: 'Product Name',
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
          <span>{value}</span>
        </div>
      )
    },
    {
      key: 'userName',
      label: 'User Name',
      sortable: true
    },
    {
      key: 'discount',
      label: 'Discount',
      sortable: true,
      render: (value: number) => (
        <span className="font-semibold text-green-600">{value}%</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
    }
  ];

  const orderActions = [
    {
      label: 'Process',
      onClick: (row: any) => {
        setOrders(prev => prev.map(order => 
          order.id === row.id 
            ? { ...order, status: 'Process' }
            : order
        ));
      },
      variant: 'outline' as const
    },
    {
      label: 'View',
      onClick: (row: any) => {
        console.log('View order:', row);
      },
      variant: 'ghost' as const
    }
  ];

  const discountActions = [
    {
      label: 'Apply Now',
      onClick: (row: any) => {
        console.log('Apply discount:', row);
      },
      variant: 'primary' as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">
            Manage user orders and discount applications
          </p>
        </div>
        <Button>
          Create New User
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            User Details
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'discounts'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
            }`}
          >
            User Discount
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'orders' && (
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-card-foreground">User Details</h2>
            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>All Status</option>
                <option>Process</option>
                <option>Delivered</option>
                <option>Pending</option>
              </select>
            </div>
          </div>

          <GenericTable
            data={orders}
            columns={orderColumns}
            actions={orderActions}
            searchKeys={['productName', 'sku', 'category']}
            loading={loading}
            emptyMessage="No user orders found."
          />
        </div>
      )}

      {activeTab === 'discounts' && (
        <div className="space-y-6">
          {/* Discount Table */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-card-foreground">User Discount</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search for Customer, Email, Country, State or Something Else..."
                  className="px-3 py-2 w-96 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="date"
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <Button variant="primary">
                  Filters
                </Button>
              </div>
            </div>

            <GenericTable
              data={discountData}
              columns={discountColumns}
              actions={discountActions}
              searchKeys={['productName', 'userName']}
              loading={loading}
              emptyMessage="No discount data found."
            />
          </div>

          {/* Discount Application Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Apply Discount
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Product Name
                </label>
                <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>Select Product</option>
                  <option>Tery White</option>
                  <option>Product 2</option>
                  <option>Product 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Discount %
                </label>
                <input
                  type="number"
                  placeholder="Enter discount percentage"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button>
                Apply Discount
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
