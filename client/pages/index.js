import { useRouter } from "next/router";
import Head from "next/head";

const Home = () => {
  const router = useRouter();

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking</title>
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
      {head()}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 offset-md-2" style={{ paddingTop: "150px" }}>
            <h1
              className="display-1 fw-bold text-white ps-4 ms-4"
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
      <style jsx global>{`
        body {
          width: 100%;
          height: 100%;
          background-image: url("/images/home.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
        }
      `}</style>
    </>
  );
};

export default Home;
