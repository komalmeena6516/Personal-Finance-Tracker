import React from 'react'
import {Button, Modal, Form, DatePicker, Select, Input} from "antd";

const AddExpenseModal = ({isExpenseModalVisible, handleExpenseCancel, onFinish}) => {

    const [form] = Form.useForm();
  return (
    <Modal
    style={{fonrWeight: 600, top: '5%'}}
    title="Add Expense"
    visible={isExpenseModalVisible}
    onCancel={handleExpenseCancel}
    footer={null}
    >
<Form form={form}
layout='vertical'
onFinish={(values)=>{
    onFinish(values, "expenses");
    form.resetFields();
}}
>

<Form.Item 
style={{fontWeight: 600}}
label="Name"
name="name"
rules={[
    {required: true,
     message:"Please Input the name of transaction "
    }
]}
>
    <Input  type="text" className='custom-input'/>
</Form.Item>

<Form.Item 
style={{fontWeight: 600}}
label="Amount"
name="amount"
rules={[
    {required: true,
     message:"Please Input the expense amount "
    }
]}
>
    <Input  type="number" className='custom-input'/>
</Form.Item>

{/* date */}
<Form.Item 
style={{fontWeight: 600}}
label="Date"
name="date"
rules={[
    {required: true,
     message:"Please Select the Expense Date"
    }
]}
>
    <DatePicker  format="YYYY-MM-DD" className='custom-input'/>
</Form.Item>

{/* type of exenses */}
<Form.Item 
style={{fontWeight: 600}}
label="Tag"
name="tag"
rules={[
    {required: true,
     message:"Please select a tag!"
    }
]}
>
    <Select className='select-input-2'>
<Select.Option value="Food">Food</Select.Option>
<Select.Option value="Education">Eduaction</Select.Option>
<Select.Option value="Vacations">Vacations</Select.Option>
<Select.Option value="Party">Party</Select.Option>
    </Select>

</Form.Item>


<Form.Item>
    <Button className='btn btn-blue' type='primary' htmlType='submit'>
        Add Expense
    </Button>
</Form.Item>
</Form>

    </Modal>
  )
}

export default AddExpenseModal