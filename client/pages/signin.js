import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import AuthForm from "../components/form/AuthForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email, password);

    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:8000/api/signin", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        console.log(data);
        // router.push("/")
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid form_bg" style={{ height: "561px" }}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;