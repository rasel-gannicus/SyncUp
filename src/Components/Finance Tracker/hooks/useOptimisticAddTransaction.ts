import { toast } from 'react-hot-toast';
import FinanceTracker, { Transaction } from '../FinanceTracker';
import { useAddTransactionMutation } from '@/Redux/features/Finance Tracker/financeTrackerApi';

export const useOptimisticAddTransaction = (email: string | undefined, setData: React.Dispatch<React.SetStateAction<FinanceTracker[]>>) => {
  const [addTransaction] = useAddTransactionMutation();

  const handleAddTransaction = async (transaction: Omit<Transaction, 'id' | 'date'>) => {
    if (!email) return;

    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(), // Temporary ID
      date: new Date().toISOString(),
    };

    const toastId = toast.loading("Adding transaction...");

    // Optimistically update the UI
    setData((prevData) => {
      // Create a deep copy of prevData to avoid mutating the original state
      const newData = prevData.map((month) => ({
        ...month,
        transactions: [...month.transactions], // Shallow copy of transactions array
      }));

      const latestMonth = newData[newData.length - 1];

      if (latestMonth) {
        // Create a new array for transactions and update income/expenses safely
        latestMonth.transactions = [...latestMonth.transactions, newTransaction];
        latestMonth.income += transaction.type === 'income' ? transaction.amount : 0;
        latestMonth.expenses += transaction.type === 'expenses' ? transaction.amount : 0;
        latestMonth.savings = latestMonth.income - latestMonth.expenses;
      }

      return newData;
    });

    try {
      const response: any = await addTransaction({ 
        email, 
        monthName: new Date().toLocaleString('default', { month: 'long' }), 
        transaction,
      });

      if ('error' in response) {
        // If the request fails, revert the optimistic update
        setData((prevData) => {
          const newData = prevData.map((month) => ({
            ...month,
            transactions: month.transactions.filter((t) => t.id !== newTransaction.id),
          }));
          return newData;
        });
        toast.error(response.error.data.message || "Failed to add transaction.");
      } else {
        // Update the local state with the server response
        setData(response.data.updatedFinancialData);
        toast.success("Transaction added successfully.");
      }
    } catch (error) {
      // If an unexpected error occurs, revert the optimistic update
      setData((prevData) => {
        const newData = prevData.map((month) => ({
          ...month,
          transactions: month.transactions.filter((t) => t.id !== newTransaction.id),
        }));
        return newData;
      });
      toast.error("An unexpected error occurred while adding the transaction.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return handleAddTransaction;
};
