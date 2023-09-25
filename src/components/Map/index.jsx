import { useRef, useEffect } from "react";
import { MapView } from "@aws-amplify/ui-react-geo";
import { MarkerWithPopup } from "@components";
import "@aws-amplify/ui-react-geo/styles.css";
import styles from "./styles.module.scss";

export default function Home({ locationInfo }) {
  const mapRef = useRef();
  const flyToMordor = (value) => {
    mapRef.current.flyTo(value);
  };

  // move to the location point
  useEffect(() => {
    if (locationInfo?.location?.latitude && locationInfo?.location?.longitude) {
      flyToMordor({
        center: [
          locationInfo?.location?.longitude,
          locationInfo?.location?.latitude,
        ],
        zoom: 12,
      });
    }
  }, [locationInfo]);

  return (
    <div className={styles.mapWrapper}>
      <MapView
        initialViewState={{
          latitude: -33.8559799094,
          longitude: 151.20666584,
          zoom: 12,
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
