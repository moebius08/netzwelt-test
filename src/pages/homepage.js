import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/HomePage.css';

const Homepage = () => {
  const [territories, setTerritories] = useState([]);
  const [activeTerritory, setActiveTerritory] = useState([]);

  const getTerritoriesData = async () => {

    const rootUrl = process.env.NODE_ENV === 'production' ? 
    '' : ''

    try {
      const res = await axios.get(`${rootUrl}/Territories/All`,{
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        mode: "cors",});
      if (res.data) {
        setTerritories(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTerritoriesData();
  }, []);

  const handleCaretClick = (event, territoryId) => {
    setActiveTerritory((prevActiveTerritories) => {
      if (prevActiveTerritories.includes(territoryId)) {
        return prevActiveTerritories.filter((id) => id !== territoryId);
      } else {
        return [...prevActiveTerritories, territoryId];
      }
    });
  };
    
  const renderTerritory = (territory, level) => {
    const children = territories.filter(t => t.parent === territory.id);
    return (
      <li key={territory.id}>
        {children.length > 0 ? (
          <span
            id={territory.id}
            className={`caret ${activeTerritory.includes(territory.id) ? "caret-down" : ""}`}
            onClick={(event) => handleCaretClick(event, territory.id)}
          >
            {territory.name}
          </span>
        ) : (
          territory.name
        )}
        {children.length > 0 && (
          <ul className={`nested ${activeTerritory.includes(territory.id) ? "active" : ""}`}>
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
