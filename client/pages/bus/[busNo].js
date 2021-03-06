import axios from "axios";
import { useEffect, useState } from "react";
import BusForm from "../../components/form/BusForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { RollbackOutlined } from "@ant-design/icons";
import AdminRoute from "../../components/routes/AdminRoute";
import Head from "next/head";

const update = (data) => {
  const [busNo, setBusNo] = useState(data.busNo);
  const [name, setName] = useState(data.name);
  const [contact, setContact] = useState(data.contact);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/update-bus/${data._id}`, {
        busNo,
        name,
        contact,
      });

      if (res.data.ok) {
        toast.success("Bus details updated");
        router.push("/admin");
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Edit Bus</title>
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
              <u>Update bus details</u>
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

export async function getServerSideProps(context) {
  const { data } = await axios.get(`/bus-by-busNo/${context.params.busNo}`);

  return { props: data };
}

export default update;
