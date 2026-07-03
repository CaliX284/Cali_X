import TransactionsContainer from "../transactions/TransactionContainer";
import TransactionsDashboard from "./TransactionsDashboard";
import TransactionsOperations from "./TransactionsOperations";

function TransactionsMainArea() {
  return (
    <>
      <TransactionsDashboard />
      <TransactionsOperations />
      <TransactionsContainer />
    </>
  );
}

export default TransactionsMainArea;
