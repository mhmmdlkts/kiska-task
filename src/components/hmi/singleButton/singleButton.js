import React from "react";
import "./singleButton.scss";
import lightOnImage from "./images/light_on.png";
import lightOffImage from "./images/light_off.png";
import lightUnknownImage from "./images/light_unknown.png";

export const SingleButton = ({ widget, isSelected }) => {
  const { title, isDisabled, isOn } = widget;

  return (
    <div className={isSelected ? "selected" : "not-selected"} >
      <div className={`single-button ${isDisabled ? "disabled" : ""}`}>
        <img className="light-image" src={isDisabled? lightUnknownImage : (isOn ? lightOnImage : lightOffImage)} alt={isOn ? "Light On" : "Light Off"} />
        <h3>{title}</h3>
        {!isDisabled && (
          <span className="widget-text">
            <span>
              {isOn ? 'Turn Off ' : 'Turn On '}
            </span>
            <span className="arrow">{isOn? '\u25B8': '\u25B9'}</span>
          </span>
        )}
      </div>
    </div>
  );
};
