import Link from "next/link";

const admin = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-end pt-3">
          <Link href="/bus/add">
            <a className="btn btn-danger fs-5 fw-bold">Add bus</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default admin;
