import axios from "axios";
import React, { useState, useEffect } from "react";

const Tabs = () => {
  const [toggleState, setToggleState] = useState(1);
  const [tabContent, setTabContent] = useState({});

  const toggleTab = (index) => {
    setToggleState(index);
    fetchTabContent(index);
  };

  const fetchTabContent = async (index) => {
    if (tabContent[index]) return; // Use cached data if available

    try {
      const lengths = ["short", "medium", "long", "verylong"];
      const response = await axios.get(
        `/api/1/${lengths[index - 1]}/plaintext`
      );

      const content = await response.text();

      setTabContent((prevContent) => ({
        ...prevContent,
        [index]: content,
      }));
    } catch (error) {
      console.error("Failed to fetch tab content:", error);
    }
  };

  useEffect(() => {
    fetchTabContent(toggleState);
  }, [toggleState]);

  return (
    <div className="container">
      <div className="bloc-tabs">
        {[1, 2, 3, 4].map((i) => (
          <button
            key={i}
            className={toggleState === i ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(i)}
          >
            Tab {i}
          </button>
        ))}
      </div>

      <div className="content-tabs">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={toggleState === i ? "content active-content" : "content"}
          >
            <h2>Title {i}</h2>
            <p>{tabContent[i] || "Loading content..."}</p>

            {tabContent && <p>{tabContent[i] || "Loading content..."}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
