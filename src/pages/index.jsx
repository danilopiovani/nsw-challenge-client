// import { Geo } from "aws-amplify";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Header, Footer, Address, Map } from "../components";

export default function Home() {
  const [locationInfo, setLocationInfo] = useState({});
  return (
    <div className={styles.componentWrapper}>
      <Header />
      <Address handleCallback={setLocationInfo} />
      <Map locationInfo={locationInfo} />
      <Footer />
    </div>
  );
}