import React, { useState } from "react";

const Homepage = () => {
  const [territories, setTerritories] = useState([
    // Your territories data here
  ]);

  const [activeTerritory, setActiveTerritory] = useState(null);

  const handleCaretClick = (territoryId) => {
    setActiveTerritory(territoryId === activeTerritory ? null : territoryId);
  };

  const renderTerritory = (territory, level) => {
    const children = territories.filter(t => t.parent === territory.id);
    
    return (
      <li key={territory.id}>
        <span
          className={children.length > 0 ? "caret" : ""}
          onClick={() => handleCaretClick(territory.id)}
        >
          {territory.name}
        </span>
        {children.length > 0 && (
          <ul className={`nested ${activeTerritory === territory.id ? "active" : ""}`}>
            {children.map(child => renderTerritory(child, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div>
      <h2>Territories</h2>
      <p>Here are the list of territories:</p>
      <ul id="myUL">
        {territories.filter(t => t.parent === null).map(territory => renderTerritory(territory, 0))}
      </ul>
    </div>
  );
};

export default Homepage;
