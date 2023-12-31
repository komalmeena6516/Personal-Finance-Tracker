import React from 'react';
import {Button, Modal, Form, DatePicker, Select, Input} from "antd";

const AddIncomeModal = ({
    isIncomeModalVisible, handleIncomeCancel, onFinish
}) => {

    const [form] = Form.useForm();

  return (
  
    <Modal
    style={{fonrWeight: 600, top: '5%'}}
    title="Add Income"
    visible={isIncomeModalVisible}
    onCancel={handleIncomeCancel}
    footer={null}
    >
<Form form={form}
layout='vertical'
onFinish={(values)=>{
    onFinish(values, "Incomes");
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
     message:"Please Input the income amount "
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
     message:"Please Select the Income Date"
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
<Select.Option value="Salary">Salary</Select.Option>
<Select.Option value="Freelance">Freelance</Select.Option>
<Select.Option value="Investment">Investment</Select.Option>

    </Select>

</Form.Item>


<Form.Item>
    <Button className='btn btn-blue' type='primary' htmlType='submit'>
        Add Income
    </Button>
</Form.Item>
</Form>

    </Modal>

  )
}

export default AddIncomeModal