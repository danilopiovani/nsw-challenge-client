import { useEffect, useCallback, useState, useRef } from "react";
import { getSuggestions, getPlaceById, getFullAddressType } from "@utils";
import { toast } from "react-toastify";
import { SearchInput } from "@components";
import styles from "./styles.module.scss";

export default function Home({handleCallback}) {
  // ref
  const suggestionBoxRef = useRef(null);

  // local states
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionOpen, setSuggestionOpen] = useState(false);

  // close the suggestions when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionBoxRef.current &&
        !suggestionBoxRef.current.contains(event.target)
      ) {
        setSuggestionOpen(false);
      }
    }

    if (isSuggestionOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSuggestionOpen]);

  // Address Lookup API
  const checkAPI = async (address, fullObject) => {
    const addressToFetch = `https://2akh2cutvnp4ztx3vlvfm6vmcu0sobzg.lambda-url.ap-southeast-2.on.aws/?address=${address}`;
    const data = await fetch(addressToFetch);
    const response = await data.json();

    // error handling
    if (response.error) {
      // friendly error message 
      let errorMessage = response.error;
      if(data?.status === 500){
        errorMessage = 'Server request failed'
      } 
      toast.error(errorMessage?.toUpperCase(), {
        position: "bottom-right",
        theme: "colored",
        hideProgressBar: false,
      });
      handleCallback({});
      return;
    }
    const locationInfo = { ...response, ...fullObject };
    handleCallback(locationInfo);
  };

  const handleGetPlaceById = async (suggestion) => {
    setSuggestionOpen(false);
    await getPlaceById(suggestion).then(async (res) => {
      // TODO: improve this function logic
      const locationInfo = res?.[0];

      // NUMBER+STREET+SUBURB
      // res: addressNumber+street+neighborhood

      // UNIT
      const unitNumber = res?.[0]?.unitNumber;
      // NUMBER
      const locationNumber = locationInfo?.addressNumber;
      // STREET
      let locationStreet = locationInfo?.street?.replaceAll(" ", "+");
      const locationStreetArray = locationStreet?.split("+");
      const locationStreetType = locationStreetArray?.[locationStreetArray?.length - 1];

      // REMOVE THE ABBREVIATION LOCATION TYPE 
      locationStreet = locationStreet?.replace(`+${locationStreetType}`, "");

      // GET THE FULL ADDRESS TYPE
      const locationStreetTypeFull = getFullAddressType(
        locationStreetType?.toLowerCase()
      );
      
      // CREATE THE STREET COMBINED STREET NAME AND STREET TYPE
      const locationStreetTypeCombined = `${locationStreet}+${locationStreetTypeFull}`;
      const locationSuburb = locationInfo?.neighborhood?.replaceAll(" ", "+");
      let addressToFindLocation = `${locationNumber}+${locationStreetTypeCombined}+${locationSuburb}`;
      if (unitNumber) {
        addressToFindLocation = `${unitNumber}%2F${addressToFindLocation}`;
      }

      await checkAPI(addressToFindLocation?.toUpperCase(), locationInfo);
    });
  };

  const handleGetSuggestions = async (value) => {
    await getSuggestions(value).then((res) => {
      setSuggestions(res);
    });
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (value) => {
    try {
      handleGetSuggestions(value);
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  const handleSearch = useCallback(debounce(handleChange), []);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchTitle}>SEARCH ADDRESS: </div>
      <SearchInput
        callback={handleSearch}
        callbackClick={handleGetPlaceById}
        suggestions={suggestions}
      />
    </div>
  );
}
