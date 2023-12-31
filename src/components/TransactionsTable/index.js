import { Table, Select, Radio } from 'antd'
import React, { useState } from 'react'
import searchImg from "../../assests/searchImg.svg"
import { unparse, parse } from 'papaparse';
import {toast} from "react-toastify"


const TransactionTable = ({ transactions, addTransaction, fetchTransactions }) => {
  const { Option } = Select;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ]

  // filter by name or type
  let filterTransaction = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter)
  )

  // sortiing by date and amount
  let SortedTransactions = filterTransaction.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.Date);
    }
    else if (sortKey === "amount") {
      return a.amount - b.amount;
    }
    else {
      return 0;
    }
  });

  function exportCSV(){
    var csv = unparse({
      fields: ["name", "type", "date", "tag", "amount"],
      data: transactions,
    });
    const blob = new Blob([csv], { type:"text/csv charset=utf-8"});
    var url =  URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    //link.download = "transactions.csv";
    link.setAttribute('download', 'transactions.csv');
    //document.body.appenChild(link);
    link.click();
    //document.body.removeChild(link);
  }

  function importFromCSV(event){
    event.preventDefault();
    try {
      parse(event.target.files[0],{
        header: true,
        complete: async function (results){
          //now results.data is ana array of objects repreneting your csv row
          for(const transaction of results.data){
            //write each transaction to firebase you can use addtransaction function
            console.log("transactions", transaction);
            const newTransation = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransation, true);
          }
        },
      });
      toast.success("All transactions added");
      fetchTransactions();
      event.target.files = null;
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (

    <div style={{
      width: "98%",
      padding: "0rem 20px",
    }}>


      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1rem",
      }}>



        <div className="input-flex">
          <img src={searchImg} width="16" alt="" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by Name'
          />
        </div>


        <Select
          className="select-input"
          value={typeFilter}
          onChange={(value) => setTypeFilter(value)}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="Incomes">Income</Option>
          <Option value="expenses">Expense</Option>
        </Select>
      </div>

      <div className="my-table">
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "1rem",
        }}>

          <h2>My Transactions</h2>

          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No sort</Radio.Button>
            <Radio.Button value="date" >Sort by Date</Radio.Button>
            <Radio.Button value="amount" >Sort by Amount</Radio.Button>
          </Radio.Group>


          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            width: "263px",
          }}>

            <button className='btn' onClick={exportCSV}>Export to CSV</button>
            <label htmlFor="file-csv" className='btn btn-blue'>Import from CSV</label>
            <input
              id='file-csv'
              accept='.csv'
              required
              style={{ display: "none" }}
              type="file"
              onChange={importFromCSV} />
          </div>
        </div>

        <Table
          dataSource={SortedTransactions}
          columns={columns}
         />

      </div>
    </div>

  )


}

export default TransactionTable