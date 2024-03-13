import TransactionForm from "../forms/transaction-form";
import { Button } from "../ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Footer } from "./parts/footer";

const AddTransactionModal = () => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogDescription>Add a new transaction...</DialogDescription>
      </DialogHeader>
      <TransactionForm />
      <Footer show={true}>
        <Button>Add Transaction</Button>
      </Footer>
    </>
  );
};

export default AddTransactionModal;
