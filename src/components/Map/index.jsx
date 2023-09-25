import { useRef, useEffect } from "react";
import { MapView } from "@aws-amplify/ui-react-geo";
import "@aws-amplify/ui-react-geo/styles.css";
import styles from "./styles.module.scss";
import { MarkerWithPopup } from "@components";

export default function Home({ locationInfo }) {
  const mapRef = useRef();
  const flyToMordor = (value) => {
    mapRef.current.flyTo(value);
  };

  useEffect(() => {
    if (locationInfo?.location?.latitude && locationInfo?.location?.longitude) {
      flyToMordor({
        center: [
          locationInfo?.location?.longitude,
          locationInfo?.location?.latitude,
        ],
        zoom: 9,
      });
    }
  }, [locationInfo]);

  return (
    <div className={styles.mapWrapper}>
      <MapView
        initialViewState={{
          latitude: -33.783721627567,
          longitude: 151.067490703923,
          zoom: 9,
        }}
        ref={mapRef}
      >
        {locationInfo?.location?.latitude &&
          locationInfo?.location?.longitude && (
            <MarkerWithPopup
              latitude={locationInfo?.location?.latitude}
              longitude={locationInfo?.location?.longitude}
              markerInfo={locationInfo}
            />
          )}
      </MapView>
    </div>
  );
}