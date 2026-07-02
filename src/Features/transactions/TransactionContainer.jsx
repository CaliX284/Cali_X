import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import { useGetTransactions } from "./useGetTransactions";
import TransactionCard from "./TransactionCard";
import Pagination from "../../ui/Pagination";

function TransactionContainer() {
  const { transactions, count, isLoading, error } = useGetTransactions();
  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <>
      <div className="mt-3 flex flex-col gap-4 p-1">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
      <Pagination count={count} />
    </>
  );
}

export default TransactionContainer;
