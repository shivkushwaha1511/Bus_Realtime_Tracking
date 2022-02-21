import { useState } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";

const defaultCenter = { lat: 23.20104034367859, lng: 79.88102018465851 };

const RegularMap = withScriptjs(
  withGoogleMap((props) => {
    const [dir, setDir] = useState({});
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: defaultCenter,
        destination: new google.maps.LatLng(props.data.lat, props.data.lng),
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDir({ directions: result });
        } else {
          console.error(`error fetching directions ${result}`);
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
        <Marker defaultIcon="/images/bus.png" position={props.data} />
        <Marker defaultIcon="/images/college.png" position={defaultCenter} />
      </GoogleMap>
    );
  })
);

const loadingElementStyle = { height: "100%" };
const containerElementStyle = { height: "420px" };
const mapElementStyle = { height: "100%" };

export default function GoogleMaps(data) {
  return (
    <RegularMap
      data={data}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_MAP_API}`}
      loadingElement={<div style={loadingElementStyle} />}
      containerElement={<div style={containerElementStyle} />}
      mapElement={<div style={mapElementStyle} />}
    />
  );
}
