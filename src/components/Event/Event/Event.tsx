import { useState } from "react";
import { seatMap } from "../../../data/EventSeat";
import EventSeat, { SelectedSeat } from "../EventSeat/EventSeat";
import "./Event.scss";

const Event = () => {
  // example data: "'a[A1, 1, 45]a[A2, 2, 25]a[A3, 3, 25]a[A4, 4, 251]a[A5, 5, 25]a[A6, 6, 25]x[A7, 7, 25]'; 'a[B1, 1, 25]a[B2, 2, 25]x[B3, 3, 25]a[B4, 4, 25]_a[B5, 5, 25]'"
  // a: seat, x: occupied seat, _: space, [A1, 1, 45]: [seat name, seat number, seat price], ;: end of row, ': start of row
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  return (
    <div className="event">
      <h3>Event Seat Chart</h3>
      <EventSeat
        data={seatMap}
        selectedSeats={selectedSeats}
        setSelectedSeats={setSelectedSeats}
      />
      <div className="selected-seats">
        <h5>Selected Seats</h5>
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat.id}>
              Seat no: {seat.id}, Seat price: {seat.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Event;
