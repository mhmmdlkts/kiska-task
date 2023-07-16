import React from "react";
import { BottomPanel } from "./bottomPanel/bottomPanel";
import { InputListener } from "./inputListener/inputListener";
import "./hmi.scss";

export const Hmi = () => {
  const bottomPanelRef = React.useRef(null);

  const triggerBottomPanelToggle = (param) => {
    if (!bottomPanelRef.current) {
      return;
    }
    switch (param) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        bottomPanelRef.current.up();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        bottomPanelRef.current.down();
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        bottomPanelRef.current.left();
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        bottomPanelRef.current.right();
        break;
    }
  };

  return (
    <div className={"hmi2"}>
      <InputListener triggerBottomPanelToggle={triggerBottomPanelToggle} />
      <div
        className={"hmi"}
        style={{ backgroundImage: `url('./img/hmi_background.jpg')` }}
      >
        <BottomPanel ref={bottomPanelRef} />
      </div>
    </div>
  );
};
