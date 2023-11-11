import React from "react";
import styles from '../styles/Webstyle.css';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function InstructionsContainer(objInfo) {
    return (
        <div className="box">
          <div className="plug-in">
            <div className="overlap">
              <div className="rectangle" />
              <img className="imageInstruction" alt={objInfo.imgAlt} src={objInfo.img} />
              {objInfo.desc()}
            </div>
          </div>
        </div>
      );
};

function PoIContainer(objInfo) {
  return (
    <div>
      <img className="arrow" alt="Arrow" src="https://c.animaapp.com/77QLtWUe/img/arrow-1.svg" />
      <div className="overlap">
        <div className="container" />
        <div className="div">Name</div>
        <div className="rectangle" />
        <div className="text-wrapper-2">tags</div>
      </div>
    </div>
  );
};


export {InstructionsContainer, PoIContainer};