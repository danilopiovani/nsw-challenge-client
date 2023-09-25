import Head from "next/head";
import { Amplify } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

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
      <Head>
        <title>NSW - Address Lookup</title>
        <meta property="og:title" content={"NSW - Address Lookup"} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              !function(a,b){var c=window;c.SessionStackKey=a,c[a]=c[a]||{t:b,
                q:[]};for(var d=["start","stop","identify","getSessionId","log","setOnDataCallback","trackEvent"],e=0;e<d.length;e++)!function(b){
                c[a][b]=c[a][b]||function(){c[a].q.push([b].concat([].slice.call(arguments,0)));
                }}(d[e]);var f=document.createElement("script");f.async=1,f.crossOrigin="anonymous",
                f.src="https://cdn.sessionstack.com/sessionstack.js";var g=document.getElementsByTagName("script")[0];
                g.parentNode.insertBefore(f,g)}("SessionStack","fca8979d28a74aa58881dff9e9342ca2");
              `,
          }}
        />
      </Head>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        draggable={true}
        hideProgressBar
      />
    </>
  );
}
