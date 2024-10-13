"use client" ;
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight, ArrowDownRight, DollarSign, PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Transaction {
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

interface StatCardProps {
  title: string;
  value: number;
  trend: number;
  icon: React.ElementType;
}

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  initialValues?: Omit<Transaction, 'id' | 'date'>;
  submitLabel: string;
  onCancel: () => void;
}

const initialData: FinancialData[] = [
  { name: 'Jun', income: 550, expenses: 450, savings: 0, transactions: [] },
  { name: 'July', income: 2000, expenses: 580, savings: 0, transactions: [] },
  { name: 'August', income: 900, expenses: 100, savings: 0, transactions: [] },
];

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon: Icon }) => (
  <Card className="flex-1">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">${value.toLocaleString()}</div>
      <p className={`text-xs ${trend >= 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}>
        {trend >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
        {Math.abs(trend)}%
      </p>
    </CardContent>
  </Card>
);

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, initialValues, submitLabel, onCancel }) => {
  const [type, setType] = useState<'income' | 'expenses'>(initialValues?.type || 'income');
  const [amount, setAmount] = useState<string>(initialValues?.amount.toString() || '');

  useEffect(() => {
    if (initialValues) {
      setType(initialValues.type);
      setAmount(initialValues.amount.toString());
    } else {
      setType('income');
      setAmount('');
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && !isNaN(parseFloat(amount))) {
      onSubmit({ type, amount: parseFloat(amount) });
      setAmount('');
      setType('income');
    }
  };

  const handleCancel = () => {
    onCancel();
    setType('income');
    setAmount('');
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <Select value={type} onValueChange={(value: 'income' | 'expenses') => setType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expenses">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="flex-grow"
        />
      </div>
      <div className="flex space-x-2">
        <Button type="submit" className="flex-1" >
          <PlusCircle className="mr-2 h-4 w-4" /> {submitLabel}
        </Button>
        <Button type="button" variant="outline" 
        onClick={handleCancel} 
        className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};

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