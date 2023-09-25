import { useRef, useState, useEffect } from 'react';
import styles from "./styles.module.scss";

interface Suggestion {
  text: string;
  placeId: string;
}

type Props = {
  callback: (value: string) => void;
  callbackClick: (value: string) => void;
  suggestions: Suggestion[];
}

const SearchInput = (props: Props) => {
  const { callback, callbackClick, suggestions } = props;
  const suggestionBoxRef = useRef<HTMLDivElement | null>(null);
  const [isSuggestionOpen, setSuggestionOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestionsList, setSuggestionsList] = useState<Suggestion[]>(suggestions);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionBoxRef.current && !suggestionBoxRef.current.contains(event.target as Node)) {
        setSuggestionOpen(false);
      }
    }

    if (isSuggestionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSuggestionOpen]);

  useEffect(() => {
    if(suggestions?.length > 0) {
      setSuggestionsList(suggestions);
    }
  }, [suggestions]);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.input} ${suggestionsList?.length > 0 ? styles.withSuggestions : ""}`}
        type="text"
        value={searchTerm}
        onChange={(e) => {
          callback(e.target.value);
          setSearchTerm(e.target.value);
          setSuggestionOpen(true);
        }}
      />

      <div className={styles.suggestionWrapper}>
        {searchTerm && (
          <div className={styles.suggestionContainer}>
            {suggestionsList?.length > 0 && (
              <div
                ref={suggestionBoxRef}
                className={`${styles.suggestionBox} ${
                  isSuggestionOpen ? styles.open : ""
                }`}
              >
                {suggestionsList?.map((suggestion) => (
                  <div
                    className={styles.suggestionItem}
                    key={suggestion?.placeId}
                    onClick={() => {callbackClick(suggestion?.text || ""); setSuggestionsList([]); setSearchTerm(''); setSuggestionOpen(false);}}
                  >
                    <p>{suggestion?.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchInput;
