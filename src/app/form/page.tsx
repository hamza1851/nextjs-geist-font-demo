"use client";

import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { parseFormData } from '../../utils/parsers.js';

const Form: React.FC = () => {
  const [formData, setFormData] = useState({
    manufacturerName: '',
    manufacturerBrand: '',
    stocks: '',
    price: '',
    discount: '',
    orders: '',
    colors: [] as string[],
    size: ''
  });

  const [loading, setLoading] = useState(false);

  const colorOptions = [
    { name: 'Teal', value: 'teal', color: 'bg-teal-500' },
    { name: 'Cyan', value: 'cyan', color: 'bg-cyan-500' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
    { name: 'Red', value: 'red', color: 'bg-red-500' },
    { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
    { name: 'Indigo', value: 'indigo', color: 'bg-indigo-500' },
    { name: 'Black', value: 'black', color: 'bg-black' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleColorChange = (colorValue: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(colorValue)
        ? prev.colors.filter(c => c !== colorValue)
        : [...prev.colors, colorValue]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse form data
      const parsedData = parseFormData(formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', parsedData);
      
      // Reset form
      setFormData({
        manufacturerName: '',
        manufacturerBrand: '',
        stocks: '',
        price: '',
        discount: '',
        orders: '',
        colors: [],
        size: ''
      });

      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Information Form</h1>
          <p className="text-muted-foreground">
            Fill in the information below to add a new product
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* General Information Section */}
          <div className="bg-muted/20 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-card-foreground mb-2">
              General Information
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Fill the Information Below
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  name="manufacturerName"
                  value={formData.manufacturerName}
                  onChange={handleInputChange}
                  placeholder="Enter Manufacturer Name"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Manufacturer Brand
                </label>
                <input
                  type="text"
                  name="manufacturerBrand"
                  value={formData.manufacturerBrand}
                  onChange={handleInputChange}
                  placeholder="Enter Manufacturer Brand"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Stocks
              </label>
              <input
                type="number"
                name="stocks"
                value={formData.stocks}
                onChange={handleInputChange}
                placeholder="Enter Stocks"
                min="0"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter Price"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Discount
              </label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  %
                </span>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter Discount"
                  min="0"
                  max="100"
                  className="w-full px-3 pr-8 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Orders
              </label>
              <input
                type="number"
                name="orders"
                value={formData.orders}
                onChange={handleInputChange}
                placeholder="Enter Orders"
                min="0"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Colors and Size Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Colors
              </label>
              <div className="space-y-3">
                {/* Filled Colors */}
                <div className="flex items-center space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => handleColorChange(color.value)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${color.color} ${
                        formData.colors.includes(color.value)
                          ? 'border-foreground scale-110'
                          : 'border-border hover:border-foreground/50'
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>

                {/* Outline Colors */}
                <div className="flex items-center space-x-2">
                  {colorOptions.map((color) => (
                    <button
                      key={`outline-${color.value}`}
                      type="button"
                      onClick={() => handleColorChange(`outline-${color.value}`)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.colors.includes(`outline-${color.value}`)
                          ? 'border-foreground scale-110'
                          : 'border-border hover:border-foreground/50'
                      }`}
                      style={{
                        backgroundColor: 'transparent',
                        borderColor: color.value === 'black' ? '#000' : 
                                   color.value === 'teal' ? '#14b8a6' :
                                   color.value === 'cyan' ? '#06b6d4' :
                                   color.value === 'orange' ? '#f97316' :
                                   color.value === 'red' ? '#ef4444' :
                                   color.value === 'blue' ? '#3b82f6' :
                                   color.value === 'indigo' ? '#6366f1' : '#6b7280'
                      }}
                      title={`${color.name} Outline`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="Enter Size"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              loading={loading}
              className="px-8 py-3 text-lg"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>

      {/* Form Preview */}
      {Object.values(formData).some(value => 
        Array.isArray(value) ? value.length > 0 : value !== ''
      ) && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Form Preview
          </h3>
          <div className="bg-muted/20 rounded-lg p-4">
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              {JSON.stringify(parseFormData(formData), null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
