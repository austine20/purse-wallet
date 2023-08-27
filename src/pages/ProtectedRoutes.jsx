import React, { useEffect } from "react";
import { message } from "antd";
import { GetUserInfo } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/userSlice";
import Layout from "./Layout";

const ProtectedRoutes = (props) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
        // setUserData(response.data);
      } else {
        message.error(response.message);
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      getUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div>
        {/* {user.email} */}
        <Layout>{props.children}</Layout>
      </div>
    )
  );
};

export default ProtectedRoutes;
