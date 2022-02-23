import { Modal } from "antd";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import AuthForm from "../../../components/form/AuthForm";
import { toast } from "react-toastify";
import { UserContext } from "../../../context";
import { useRouter } from "next/router";

const update = () => {
  const [state, setState] = useContext(UserContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (state && state.user) {
      setName(state.user.name);
      setEmail(state.user.email);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`/update-profile`, {
        name,
        password,
      });

      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        toast.success("Profile updated");

        // Updating local storage and context
        const auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({ ...state, user: data });

        setLoading(false);
        router.push("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
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
            <div className="text-center display-4 fw-bold pt-1">Profile</div>
            <AuthForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              password={password}
              setPassword={setPassword}
              loading={loading}
              updatePage={true}
            />
          </div>
        </div>
      </div>
      <style jsx global>
        {`
          body {
            height: 100%;
            background-image: linear-gradient(
              to left bottom,
              #ffffff,
              #ffffff,
              #ffffff,
              #ffffff,
              #ffffff,
              #faf7fe,
              #f6eefc,
              #f5e5f9,
              #f7cfeb,
              #fdb9d5,
              #ffa2b5,
              #ff8e8e
            );
          }
        `}
      </style>
    </>
  );
};

export default update;
