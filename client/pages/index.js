import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <div className="container-fluid home_bg">
      <div className="row">
        <div className="col-md-8 offset-md-2" style={{ paddingTop: "150px" }}>
          <h1
            className="display-1 fw-bold text-white ps-4"
            style={{ borderLeft: "10px solid white" }}
          >
            Realtime Bus Tracking
          </h1>
          <div className="text-center">
            <button
              className="btn btn-danger fs-4 fw-bold"
              onClick={() => router.push("/signin")}
            >
              Track Bus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
