import TransactionsContainer from "../transactions/TransactionContainer";
import TransactionsOperations from "./TransactionsOperations";
function TransactionsMainArea() {
  return (
    <>
      <TransactionsOperations />
      <TransactionsContainer />
    </>
  );
}

export default TransactionsMainArea;
