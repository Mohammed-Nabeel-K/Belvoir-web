"use client"

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../../../axios/axiosinstance/axiosInstance';
import TableLoading from '../components/shimmerui/tableloading'

const SalesTable = () => {
  // State to store sales data
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch sales data from the API
  const fetchSalesData = async () => {
    try {
      const response = await axiosInstance.get('/Admin/sales-report');
      setSalesData(response.data.data);
      console.log(salesData);

    } catch (err) {
      setError(err.message || 'Failed to fetch sales data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="border-b">
            <div className="flex">
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Date</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Tailoring</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Laundry</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Rentals</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Total Sales</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Target Sales</div>
              <div className="flex-1 px-4 py-3 text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>

          {/* Body */}
          <div>
            {loading && <TableLoading/>}
            {error && <p className="px-4 py-3 text-red-500">{error}</p>}
            {!loading && !error && salesData.length === 0 && (
              <p className="px-4 py-3">No sales data .</p>
            )}
            {salesData.map((record, index) => (
              <div
                key={index}
                className="flex border-b transition-colors hover:bg-gray-50"
              >
                <div className="flex-1 px-4 py-3 text-sm">
                  {new Date(record.date).toLocaleDateString()}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.tailoring}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.laundry}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.rentals}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.totalSales}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.targetSales}
                </div>
                <div className="flex-1 px-4 py-3 text-sm">
                  ${record.totalRevenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
