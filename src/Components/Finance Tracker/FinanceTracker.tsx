"use client" ;
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from 'lucide-react';
import { StatCard } from './Stat Card/StatCard';
import { AddTransactionForm } from './Add Transaction Form/AddTransactionForm';
interface FinancialData {
  name: string;
  income: number;
  expenses: number;
  savings: number;
}


const initialData: FinancialData[] = [
  { name: 'Jan', income: 4000, expenses: 3000, savings: 1000 },
  { name: 'Feb', income: 4500, expenses: 3200, savings: 1300 },
  { name: 'Mar', income: 5000, expenses: 3500, savings: 1500 },
  { name: 'Apr', income: 4800, expenses: 3300, savings: 1500 },
  { name: 'May', income: 5200, expenses: 3800, savings: 1400 },
  { name: 'Jun', income: 5500, expenses: 4000, savings: 1500 },
];

const FinanceTracker: React.FC = () => {
  const [data, setData] = useState<FinancialData[]>(initialData);

  const latestMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2];

  const calculateTrend = (current: number, previous: number): number => {
    return Number(((current - previous) / previous * 100).toFixed(2));
  };

  const handleAddTransaction = (type: 'income' | 'expenses', amount: number) => {
    const newData = [...data];
    const lastMonth = newData[newData.length - 1];
    
    lastMonth[type] += amount;
    lastMonth.savings = lastMonth.income - lastMonth.expenses;
    
    setData(newData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-3xl font-bold mb-4">Finance Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Total Income" 
          value={latestMonth.income} 
          trend={calculateTrend(latestMonth.income, prevMonth.income)}
          icon={DollarSign}
        />
        <StatCard 
          title="Total Expenses" 
          value={latestMonth.expenses} 
          trend={calculateTrend(latestMonth.expenses, prevMonth.expenses)}
          icon={DollarSign}
        />
        <StatCard 
          title="Total Savings" 
          value={latestMonth.savings} 
          trend={calculateTrend(latestMonth.savings, prevMonth.savings)}
          icon={DollarSign}
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <AddTransactionForm onAddTransaction={handleAddTransaction} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="savings" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceTracker;