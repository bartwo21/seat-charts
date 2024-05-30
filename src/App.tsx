import "rsuite/dist/rsuite.min.css";
import "./App.css";
import BusList from "./components/Bus/BusList";
import { useState } from "react";
import { Button } from "rsuite";

function App() {
  const [selectedSeatType, setSelectedSeatType] = useState<string>("Bus");

  const handleSeatTypeChange = (seatType: string) => {
    setSelectedSeatType(seatType);
  };

  return (
    <div className="app">
      <div className="buttons">
        <Button
          active={selectedSeatType === "Bus"}
          onClick={() => handleSeatTypeChange("Bus")}
        >
          Bus
        </Button>
        <Button
          active={selectedSeatType === "Event"}
          onClick={() => handleSeatTypeChange("Event")}
        >
          Event
        </Button>
      </div>
      {selectedSeatType === "Bus" ? <BusList /> : <h3>Event</h3>}
    </div>
  );
}

export default App;
