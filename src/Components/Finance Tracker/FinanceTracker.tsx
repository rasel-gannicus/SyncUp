"use client" ;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  DollarSign, Edit, Trash2 } from 'lucide-react';
import { StatCard } from './Stat Card/StatCard';
import { TransactionForm } from './Add Transaction Form/TransactionForm';
import Chart from './Chart/Chart';

export interface Transaction {
  id: string;
  type: 'income' | 'expenses';
  amount: number;
  date: string;
}
interface FinancialData {
  name: string;
  income: number;
  expenses: number;
  savings: number;
  transactions: Transaction[];
}
const initialData: FinancialData[] = [
  { name: 'Jun', income: 550, expenses: 450, savings: 0, transactions: [] },
  { name: 'July', income: 2000, expenses: 580, savings: 0, transactions: [] },
  { name: 'August', income: 900, expenses: 100, savings: 0, transactions: [] },
];
const FinanceTracker: React.FC = () => {
  const [data, setData] = useState<FinancialData[]>(initialData);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const latestMonth = data[data.length - 1];
  const prevMonth = data[data.length - 2] || { income: 0, expenses: 0, savings: 0 };


  const calculateTrend = (current: number, previous: number): number => {
    return previous === 0 ? 0 : Number(((current - previous) / previous * 100).toFixed(2));
  };

  const updateFinancialData = (newTransactions: Transaction[]) => {
    setData(prevData => {
      const newData = [...prevData];
      const lastMonth = newData[newData.length - 1];
      lastMonth.transactions = newTransactions;
      lastMonth.income = newTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
      lastMonth.expenses = newTransactions.filter(t => t.type === 'expenses').reduce((sum, t) => sum + t.amount, 0);
      lastMonth.savings = lastMonth.income - lastMonth.expenses;
      return newData;
    });
  };

  const handleAddTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    updateFinancialData([...latestMonth.transactions, newTransaction]);
  };

  const handleEditTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    if (editingTransaction) {
      const newTransactions = latestMonth.transactions.map(t =>
        t.id === editingTransaction.id ? { ...t, ...transaction } : t
      );
      updateFinancialData(newTransactions);
      setEditingTransaction(null);
    }
  };

  const handleRemoveTransaction = (id: string) => {
    const newTransactions = latestMonth.transactions.filter(t => t.id !== id);
    updateFinancialData(newTransactions);
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
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
          <CardTitle>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</CardTitle>
        </CardHeader>
        <CardContent>
          <TransactionForm
            onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
            initialValues={editingTransaction || undefined}
            submitLabel={editingTransaction ? 'Update Transaction' : 'Add Transaction'}
            onCancel={cancelEdit}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {latestMonth.transactions.length === 0 ? (
            <p>No transactions yet. Add a transaction to get started!</p>
          ) : (
            <ul className="space-y-2">
              {latestMonth.transactions.map(transaction => (
                <li key={transaction.id} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                  <span>{transaction.type === 'income' ? '➕' : '➖'} ${transaction.amount}</span>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => setEditingTransaction(transaction)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveTransaction(transaction.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Chart data={data} />
    </div>
  );
};

export default FinanceTracker;