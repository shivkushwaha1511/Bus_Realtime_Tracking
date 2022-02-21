import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

const BusList = ({ bus, handleDelete }) => {
  const router = useRouter();
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{bus.busNo}</h5>
        <p className="card-text">
          <span className="fw-bold me-2">Driver Name :</span>
          <span>{bus.name}</span>
        </p>
        <div className="card-text">
          <span className="fw-bold me-2">Contact no. :</span>
          <span>{bus.contact}</span>
          <div className="d-flex justify-content-end fs-5">
            <span className="me-3">
              <EditFilled onClick={() => router.push(`/bus/${bus.busNo}`)} />
            </span>
            <span>
              <DeleteFilled
                className="text-danger"
                onClick={() => handleDelete(bus._id)}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusList;
