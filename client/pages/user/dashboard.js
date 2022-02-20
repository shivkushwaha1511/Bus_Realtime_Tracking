import { useState } from "react";
import UserRoute from "../../components/routes/UserRoute";
import { useRouter } from "next/router";

const dashboard = () => {
  const [bus, setBus] = useState("MP-20 1234");

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
                <option>MP-20 1234</option>
                <option>MP-20 5678</option>
                <option>MP-20 0910</option>
              </select>
              <div className="text-center mt-4">
                <button className="btn btn-danger" onClick={handleSubmit}>
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

export default dashboard;
