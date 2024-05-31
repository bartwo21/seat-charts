import React from "react";
import "./EventSeat.scss";

type Seat = {
  id: string;
  number: number;
  isOccupied: boolean;
  price: number;
};

type Row = {
  id: string;
  seats: Seat[];
};

export type SelectedSeat = {
  id: string;
  price: number;
};

type SeatMapProps = {
  data: string;
  selectedSeats: SelectedSeat[];
  setSelectedSeats: (selectedSeats: SelectedSeat[]) => void;
};

const EventSeat: React.FC<SeatMapProps> = ({
  data,
  selectedSeats,
  setSelectedSeats,
}) => {
  const toggleSeatSelection = (seat: Seat) => {
    if (seat.isOccupied) return;

    const seatIndex = selectedSeats.findIndex((s) => s.id === seat.id);
    let updatedSelectedSeats = [...selectedSeats];

    if (seatIndex !== -1) {
      // If the seat is already selected, remove it
      updatedSelectedSeats.splice(seatIndex, 1);
    } else {
      // If the seat is not selected, add it
      updatedSelectedSeats.push({ id: seat.id, price: seat.price });
    }

    setSelectedSeats(updatedSelectedSeats);
  };

  const parseSeatMapData = (data: string): Row[] => {
    const rowsData = data.split(";");
    return rowsData.map((rowStr, rowIndex) => {
      const row: Row = {
        // Assign rows from Z to A. Reverse rowIndex.
        id: String.fromCharCode(65 + rowIndex),
        seats: [],
      };

      const sections = rowStr.match(/([ax]\[\w+,\s*\d+,\s*\d+(\.\d+)?\])|(_)/g);
      if (sections) {
        sections.forEach((section, sectionIndex) => {
          if (section.startsWith("a") || section.startsWith("x")) {
            const match = section.match(
              /([ax])\[(\w+),\s*(\d+),\s*(\d+(\.\d+)?)\]/
            );
            if (match) {
              const [, seatType, seatId, seatNumber, seatPrice] = match;
              row.seats.push({
                id: seatId,
                number: parseInt(seatNumber, 10),
                isOccupied: seatType === "x",
                price: parseFloat(seatPrice),
              });
            }
          } else if (section === "_") {
            row.seats.push({
              id: `gap_${rowIndex}_${sectionIndex}`,
              number: -1,
              isOccupied: false,
              price: 0,
            });
          }
        });
      }

      return row;
    });
  };

  const rows = parseSeatMapData(data);

  return (
    <div className="event-seat-map">
      <h5 className="event-seat-map-title">Screen</h5>
      {rows.map((row) => (
        <div key={row.id} className="event-seat-row">
          <span className="row-name">{row.id}</span>
          {row.seats.map((seat) => (
            <span
              key={seat.id}
              className={`event-seat ${
                seat.isOccupied
                  ? "occupied-event-seat"
                  : selectedSeats.find((s) => s.id === seat.id)
                  ? "selected-event-seat"
                  : "empty-event-seat"
              } ${seat.number === -1 ? "gap-event-seat" : ""}`}
              onClick={() => toggleSeatSelection(seat)}
              title={`Price: ${seat.price} TL`}
            >
              {seat.number !== -1 ? seat.number : ""}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventSeat;
