import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { UserContext } from "../../context";
import { SyncOutlined } from "@ant-design/icons";

const AdminRoute = ({ children }) => {
  const [state] = useContext(UserContext);
  const [ok, setOk] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      getCurrentUser();
    }
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      const { data } = await axios.get("/current-admin");

      if (data.ok) setOk(true);
    } catch (err) {
      router.push("/");
    }
  };

  process.browser &&
    state === null &&
    setTimeout(() => {
      router.push("/");
    }, 1000);

  return !ok ? (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 mt-5"
    />
  ) : (
    <>{children}</>
  );
};

export default AdminRoute;
