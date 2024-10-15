import { toast } from 'react-hot-toast';
import FinanceTracker, { Transaction } from '../FinanceTracker';
import { useEditTransactionMutation } from '@/Redux/features/Finance Tracker/financeTrackerApi';

export const useOptimisticEditTransaction = (
  email: string | undefined,
  data: FinanceTracker[],
  setData: React.Dispatch<React.SetStateAction<FinanceTracker[]>>
) => {
  const [editTransaction] = useEditTransactionMutation();

  console.log(data)
  const handleEditTransaction = async (
    transactionId: string,
    updatedTransaction: Transaction
  ) => {
    if (!email) return;

    const monthIndex = data.length - 1;
    const latestMonth = data[monthIndex];
    const transactionIndex = latestMonth.transactions.findIndex(
      (t : any) => t._id === transactionId
    );

    if (transactionIndex === -1) return; // Ensure the transaction exists

    const toastId = toast.loading("Updating transaction...");

    // Capture the original transaction to revert back in case of failure
    const originalTransaction = latestMonth.transactions[transactionIndex];

    // Optimistically update the UI
    const updatedMonth = {
      ...latestMonth,
      transactions: latestMonth.transactions.map((t: any) =>
        t._id === transactionId ? { ...t, ...updatedTransaction } : t
      ),
      income:
        latestMonth.income -
        (originalTransaction.type === 'income' ? originalTransaction.amount : 0) +
        (updatedTransaction.type === 'income' ? updatedTransaction.amount : 0),
      expenses:
        latestMonth.expenses -
        (originalTransaction.type === 'expenses' ? originalTransaction.amount : 0) +
        (updatedTransaction.type === 'expenses' ? updatedTransaction.amount : 0),
      savings: latestMonth.income - latestMonth.expenses
    };

    setData((prevData) => {
      const updatedData = prevData.map((month, index) =>
        index === monthIndex ? updatedMonth : month
      ); // Optimistic update
      return updatedData;
    });

    try {
      const response: any = await editTransaction({
        email,
        monthName: latestMonth.name,
        transactionId,
        updatedTransaction
      });

      if ('error' in response) {
        // Revert the optimistic update if the request fails
        setData((prevData) => {
          const revertedData = prevData.map((month, index) =>
            index === monthIndex
              ? {
                  ...latestMonth,
                  transactions: latestMonth.transactions.map((t: any) =>
                    t._id === transactionId ? originalTransaction : t
                  ),
                  income:
                    latestMonth.income -
                    (updatedTransaction.type === 'income'
                      ? updatedTransaction.amount
                      : 0) +
                    (originalTransaction.type === 'income'
                      ? originalTransaction.amount
                      : 0),
                  expenses:
                    latestMonth.expenses -
                    (updatedTransaction.type === 'expenses'
                      ? updatedTransaction.amount
                      : 0) +
                    (originalTransaction.type === 'expenses'
                      ? originalTransaction.amount
                      : 0),
                  savings: latestMonth.income - latestMonth.expenses
                }
              : month
          );
          return revertedData;
        });
        toast.error(
          response.error.data.message || 'Failed to edit transaction.'
        );
      } else {
        toast.success('Transaction updated successfully.');
      }
    } catch (error) {
      // Revert the optimistic update if an unexpected error occurs
      setData((prevData) => {
        const revertedData = prevData.map((month, index) =>
          index === monthIndex
            ? {
                ...latestMonth,
                transactions: latestMonth.transactions.map((t: any) =>
                  t._id === transactionId ? originalTransaction : t
                ),
                income:
                  latestMonth.income -
                  (updatedTransaction.type === 'income'
                    ? updatedTransaction.amount
                    : 0) +
                  (originalTransaction.type === 'income'
                    ? originalTransaction.amount
                    : 0),
                expenses:
                  latestMonth.expenses -
                  (updatedTransaction.type === 'expenses'
                    ? updatedTransaction.amount
                    : 0) +
                  (originalTransaction.type === 'expenses'
                    ? originalTransaction.amount
                    : 0),
                savings: latestMonth.income - latestMonth.expenses
              }
            : month
        );
        return revertedData;
      });
      toast.error('An unexpected error occurred while editing the transaction.');
      console.error('Error editing transaction:', error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return handleEditTransaction;
};
