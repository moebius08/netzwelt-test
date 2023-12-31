import React from 'react'
import { Form, Input, message } from 'antd';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import '../styles/RegisterStyles.css';


const Login = () => {
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {

    try {
      const res = await axios.post(`/Account/SignIn`, values, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (res.data) {
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
        message.success('Login Successfully');
        navigate('/');
      } else {
        message.error('Unexpected response from the server');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.error('Invalid Username or Password');
      } else {
        console.log(error);
        message.error('Something went wrong');
      }
    }
  };

    return (
    <>
    <div className="container">
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Login Form</h3>
        <div className='txt_field'>
        <Form.Item label="Username" name="username">
            <Input type="username" required></Input>
        </Form.Item>
        </div>
        <div className="txt_field">
        <Form.Item label="Password" name="password">
            <Input type="password" required></Input>
        </Form.Item>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </Form>
    </div>
    </>
  )
}

export default Login