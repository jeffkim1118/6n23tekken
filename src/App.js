import "./App.css";
import PsPad from "./components/imgs/psPad";
import { useEffect, useState } from "react";

function App() {
  const [controllerIndex, setControllerIndex] = useState(null);
  

  const updateControllerIndex = (index) => {
    setControllerIndex(index);
  };

  useEffect(() => {
    window.addEventListener("gamepadconnected", (event) => {
      const gamepad = event.gamepad;
      updateControllerIndex(gamepad.index);
      console.log("connected");
    });
  }, []);

  useEffect(() => {
    window.addEventListener("gamepaddisconnected", (event) => {
      updateControllerIndex(null);
      console.log("disconnected");
    });
  }, []);

  const handleButtons = (buttons) => {
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      const buttonElement = document.getElementById(`controller-b${i}`);

      const selectedButtonClass = "selected-button";
      if (buttonElement) {
        if (button.value > 0) {
          buttonElement.classList.add(selectedButtonClass);
        } else {
          buttonElement.classList.remove(selectedButtonClass);
        }
      }
    }
  };

  const updateStick = (elementId, leftRightAxis, upDownAxis) => {
    const multiplier = 25;
    const stickLeftRight = leftRightAxis * multiplier;
    const stickUpDown = upDownAxis * multiplier;

    const stick = document.getElementById(elementId);
    const x = Number(stick.dataset.originalXPosition);
    const y = Number(stick.dataset.originalYPosition);

    stick.setAttribute("cx", x + stickLeftRight);
    stick.setAttribute("cy", y + stickUpDown);
  }

  const handleSticks = (axes) => {
    updateStick('controller-b10', axes[0], axes[1]);
    updateStick('controller-b11', axes[2], axes[3]);
  }

  const gameLoop = () => {
    if (controllerIndex !== null) {
      const gamepad = navigator.getGamepads()[controllerIndex];
      handleButtons(gamepad.buttons);
      handleSticks(gamepad.axes);
    }
    requestAnimationFrame(gameLoop);
  }

  useEffect(() => {
    gameLoop();
  },[controllerIndex]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="controller-container">
          <PsPad />
        </div>
      </header>
    </div>
  );
}

export default App;
