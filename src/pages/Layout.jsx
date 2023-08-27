import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = (props) => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const { user } = useSelector((state) => state.users);

  const navigate = useNavigate();

  const sidebarItems = [
    {
      title: "Home",
      icon: <i class="ri-home-2-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },

    {
      title: "Transactions",
      icon: <i class="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    // user.isAdmin && {
    //   title: "Users",
    //   icon: <i class="ri-user-line"></i>,
    //   onClick: () => navigate("/users"),
    //   path: "/users",
    // },
    {
      title: "Requests",
      icon: <i class="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i class="ri-profile-line"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i class="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      // path: "/",
    },
  ];

  // const adminSidebarItems = [
  //   {
  //     title: "Home",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => navigate("/"),
  //     path: "/",
  //   },
  //   {
  //     title: "Transactions",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => navigate("/transactions"),
  //     path: "/transactions",
  //   },
  //   {
  //     title: "Users",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => navigate("/users"),
  //     path: "/users",
  //   },
  //   {
  //     title: "Requests",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => navigate("/requests"),
  //     path: "/requests",
  //   },
  //   {
  //     title: "Profile",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => navigate("/profile"),
  //     path: "/profile",
  //   },
  //   {
  //     title: "Logout",
  //     icon: <i class="ri-home-2-line"></i>,
  //     onClick: () => {
  //       localStorage.removeItem("token");
  //       navigate("/");
  //     },
  //     path: "/",
  //   },
  // ];

  return (
    <div className="layout">
      <div className="side-bar">
        {!toggleSideBar &&
          sidebarItems.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!toggleSideBar && <p>{item.title}</p>}
              </div>
            );
          })}
      </div>
      <div className="body">
        <div className="header">
          <div className="icon-menu">
            {toggleSideBar && (
              <i
                class="ri-close-line"
                onClick={() => setToggleSideBar(!toggleSideBar)}
              ></i>
            )}
            {!toggleSideBar && (
              <i
                class="ri-menu-line"
                onClick={() => setToggleSideBar(!toggleSideBar)}
              ></i>
            )}
          </div>
          <div className="title">PURSE</div>
          <div className="user">{user.firstName + " " + user.lastName}</div>
        </div>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
