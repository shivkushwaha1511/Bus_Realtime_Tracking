import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/Nav";
import "antd/dist/antd.css";
import { UserProvider } from "../context";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        {/* <Nav /> */}
        <NavBar />
        <Component {...pageProps} />
        <ToastContainer newestOnTop draggable />
      </UserProvider>
    </>
  );
}

export default MyApp;
