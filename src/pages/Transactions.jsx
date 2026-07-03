import AddNewTransaction from "../Features/transactions/AddNewTransaction";
import TransactionsMainArea from "../Features/transactions/TransactionsMainArea";
import PageHeader from "../ui/PageHeader";
function Transactions() {
  return (
    <div>
      <PageHeader>
        <div>
          <h3 className="text-[18px] font-bold text-black sm:text-xl">
            المعاملات المالية
          </h3>
          <p className="mt-1 text-[14px] font-semibold text-stone-700 sm:text-[16px]">
            دخل، مصروف، مرتبات، منتجات
          </p>
        </div>
        <AddNewTransaction />
      </PageHeader>
      <TransactionsMainArea />
    </div>
  );
}

export default Transactions;
