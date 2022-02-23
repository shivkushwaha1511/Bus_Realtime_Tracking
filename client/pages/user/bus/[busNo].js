import axios from "axios";
import { useRouter } from "next/router";
import GoogleMaps from "../../../components/map/Map";
import { RollbackOutlined } from "@ant-design/icons";
import io from "socket.io-client";

const bus = (data) => {
  const router = useRouter();
  const socket = io("http://localhost:8000", { reconnection: true });
  socket.emit("join", { busNo: data.busNo });

  return (
    <>
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
    </>
  );
};

export async function getServerSideProps(context) {
  const { data } = await axios.get(`/bus-by-busNo/${context.params.busNo}`);

  return { props: data };
}

export default bus;
