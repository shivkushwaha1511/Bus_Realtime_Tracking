import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import "antd/dist/antd.css";
import { UserProvider } from "../context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Nav />
        <Component {...pageProps} />
        <ToastContainer newestOnTop draggable />
      </UserProvider>
    </>
  );
}

export default MyApp;
