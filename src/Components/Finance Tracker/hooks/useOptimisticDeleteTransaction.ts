import { toast } from 'react-hot-toast';
import { useDeleteTransactionMutation } from '@/Redux/features/Finance Tracker/financeTrackerApi';
import FinanceTracker from '../FinanceTracker';

export const useOptimisticDeleteTransaction = (
  email: string | undefined,
  setData: React.Dispatch<React.SetStateAction<FinanceTracker[]>>
) => {
  const [deleteTransaction] = useDeleteTransactionMutation();

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!email) return;

    const toastId = toast.loading("Removing transaction...");

    // Optimistically update the UI
    setData((prevData) => {
      // Create a deep copy of the prevData to avoid mutating the original state
      const newData = prevData.map((month) => ({
        ...month,
        transactions: month.transactions.filter((t) => t.id !== transactionId),
      }));

      return newData;
    });

    try {
      const response: any = await deleteTransaction({
        email,
        monthName: new Date().toLocaleString('default', { month: 'long' }),
        transactionId,
      });

      if ('error' in response) {
        toast.error(response.error.data.message || "Failed to remove transaction.");

        // Revert the optimistic deletion by restoring the transaction
        setData((prevData) => {
          // Create a deep copy and restore the deleted transaction
          const newData = prevData.map((month) => ({
            ...month,
            transactions: [...month.transactions, response.data.deletedTransaction],
          }));

          return newData;
        });
      } else {
        toast.success("Transaction removed successfully.");
      }
    } catch (error : any) {
      // Revert on unexpected error
      setData((prevData) => {
        // Revert the optimistic update by restoring the deleted transaction
        const newData = prevData.map((month) => ({
          ...month,
          transactions: [...month.transactions, { id: transactionId, ...error }],
        }));

        return newData;
      });
      toast.error("An unexpected error occurred while removing the transaction.");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return handleDeleteTransaction;
};
