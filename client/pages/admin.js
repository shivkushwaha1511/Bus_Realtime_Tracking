import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import BusList from "../components/lists/BusList";
import { UserContext } from "../context";
import { toast } from "react-toastify";
import AdminRoute from "../components/routes/AdminRoute";

const admin = () => {
  const [state] = useContext(UserContext);
  const [buses, setBuses] = useState([]);

  // Fetching all bus
  useEffect(() => {
    if (state && state.token) getBus();
  }, [state && state.token]);

  const getBus = async () => {
    try {
      const { data } = await axios.get("/get-bus");
      setBuses(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Deleting bus
  const handleDelete = async (_id) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;

      const { data } = await axios.delete(`/delete-bus/${_id}`);

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.error(data.error);
        getBus();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container px-3">
        <div className="row">
          <div className="col d-flex justify-content-end pt-3">
            <Link href="/bus/add">
              <a className="btn btn-danger fs-5 fw-bold">Add bus</a>
            </Link>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-6 offset-md-3">
            {buses &&
              buses.map((bus) => (
                <div key={bus._id} className="mb-3">
                  <BusList bus={bus} handleDelete={handleDelete} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default admin;
