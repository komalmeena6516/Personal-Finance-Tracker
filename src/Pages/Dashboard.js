import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards';
import AddExpenseModal from '../Modals/addExpense';
import AddIncomeModal from '../Modals/addIncome';

import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import moment from "moment";
import TransactionTable from '../components/TransactionsTable';
import NoTransactions from '../NoTransactions';
import ChartComponent from '../components/Charts/index'


const Dashboard = () => {

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([])
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  }
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  }
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  }
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransation = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransation);
  }

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`), transaction
      );
      console.log("documnet written with id ", docRef.id);
      if (!many) toast.success("Transaction Added");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (error) {
      console.log("error adde3d document", error);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    //get al docs from a collection
    fetchTrasactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incometotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Incomes") {
        incometotal += transaction.amount;
      }
      else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incometotal);
    setExpense(expenseTotal);
    setTotalBalance(incometotal - expenseTotal);

  }

  async function fetchTrasactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);

      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      })
      setTransactions(transactionsArray);
      console.log("transaction Array", transactionsArray);
      toast.success("Trasacation Fetch!");

    }
    setLoading(false);
  }
let SortedTransactions = transactions.sort((a,b)=>{
  return new Date(a.date) - new Date(b.date);
});

  return (
    <div>
      <Header />
      {
        loading ? (
          <p>Loading......</p>
        )
          :
          (
            <>
              <Cards
                income={income}
                expense={expense}
                totalBalance={totalBalance}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
              />
{
  transactions.length !==  0 ?(
  <ChartComponent SortedTransactions={SortedTransactions}/>
  ):(
    <NoTransactions />
  )
}
              <AddExpenseModal
                isExpenseModalVisible={isExpenseModalVisible}
                handleExpenseCancel={handleExpenseCancel}
                onFinish={onFinish}
              />
              <AddIncomeModal
                isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeCancel={handleIncomeCancel}
                onFinish={onFinish}
              />

              <TransactionTable transactions={transactions}
                addTransaction={addTransaction}
                fetchTrasactions={fetchTrasactions}
              />
            </>
          )
      }

    </div>
  )
}

export default Dashboard