"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Edit, Trash2 } from 'lucide-react';
import Chart from './Chart/Chart';
import { useAppSelector } from '@/Redux/hooks'; // Adjust the import path as needed
import { useAddTransactionMutation, useDeleteTransactionMutation, useEditTransactionMutation } from '@/Redux/features/Finance Tracker/financeTrackerApi';
import { StatCard } from './Stat Card/StatCard';
import { TransactionForm } from './Add Transaction Form/TransactionForm';
import { toast } from 'react-hot-toast';

export interface Transaction {
  id: string;
  type: 'income' | 'expenses';
  amount: number;
  date: string;
}

interface FinanceTracker {
  name: string;
  income: number;
  expenses: number;
  savings: number;
  transactions: Transaction[];
}

const FinanceTracker: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const { user: userData, userLoading } = userState;
  const email = userData?.email;

  const [data, setData] = useState<FinanceTracker[]>(userData?.financeTracker || []);
  const [editingTransaction, setEditingTransaction] : any = useState<Transaction | null>(null);

  const [addTransaction] = useAddTransactionMutation();
  const [editTransaction] = useEditTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const latestMonth = data[data.length - 1] || { name: '', income: 0, expenses: 0, savings: 0, transactions: [] };
  const prevMonth = data[data.length - 2] || { income: 0, expenses: 0, savings: 0 };

  useEffect(() => {
    if (userData?.financeTracker) {
      setData(userData.financeTracker);
    }
  }, [userData]);

  const calculateTrend = (current: number, previous: number): number => {
    return previous === 0 ? 0 : Number(((current - previous) / previous * 100).toFixed(2));
  };

  const handleAddTransaction = async (transaction: Transaction) => {
    if (!email) return;

    const toastId = toast.loading("Adding todo...");

    const updatedMonth = {
      ...latestMonth,
      transactions: [...latestMonth.transactions, transaction], // Optimistically add transaction
    };

    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[updatedData.length - 1] = updatedMonth; // Optimistic update
      return updatedData;
    });

    try {
      const response: any = await addTransaction({ email, monthName: latestMonth.name, transaction });

      if ("error" in response) {
        toast.error(response.error.data.message || "Failed to add todo.");
      } else {
        toast.success("Todo added successfully.");
      }

    } catch (error) {
      // Revert optimistic update if the request fails
      setData((prevData) => {
        const updatedData = [...prevData];
        updatedData[updatedData.length - 1].transactions = updatedData[updatedData.length - 1].transactions.filter(
          (t) => t.id !== transaction.id
        );
        return updatedData;
      });
      console.error('Error adding transaction:', error);
    }finally {
      toast.dismiss(toastId);
    }
  };
  
  const handleEditTransaction = async (transactionId: string, updatedTransaction: Transaction) => {
    if (!email) return;
    console.log(editingTransaction._id) ;
    try {
      await editTransaction({ email, monthName: latestMonth.name, transactionId, updatedTransaction });
    } catch (error) {
      console.error('Error editing transaction:', error);
    }
  };
  
  const handleRemoveTransaction = async (transactionId: string) => {
    console.log("🚀 ~ handleRemoveTransaction ~ transactionId:", transactionId)
    if (!email) return;
    try {
      await deleteTransaction({ email, monthName: latestMonth.name, transactionId });
    } catch (error) {
      console.error('Error removing transaction:', error);
    }
  };

  const cancelEdit = () => {
    setEditingTransaction(null);
  };

  if (userLoading) {
    return <div>Loading...</div>;
  }

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
            onSubmit={editingTransaction ? 
              (updatedTransaction : any) => handleEditTransaction(editingTransaction?._id, updatedTransaction as Transaction) : 
              handleAddTransaction}
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
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveTransaction(transaction._id)}>
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