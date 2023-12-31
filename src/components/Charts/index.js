import React from 'react'
import { Line , Pie} from '@ant-design/charts'
import { Card, Row } from "antd";

const cardStyle = {
    boxShadow: "0px 0px 30px 8px rgba(227, 227, 227, 0.75)",
    margin: "2rem",
    borderRadius: "0.5rem",
    minWidth: "400px",
    flex: 1,
  };

  const style = {
   width: "100%",
  };

const ChartComponent = ({SortedTransactions}) => {

console.log("sorted transactin", SortedTransactions);

    const data = SortedTransactions.map((item)=>{
        return {date: item.date, amount: item.amount};
    });

    const spendingData = SortedTransactions.filter((transaction)=>{
        if(transaction.type == "expenses"){
            return { tag: transaction.tag, amount: transaction.amount}
        }
    });

    // const finalSpending = spendingData.reduce((acc, obj)=>{
    //     let key = obj.tag;
    //     if(!acc[key]){
    //         acc[key] = {tag : obj.tag, amount: obj.amount}; // create new object with same proeprty
    //     }
    //     else{
    //         acc[key].amount += obj.amount;
    //     }
    //     return acc;
    // }, {});

    let newspending = [
        { tag: 'Food', amount: 0},
        { tag: 'Education', amount: 0},
        { tag: 'Party', amount: 0},
        { tag: 'Vacations', amount: 0},
    ];
    spendingData.forEach((item)=>{
        if(item.tag == "Food"){
            newspending[0].amount += item.amount;
        }
        else if(item.tag == "Education"){
            newspending[1].amount += item.amount;
        }
        else if (item.tag == "Party"){
            newspending[2].amount += item.amount;
        }
        else{
            newspending[3].amount += item.amount;
        }
    })

    const config = {
        data: Object.values(data),
        autoFit: true,
        xField: "date",
        yField: "amount",
    };

    const spendingConfig ={
        data : newspending,
        angleField: "amount",
        colorField: "tag",
    }
    let chart;
    let pieChart;
  return (
    <>
  <Row gutter={8} style={style}>
  <Card bordered={true} style={cardStyle}>
     <h2 style={{marginTop : 0}}>Your Analytics</h2>
     <Line style={{marginBottom:"10px"}}
            {...config}
            onReady={(chartInstance) => (chart = chartInstance)}
            />
  </Card>
  <Card bordered={true} style={{ ...cardStyle, flex: 0.45 }} >
  <h2>Your Spending</h2>
            <Pie 
            {...spendingConfig}
            onReady= {(chartInstance)=> (pieChart = chartInstance)}
            />
  </Card>
  </Row>
    </>
  )
}

export default ChartComponent;