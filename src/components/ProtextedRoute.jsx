import React from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthContext";

const ProtextedRoute = () => {
  const { user } = userAuth;
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default ProtextedRoute;
