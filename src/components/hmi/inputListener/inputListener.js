import React from "react";
import "./inputListener.scss";

export class InputListener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null
    };
  }

  handleButtonClick = (direction) => {
    this.setState({ direction });
    this.props.triggerBottomPanelToggle(direction); 
  }

  render() {
    return(
      <div className="listener" onKeyDown={(key) => this.handleButtonClick(key.key)} onKeyUp={() => this.handleButtonClick(null)} tabIndex={1}>
        <div className="arrows" >{this.arrows()}</div>
      </div>
    );
  }

  arrows = () => {
    const { direction } = this.state;
    return (
      <div>
        <div className="console">
          <div className="console-row">
            <div className="console-cell"></div>
            <div className="console-cell">
              <button className={`console-button ${direction === 'ArrowUp' ? 'active' : ''}`} onMouseDown={() => this.handleButtonClick('ArrowUp')} onMouseUp={() => this.handleButtonClick(null)} >&#x25B2;</button>
            </div>
            <div className="console-cell"></div>
          </div>
          <div className="console-row">
            <div className="console-cell">
              <button className={`console-button ${direction === 'ArrowLeft' ? 'active' : ''}`} onMouseDown={() => this.handleButtonClick('ArrowLeft')} onMouseUp={() => this.handleButtonClick(null)}>&#x25C0;</button>
            </div>
            <div className="console-cell"></div>
            <div className="console-row">
              <div className="console-button disabled" ></div>
            </div>
            <div className="console-cell">
              <button className={`console-button ${direction === 'ArrowRight' ? 'active' : ''}`} onMouseDown={() => this.handleButtonClick('ArrowRight')} onMouseUp={() => this.handleButtonClick(null)}>&#x25B6;</button>
            </div>
          </div>
          <div className="console-row">
            <div className="console-cell"></div>
            <div className="console-cell">
              <button className={`console-button ${direction === 'ArrowDown' ? 'active' : ''}`} onMouseDown={() => this.handleButtonClick('ArrowDown')} onMouseUp={() => this.handleButtonClick(null)}>&#x25BC;</button>
            </div>
            <div className="console-cell"></div>
          </div>
        </div>
      </div>
    );
  }
}