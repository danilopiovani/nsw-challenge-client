import "../styles/globals.css";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Amplify.configure(awsconfig);

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        draggable={true}
        hideProgressBar
      />
    </>
  );
}
