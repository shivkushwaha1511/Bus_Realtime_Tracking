import { useState } from "react";
import UserRoute from "../../components/routes/UserRoute";
import { useRouter } from "next/router";
import axios from "axios";

const dashboard = ({ data }) => {
  const [bus, setBus] = useState(data[0].busNo);

  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/user/bus/${bus}`);
  };

  return (
    <>
      <UserRoute>
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
