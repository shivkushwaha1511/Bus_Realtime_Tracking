import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthForm from "../components/form/AuthForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import Head from "next/head";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);

  const router = useRouter();

  if (state && state.user) {
    router.push("/user/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    setLoading(true);
    try {
      const { data } = await axios.post("/signin", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setLoading(false);
        setState(data);
        localStorage.setItem("auth", JSON.stringify(data));
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Signin</title>
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
      <div className="container-fluid">
        <div className="row py-4 px-4">
          <div
            className="col-md-4 my-4 offset-md-4 bg-white shadow-lg"
            style={{ padding: "0", borderRadius: "10px 10px 10px 10px" }}
          >
            <div
              className="bg-danger form_top"
              style={{ borderRadius: "10px 10px 0 0" }}
            ></div>
            <div className="text-center display-4 fw-bold pt-1">Sign In</div>
            <AuthForm
              handleSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              loading={loading}
              page={"signin"}
            />

            <div className="row">
              <div className="col">
                <p className="text-center">
                  Not yet registered?
                  <Link href="/signup">
                    <a className="text-danger fw-bold">SignUp</a>
                  </Link>
                </p>
                <p className="text-center">
                  <Link href="/forgot-password">
                    <a className="text-danger fw-bold">Forgot password?</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
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
      </div>
    </>
  );
};

export default SignIn;
