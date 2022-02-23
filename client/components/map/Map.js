import { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "react-google-maps";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";

const defaultCenter = { lat: 23.20104034367859, lng: 79.88102018465851 };

const RegularMap = withScriptjs(
  withGoogleMap((props) => {
    const [dir, setDir] = useState({});
    const DirectionsService = new google.maps.DirectionsService();
    const [open, setOpen] = useState(false);

    const cord = {};
    cord.lat = props.data.latitude;
    cord.lng = props.data.longitude;

    const [coord, setCoord] = useState(cord);
    props.socket.on("new_coordinates", (response) => {
      setCoord(response);
    });

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(coord.lat, coord.lng),
        destination: defaultCenter,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDir({ directions: result });
        }
      }
    );

    return (
      <GoogleMap defaultZoom={12} defaultCenter={defaultCenter}>
        {dir.directions && (
          <DirectionsRenderer
            directions={dir.directions}
            options={{ suppressMarkers: true }}
          />
        )}
        {open && (
          <InfoWindow
            onCloseClick={() => setOpen(false)}
            position={new google.maps.LatLng(coord.lat, coord.lng)}
          >
            <>
              <div className="fw-bold fs-5 mb-1">{props.data.busNo}</div>
              <div className="fw-bold mb-1">
                <UserOutlined className="fs-5 me-2" />
                {props.data.name}
              </div>
              <div className="fw-bold">
                <PhoneOutlined className="fs-5 me-2" />
                {props.data.contact}
              </div>
            </>
          </InfoWindow>
        )}
        <Marker
          defaultIcon="/images/bus.png"
          position={new google.maps.LatLng(coord.lat, coord.lng)}
          onClick={() => {
            setOpen(true);
          }}
        />
        <Marker defaultIcon="/images/college.png" position={defaultCenter} />
      </GoogleMap>
    );
  })
);

const loadingElementStyle = { height: "100%" };
const containerElementStyle = { height: "420px" };
const mapElementStyle = { height: "100%" };

export default function GoogleMaps(data, socket) {
  return (
    <RegularMap
      socket={socket}
      data={data}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API}`}
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
