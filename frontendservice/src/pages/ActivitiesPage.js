//https://tourism.opendatahub.com/v1/ODHActivityPoi?pagenumber=1&type=1&latitude=46.501313&longitude=11.339781&radius=300&removenullvalues=false
import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
<script type="text/javascript" src="qrcode.js"></script>

function POIList({ pois }) {
  
  const navigate = useNavigate();
  // Define a function to get the style based on the active div
 
  
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div>
    <div className="shops-text2">Activities</div>
    
        <a style={{ textDecoration: 'none', display: 'inlineBlock', paddingTop:'30%', color: 'black'}}href="/charging" class="previous">
        <img   
            style={{width: '70px', height: '70px', padding: '1%'}}
            className="arrow"
            alt="Arrow"
            src="https://c.animaapp.com/77QLtWUe/img/arrow-1.svg"
          />
          </a>
          
      <Box display="flex" flexDirection="column" alignItems="center"> {/* This centers the Card components vertically */}
          {console.log(pois)}
          {pois.Items.map((poi, i) => (
              <Card sx={{ padding: '1%', width: 905, marginTop: '5%', alignItems:'center', justifyContent: 'center', alignContent: 'center',  border:' 3px solid',
              borderColor: '#000000', borderRadius: '50px', boxShadow: '0px 4px 4px #00000040'  }} key={i}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}> {/* This centers the content horizontally and vertically inside Card */}
                      <strong>{poi.Detail.en.Title}</strong>
                      {poi.GpsInfo.map((location, index) => (
                          <QRCode key={index} value={`https://maps.google.com/?q=${location.Latitude},${location.Longitude}`} />
                      ))}
                      {poi.LTSTags.map((tag, tagIndex) => (
                          <div key={tagIndex}> {tag.TagName.en} </div>
                      ))}
                  </Box>
              </Card>
          ))}
      </Box>
      </div>
  );
}
    async function getPlaces() {
        try {
        let response = await fetch(
            'https://tourism.opendatahub.com/v1/ODHActivityPoi?type=1&latitude=46.501313&longitude=11.339781&radius=10000&removenullvalues=false'
        );
        let json = await response.json();
        return json || [];
        } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
        return []; // Return empty array or handle error as needed
        }
    }
    

function ActivitiesPlace() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    getPlaces().then(data => {
      setItems(data); // Set the fetched data to state
    });
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {items ? (
        <POIList pois={items} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ActivitiesPlace;
