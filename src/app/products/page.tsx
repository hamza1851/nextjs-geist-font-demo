"use client";

import React, { useState, useEffect } from 'react';
import GenericTable from '../../components/common/GenericTable';
import Button from '../../components/common/Button';
import DialogBox, { ConfirmDialog } from '../../components/common/DialogBox';
import { mockData } from '../../api/apiMethods';
import { parseProductList } from '../../utils/parsers.js';
import { formatCurrency } from '../../utils/helpers.js';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const parsedProducts = parseProductList(mockData.products);
      setProducts(parsedProducts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const columns = [
    {
      key: 'id',
      label: 'Product ID',
      sortable: true,
      width: '120px'
    },
    {
      key: 'name',
      label: 'Product Name',
      sortable: true,
      render: (value: string, row: any) => (
        <div className="flex items-center space-x-3">
          <img
            src={`https://placehold.co/40x40?text=${encodeURIComponent(value.charAt(0))}`}
            alt={value}
            className="w-10 h-10 rounded-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/40x40?text=P";
            }}
          />
          <span className="font-medium">{value}</span>
        </div>
      )
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

  const actions = [
    {
      label: 'Edit',
      onClick: (row: any) => {
        setSelectedProduct(row);
        setShowCreateDialog(true);
      },
      variant: 'outline' as const
    },
    {
      label: 'Delete',
      onClick: (row: any) => {
        setSelectedProduct(row);
        setShowDeleteDialog(true);
      },
      variant: 'destructive' as const
    }
  ];

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setShowCreateDialog(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(prev => prev.filter(p => p.id !== selectedProduct.id));
      setSelectedProduct(null);
    }
  };

  const ProductForm = () => {
    const [formData, setFormData] = useState({
      name: selectedProduct?.name || '',
      price: selectedProduct?.price || '',
      sku: selectedProduct?.sku || '',
      category: selectedProduct?.category || '',
      status: selectedProduct?.status || 'Draft'
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newProduct = {
        id: selectedProduct?.id || `#TB${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price),
        formattedPrice: formatCurrency(parseFloat(formData.price))
      };

      if (selectedProduct) {
        // Update existing product
        setProducts(prev => prev.map(p => p.id === selectedProduct.id ? newProduct : p));
      } else {
        // Add new product
        setProducts(prev => [...prev, newProduct]);
      }

      setShowCreateDialog(false);
      setSelectedProduct(null);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              SKU
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              required
            >
              <option value="">Select Category</option>
              <option value="Cards">Cards</option>
              <option value="Flex">Flex</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Draft">Draft</option>
              <option value="Publish">Publish</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowCreateDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {selectedProduct ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">
            Manage your product inventory and details
          </p>
        </div>
        <Button onClick={handleCreateProduct}>
          Create New Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">Product List</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Categories</option>
              <option>Cards</option>
              <option>Flex</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
            <select className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
              <option>All Status</option>
              <option>Draft</option>
              <option>Publish</option>
            </select>
          </div>
        </div>

        <GenericTable
          data={products}
          columns={columns}
          actions={actions}
          searchKeys={['name', 'sku', 'category']}
          loading={loading}
          emptyMessage="No products found. Create your first product to get started."
        />
      </div>

      {/* Create/Edit Product Dialog */}
      <DialogBox
        isOpen={showCreateDialog}
        onClose={() => {
          setShowCreateDialog(false);
          setSelectedProduct(null);
        }}
        title={selectedProduct ? 'Edit Product' : 'Create New Product'}
        size="lg"
      >
        <ProductForm />
      </DialogBox>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};

export default Products;
