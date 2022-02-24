import axios from "axios";
import { useState } from "react";
import BusForm from "../../components/form/BusForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { RollbackOutlined } from "@ant-design/icons";
import AdminRoute from "../../components/routes/AdminRoute";
import Head from "next/head";

const add = () => {
  const [busNo, setBusNo] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/add-bus", {
        busNo,
        name,
        contact,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Bus added");
        router.push("/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Add Bus</title>
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
    <AdminRoute>
      {head()}
      <div className="container">
        <div className="row">
          <div className="col py-4 text-center">
            <p className="fs-1" style={{ margin: "0px" }}>
              <u>Add bus details</u>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <BusForm
              handleSubmit={handleSubmit}
              busNo={busNo}
              setBusNo={setBusNo}
              name={name}
              setName={setName}
              contact={contact}
              setContact={setContact}
            />
            <div className="text-center mt-2 fs-3">
              <RollbackOutlined onClick={() => router.push("/admin")} />
            </div>
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default add;
