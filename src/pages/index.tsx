import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Header, Footer, Address, Map } from "../components";

interface Header extends React.FC {
  (): JSX.Element;
}

interface Footer extends React.FC {
  (): JSX.Element;
}

interface Address extends React.FC {
  (props: { handleCallback: Function }): JSX.Element;
}

interface Map extends React.FC {
  (props: { locationInfo: LocationInfo }): JSX.Element;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Point {
  point: [number];
}

interface LocationInfo {
  location: Location;
  suburbName?: string;
  stateElectoralDistrictName?: string;
  addressNumber?: string;
  country?: string;
  geometry?: Point;
  interpolated?: boolean;
  label?: string;
  municipality?: string;
  neighborhood?: string;
  postalCode?: string;
  region?: string;
  street?: string;
}
export default function Home() {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | {}>({});

  return (
    <div className={styles.componentWrapper}>
      <Header />
      <Address handleCallback={setLocationInfo} />
      <Map locationInfo={locationInfo} />
      <Footer />
    </div>
  );
}
