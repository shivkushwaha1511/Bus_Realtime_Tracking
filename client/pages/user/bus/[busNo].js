import axios from "axios";
import { useRouter } from "next/router";
import GoogleMaps from "../../../components/map/Map";
import { RollbackOutlined } from "@ant-design/icons";

const bus = (data) => {
  const router = useRouter();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col pt-4">
            <h2>Current location</h2>
            {GoogleMaps({ lat: data.latitude, lng: data.longitude })}
            <div className="text-center my-3">
              <RollbackOutlined
                className="fs-4"
                onClick={() => router.push("/user/dashboard")}
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
