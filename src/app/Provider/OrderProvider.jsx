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
  const [selectedproduct, setselectedproduct] = useState([]);
  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order)); 
  }, [order]);

  return (
    <OrderContext.Provider value={{ order,setOrder,selectedproduct,setselectedproduct}}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderProvider, OrderContext };
