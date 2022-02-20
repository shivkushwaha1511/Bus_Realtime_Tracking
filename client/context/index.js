import { createContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [state, setState] = useState(null);

  // Updating context if data present in local storage
  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("auth")));
  }, []);

  // axios config
  const token = state && state.token ? state.token : "";
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // If token expired
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const res = error.response;
      if (res.status === 401 && res.config && !res.__isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/signin");
      }
    }
  );

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
