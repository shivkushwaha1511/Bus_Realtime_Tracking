import Head from "next/head";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "antd";
import Link from "next/link";
import ForgotPasswordForm from "../components/form/ForgotPasswordForm";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);
  const router = useRouter();

  //Redirect if already logged in
  if (state && state.token) router.push("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/forgot-password", {
        email,
        newPassword,
        secret,
      });

      if (data.error) {
        setLoading(false);
        toast.error(data.error);
      }

      if (data.success) {
        setOk(true);
        setEmail("");
        setNewPassword("");
        setSecret("");
        setLoading(false);
      }
    } catch (err) {
      // toast.error(err.response.data);
      console.log(err);
      setLoading(false);
    }
  };

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Forgot Password</title>
      <meta name="description" content="Track your bus location in realtime" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="realtime-bus-tracking" />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_CLIENT} />
      <meta
        property="og:description"
        content="Track your bus location in realtime"
      />
      <meta
        property="og:image:secure_url"
        content={`${process.env.NEXT_PUBLIC_CLIENT}/images/school_bus.jpg`}
      />
    </Head>
  );

  return (
    <>
      {head()}
      <div className="container-fluid form_bg">
        <div className="row py-4 px-3">
          <div
            className="col-md-4 my-4 offset-md-4 bg-white shadow-lg"
            style={{ padding: "0", borderRadius: "10px 10px 10px 10px" }}
          >
            <div
              className="bg-danger form_top"
              style={{ borderRadius: "10px 10px 0 0" }}
            ></div>
            <div className="text-center display-5 fw-bold pt-1">
              Reset Password
            </div>
            <ForgotPasswordForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
            />
          </div>
        </div>

        <Modal
          title="Congragulations!"
          visible={ok}
          onCancel={() => setOk(false)}
          footer={null}
        >
          <p className="fs-5">
            Success! Now you can sigin with your new password
          </p>
          <Link href="/signin">
            <a className="btn btn-danger text-white fw-bold fs-5">Signin</a>
          </Link>
        </Modal>
      </div>
      <style jsx global>{`
        body {
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.8) 100%
            ),
            url("/images/school_bus.jpg");
          background-position: center center;
          background-size: cover;
          background-repeat: no-repeat;
        }
      `}</style>
    </>
  );
};

export default ForgotPassword;
