import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = ({clases}) => {
  if (typeof(clases) === undefined) {
      clases = ""
  }

  return (
      <Tilt className={`Tilt br2 shadow-2 ${clases}`} options={{ max : 55 }} style={{ height: 120, width: 120 }} >
          <div className="Tilt-inner pa3">
              <img style={{paddingRight: '3px'}} alt='logo' src={brain}/>
          </div>
      </Tilt>
  );
};

export default Logo;