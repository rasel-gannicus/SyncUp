"use client" ;
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Transaction } from "../FinanceTracker";


interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  initialValues?: Omit<Transaction, 'id' | 'date'>;
  submitLabel: string;
  onCancel: () => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, initialValues, submitLabel, onCancel }) => {
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