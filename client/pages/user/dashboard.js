import { useState } from "react";
import UserRoute from "../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";

const dashboard = ({ data }) => {
  const [bus, setBus] = useState(data[0].busNo);

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/user/bus/${bus}`);
  };

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Dashboard</title>
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
      <UserRoute>
        {head()}
        <div className="container-fluid">
          <div className="row" style={{ paddingTop: "150px" }}>
            <div className="col-md-6 offset-md-3 px-5">
              <div className="fs-4 ps-2">Select your bus number</div>
              <select
                className="form-select"
                value={bus}
                onChange={(e) => setBus(e.target.value)}
              >
                {data &&
                  data.map((bus) => <option key={bus._id}>{bus.busNo}</option>)}
              </select>
              <div className="text-center mt-4">
                <button
                  className="btn btn-danger fs-5 fw-bold"
                  onClick={handleSubmit}
                >
                  Get location
                </button>
              </div>
            </div>
          </div>
        </div>
      </UserRoute>
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

export async function getServerSideProps() {
  const { data } = await axios.get("/get-bus");

  return {
    props: { data },
  };
}

export default dashboard;
