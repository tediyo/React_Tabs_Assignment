import axios from "axios";
import React, { useState, useEffect } from "react";

// UpperTab component that manages tabbed content
const topTab = () => {
  // State to manage the active tab and cached content
  const [toggleState, setToggleState] = useState(1);
  const [tabContent, setTabContent] = useState({});

  // Function to toggle tabs and fetch content for the selected tab
  const toggleTab = (index) => {
    setToggleState(index); // Set the active tab state
    fetchTabContent(index); // Fetch content for the selected tab
  };

  // Fetch tab content based on the selected index
  const fetchTabContent = async (index) => {
    // Return early if content for the tab is already cached
    if (tabContent[index]) return;

    try {
      // Define length options corresponding to the API endpoints
      const lengths = ["short", "medium", "long", "verylong"];
      const response = await axios.get(`/api/1/${lengths[index - 1]}/plaintext`);

      // Parse the response data
      const content = await response.data; // Use response.data for JSON data

      // Cache the fetched content
      setTabContent((prevContent) => ({
        ...prevContent,
        [index]: content,
      }));
    } catch (error) {
      console.error("Failed to fetch tab content:", error);
    }
  };

  // Effect to fetch content when the active tab changes
  useEffect(() => {
    fetchTabContent(toggleState);
  }, [toggleState]);

  return (
    <div className="container">
      {/* Tab navigation buttons */}
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

      {/* Tab content display */}
      <div className="content-tabs">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={toggleState === i ? "content active-content" : "content"}
          >
            <h2>Title {i}</h2>
            <p>{tabContent[i] || "Loading content..."}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default topTab;
