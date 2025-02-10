// OrderProvider.js
"use client";
import React, { createContext, useState, useEffect } from 'react';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({
    totalAmount: 0,
    paymentMethod: '',
    shippingAddress: '',
    shippingMethod: '',
    shippingCost: 0,
    trackingNumber: '',
    productType: 'rental',
    rentalProductId: '',
    quantity: 0,
    price: 0
  });

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order)); 
  }, [order]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
