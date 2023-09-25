import "../styles/globals.css";
import { Amplify } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const awsConfig = {
  aws_project_region: "ap-southeast-2",
  aws_cognito_identity_pool_id:
    "ap-southeast-2:c9b74469-bd58-4992-8aee-06587c739299",
  aws_cognito_region: "ap-southeast-2",
  aws_user_pools_id: "ap-southeast-2_jpKGYQbUB",
  aws_user_pools_web_client_id: "3567natipqus05mbevu2rhrtha",
  geo: {
    amazon_location_service: {
      region: "ap-southeast-2",
      search_indices: {
        items: ["placeindexc4d79e9d-dev"],
        default: "placeindexc4d79e9d-dev",
      },
      maps: {
        items: {
          "map75960df2-dev": {
            style: "VectorEsriStreets",
          },
        },
        default: "map75960df2-dev",
      },
    },
  },
};

Amplify.configure(awsConfig);

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
