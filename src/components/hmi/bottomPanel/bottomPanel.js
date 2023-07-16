import React from "react";
import "./bottomPanel.scss";
import { SingleButton } from "../singleButton/singleButton";

export class BottomPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoom: null,
      isPanelOpen: true,
      existPanel: true,
      widgetData: {
      0: {
        title: "Attic",
        isOn: true,
        isDisabled: true,
      },
      1: {
        title: "Basement",
        isOn: true,
        isDisabled: false,
      },
      2: {
        title: "Bathroom",
        isOn: true,
        isDisabled: false,
      },
      3: {
        title: "Children's Room",
        isOn: true,
        isDisabled: false,
      },
      4: {
        title: "Dining Room",
        isOn: true,
        isDisabled: false,
      },
      5: {
        title: "Guest Room",
        isOn: true,
        isDisabled: true,
      },
      6: {
        title: "Hallway",
        isOn: false,
        isDisabled: true,
      },
      7: {
        title: "Home Office",
        isOn: true,
        isDisabled: false,
      },
      8: {
        title: "Kitchen",
        isOn: true,
        isDisabled: false,
      },
      9: {
        title: "Living Room",
        isOn: true,
        isDisabled: false,
      },
      10: {
        title: "Master Bedroom",
        isOn: false,
        isDisabled: true,
      },
      11: {
        title: "Utility Room",
        isOn: true,
        isDisabled: true,
      },
      }      
    }
  }

  componentDidMount() {
    this.initRoom();
  }

  initRoom() {
    const firstRoomIndex = this.getNextRoom(0);
  
    this.setState(prevState => ({
      selectedRoom: firstRoomIndex,
    }));
  }

  getNextRoom(newIndex, isDown = true) {
    const { widgetData, selectedRoom } = this.state;
    const keys = Object.keys(widgetData);

    if (isDown) {
      for (let i = newIndex; i < keys.length; i++) {
        if (true || !widgetData[i].isDisabled) {
          return i;
        }
      }
    } else {
      for (let i = newIndex; i >= 0; i--) {
        if (true || !widgetData[i].isDisabled) {
          return i;
        }
      }
    }
  
    return selectedRoom;
  }

  switchLight(roomId) {
    if (roomId == null) {
      return;
    }

    const room = this.state.widgetData[roomId];
  
    if (room.isDisabled) {
      return;
    }

    room.isOn = !room.isOn;
  
    this.setState(prevState => ({
      widgetData: {
        ...prevState.widgetData,
        [roomId]: room
      }
    }));
  }
  
  closePanel() {
    const { existPanel } = this.state;
    this.setState({
      isPanelOpen: false,
      selectedRoom: null,
    }, () => {
      setTimeout(() => {
        this.setState({ existPanel: false });
      }, 300);
    });
  }

  openPanel() {
    this.initRoom();
    this.setState({
      existPanel: true,
      isPanelOpen: true,
    });
  }

  left() {
    this.closePanel();
  }
  
  right() {
    const { selectedRoom } = this.state;
    this.switchLight(selectedRoom);
  }

  up() {
    const { selectedRoom, existPanel } = this.state;

    if (!existPanel) {
      this.openPanel();
      return;
    }

    if (selectedRoom == null) {
      return;
    }

    let newRoomIndex = this.getNextRoom(selectedRoom - 1, false);
    let leapTimes = newRoomIndex - this.state.selectedRoom;
    if (leapTimes == 0) {
      return;
    }

    this.setState(prevState => ({
      selectedRoom: newRoomIndex
    }));

    this.scrollContentToTop();
  }

  down() {
    if (this.state.selectedRoom == null) {
      return;
    }

    let newRoomIndex = Math.min(this.getNextRoom(this.state.selectedRoom + 1), Object.keys(this.state.widgetData).length - 1);
    /*let leapTimes = newRoomIndex - this.state.selectedRoom;
    if (leapTimes == 0) {
      return;
    }*/
    this.setState(prevState => ({
      selectedRoom: newRoomIndex
    }));

    this.scrollContentToBottom(leapTimes);
  }

  getSelectedRoom() {
    return this.getRoom(this.state.selectedRoom);
  }

  getRoom(index) {
    return this.state.widgetData[index];
  }

  scrollContentToTop(times = 1) {
    const { selectedRoom } = this.state;
    const contentWrapper = document.getElementById("content-wrapper");
    if (contentWrapper) {
      let firstItem = Math.round(contentWrapper.scrollTop / 93.5);
      if (selectedRoom - 2 < firstItem) {
        contentWrapper.scrollTop -= 93.5 * times;
      }
    }
  }

  scrollContentToBottom(times = 1) {
    const { selectedRoom } = this.state;
    const contentWrapper = document.getElementById("content-wrapper");
    if (contentWrapper) {
      let firstItem = Math.round(contentWrapper.scrollTop / 93.5);
      if ((selectedRoom + times) - 4 > firstItem) {
        contentWrapper.scrollTop += 93.5 * times;
      }
    }
  }

  render() {
    const { widgetData, selectedRoom, isPanelOpen, existPanel } = this.state;
    return (
      <>
        {existPanel && (
          <div className={`bottom-panel ${isPanelOpen ? "open" : "closed"}`}>
            <div id="content-wrapper" className="content">
            {Object.keys(widgetData).map((key) => (
                  <SingleButton
                    key={key}
                    widget={this.getRoom(parseInt(key))}
                    isSelected={parseInt(key) === selectedRoom}
                  />
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}  