import axios from "axios";
import { useRouter } from "next/router";
import GoogleMaps from "../../../components/map/Map";
import { RollbackOutlined } from "@ant-design/icons";
import io from "socket.io-client";
import Head from "next/head";
import UserRoute from "../../../components/routes/UserRoute";

const bus = (data) => {
  const router = useRouter();
  const socket = io(
    process.env.NEXT_PUBLIC_SOCKETIO,
    { path: "/socket.io" },
    { reconnection: true }
  );
  socket.emit("join", { busNo: data.busNo });

  const head = () => (
    <Head>
      <title>Realtime Bus Tracking-Track Bus</title>
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
    <UserRoute>
      {head()}
      <div className="container">
        <div className="row">
          <div className="col pt-4">
            <h2>Current location</h2>
            {GoogleMaps(data, socket)}
            <div className="text-center my-3">
              <RollbackOutlined
                className="fs-4"
                onClick={() => {
                  router.push("/user/dashboard"), socket.disconnect();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get(`/bus-by-busNo/${context.params.busNo}`);

  return { props: data };
}

export default bus;
