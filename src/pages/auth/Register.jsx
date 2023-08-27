import React from "react";
import { Col, Form, Row, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../api/auth";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
        dispatch(HideLoading());
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="m-3">
      <div className="flex items-center justify-between">
        <h1 className="text2xl">Purse - REGISTER</h1>
        <h3 className="text-sm underline" onClick={() => navigate("/login")}>
          Already have an account? Login
        </h3>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item label={"First Name"} name={"firstName"}>
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={"Last Name"} name={"lastName"}>
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={"Email"} name={"email"}>
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={"Mobile Number"} name={"phoneNumber"}>
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label={"Identification Type"}
              name={"identificationType"}
            >
              <select>
                <option value="NATIONAL ID">National ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVER'S LICENSE">Driver's License</option>
                <option value="NATIONAL IDENTITY NUMBER">
                  National Identity Number
                </option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label={"Identification Number"}
              name={"identificationNumber"}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label={"Address"} name={"address"}>
              <textarea name="" id="" cols="30" rows="8"></textarea>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label={"Password"} name={"password"}>
              <input type="password" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={"Confirm Password"} name={"confirmPassword"}>
              <input type="password" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button className="primary-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
