import { useEffect, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import styles from "./styles.module.scss";
import "@aws-amplify/ui-react-geo/styles.css";

export default function MarkerWithPopup({ latitude, longitude, markerInfo }) {
  const [showPopup, setShowPopup] = useState(false);

  // update info when receive a new info
  useEffect(() => {
    setShowPopup(true);
  }, [markerInfo]);

  // toggle popup
  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        onClick={handleMarkerClick}
      />
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          offset={{ bottom: [0, -40] }}
          onClose={() => setShowPopup(false)}
          className={styles?.mapPopUp}
        >
          <div className={styles.title}>Location Info</div>
          <div className={styles.addressInfo}>
            <p>
              <span>Address</span>
            </p>
            <p>{markerInfo?.label}</p>
          </div>
          <p>
            <span>Latitude:</span> {markerInfo?.location?.latitude}
          </p>
          <p>
            <span>Longitude:</span> {markerInfo?.location?.longitude}
          </p>
          <p>
            <span>Suburb:</span> {markerInfo?.suburbName}
          </p>
          <p>
            <span>Electoral District Name:</span>{" "}
            {markerInfo?.stateElectoralDistrictName}
          </p>
        </Popup>
      )}
    </>
  );
}
