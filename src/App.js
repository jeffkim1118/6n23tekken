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

  const gameLoop = () => {
    if (controllerIndex !== null) {
      const gamepad = navigator.getGamepads()[controllerIndex];
      handleButtons(gamepad.buttons);
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
