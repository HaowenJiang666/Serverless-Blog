import React from "react";
import { AuthingGuard } from "@authing/react-ui-components";
import "@authing/react-ui-components/lib/index.min.css";

const Login = () => {
  const appId = "6266e3fe26406ac5b2fd948a";
  const onLogin = userInfo => {
    window.localStorage.token = userInfo.token;
    window.localStorage.tokenExpiredAt = userInfo.tokenExpiredAt;
    window.location.reload();
  };
  return <AuthingGuard appId={appId} onLogin={onLogin} />;
};

export default Login;