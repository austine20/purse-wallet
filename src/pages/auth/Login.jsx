import React, { useState } from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
        // navigate("/");
      } else {
        message.error(response.message);
        dispatch(HideLoading());
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="w-25 card">
        <div className="flex items-center justify-between">
          <h1 className="text2xl">Purse - LOGIN</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish} className="mt-2">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label={"Email"} name={"email"}>
                <input type="text" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label={"Password"}
                name={"password"}
                className="relative"
              >
                <input type={"password"} />
              </Form.Item>
            </Col>
          </Row>

          <button className="primary-btn w-100" type="submit">
            Login
          </button>

          <h3
            className="text-sm underline mt-2"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Click here to Register
          </h3>
        </Form>
      </div>
    </div>
  );
};

export default Login;
