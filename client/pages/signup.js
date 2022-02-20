import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import AuthForm from "../components/form/AuthForm";
import { toast } from "react-toastify";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);

  const router = useRouter();

  if (state && state.user) {
    router.push("/user/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/signup", {
        name,
        email,
        password,
        secret,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        setOk(true);
        setLoading(false);
        setName("");
        setEmail("");
        setPassword("");
        setSecret("");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid form_bg">
        <div className="row py-4 px-4">
          <div
            className="col-md-4 my-4 offset-md-4 bg-white shadow-lg"
            style={{ padding: "0", borderRadius: "10px 10px 10px 10px" }}
          >
            <div
              className="bg-danger form_top"
              style={{ borderRadius: "10px 10px 0 0" }}
            ></div>
            <div className="text-center display-4 fw-bold pt-1">Sign Up</div>
            <AuthForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              secret={secret}
              setSecret={setSecret}
              loading={loading}
            />

            <div className="row">
              <div className="col">
                <p className="text-center">
                  Already registered?
                  <Link href="/signin">
                    <a className="text-danger fw-bold">SignIn</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          title="Congragulations!"
          visible={ok}
          onCancel={() => setOk(false)}
          footer={null}
        >
          <p className="fs-5">You have successfully registered.</p>
          <Link href="/signin">
            <a className="btn btn-danger text-white fw-bold fs-5">SignIn</a>
          </Link>
        </Modal>
      </div>
    </>
  );
};

export default SignUp;
