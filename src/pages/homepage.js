import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/HomePage.css';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Homepage = () => {
  const [territories, setTerritories] = useState([]);
  const [activeTerritory, setActiveTerritory] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfuly')
    navigate("/Account/Login");
}

  const getTerritoriesData = async () => {
    try {
      const res = await axios.get(`/Territories/All`,{
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
    <>
    <div className="teri-container">
    <button type="button" class="btn btn-danger" onClick={handleLogout}>Danger</button>
      <h2>Territories</h2>
      <p>Here are the list of territories:</p>
      <ul id="myUL">
        {territories.filter(t => t.parent === null).map(territory => renderTerritory(territory, 0))}
      </ul>
    </div>
    </>
  );
};

export default Homepage;
