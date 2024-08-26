# Bus and Event Seat Charts

## Bus Seat Selection Functionality

This component allows users to select seats on a bus, providing a visual representation of the bus layout and interactive seat selection. It handles different seat statuses and gender-based seat reservations.

[npm Link](https://www.npmjs.com/package/seat-charts)

## [Installation](https://www.npmjs.com/package/seat-charts)

To install the required dependencies, run the following command:

```bash
npm install seat-charts
```

and i used sass

```bash
npm install -D sass-embedded
```

## Seat Statuses

Seats have various statuses indicated by a `Durum` property:

- **0**: Seat is empty
- **1**: Seat sold to a female
- **2**: Seat reserved for a female
- **3**: Seat sold to a male
- **4**: Seat reserved for a male
- **5**: Seat is being sold
- **6**: Seat is unavailable

Adjacent seats (`DurumYan`) also have statuses:

- **0**: Adjacent seat is empty (can be sold to any gender)
- **1**: Adjacent seat sold to a female (can only be sold to females)
- **2**: Adjacent seat sold to a male (can only be sold to males)
- **3, 4, 5, 6**: Adjacent seat is undefined (cannot be sold)

Seats with seat numbers `-1` represent corridors, doors, or tables:

- **"KO"**: Corridor
- **"KA"**, **"PI"**: Door

### Example Seat Data

The example seat data is included in your `Bus.tsx` file:

```typescript
export const placeHolderBusSeats = [
  {
    KoltukStr: "01",
    KoltukNo: "1",
    Durum: "3",
    DurumYan: "0",
    KoltukFiyatiInternet: "350",
  },
  {
    KoltukStr: "KO",
    KoltukNo: "-1",
    Durum: "0",
    DurumYan: "0",
    KoltukFiyatiInternet: "0",
  },
  {
    KoltukStr: "KO",
    KoltukNo: "-1",
    Durum: "0",
    DurumYan: "0",
    KoltukFiyatiInternet: "0",
  },
  {
    KoltukStr: "02",
    KoltukNo: "2",
    Durum: "1",
    DurumYan: "1",
    KoltukFiyatiInternet: "350",
  },
  // Add more seats as needed
];
```

# Event Seat Selection Functionality

This component describes the seating arrangement, including the status (occupied or available) and the price of each seat.

## Data Format

The data is presented in the following format:

- `'`: Start of row
- `;`: End of row
- `a`: Available seat
- `x`: Occupied seat
- `_`: Space
- `[A1, 1, 45]`: Seat information, [seat name, seat number, seat price]

### Example Data

```plaintext
"'a[A1, 1, 45]a[A2, 2, 25]a[A3, 3, 25]a[A4, 4, 251]a[A5, 5, 25]a[A6, 6, 25]x[A7, 7, 25]; a[B1, 1, 25]a[B2, 2, 25]x[B3, 3, 25]a[B4, 4, 25]_a[B5, 5, 25]'"
```

---

### Usage Example

```http
The data I use for the bus and the event are in the src/data folder. You can get it from here
```

```typescript
import "./App.css";
import { BusList, Event } from "seat-charts"; // required
import { placeHolderBusSeats } from "./Bus"; // required
import { BusListData } from "./BusListData"; // required
import "rsuite/dist/rsuite.min.css"; // required
import "../node_modules/seat-charts/src/styles/BusList.scss"; // required
import "../node_modules/seat-charts/src/styles/BusSeat.scss"; // required
import "../node_modules/seat-charts/src/styles/EventSeat.scss"; // required
import "../node_modules/seat-charts/src/styles/Event.scss"; // required
import { useState } from "react"; // required
import { seatMap } from "./EventSeat"; // required

function App() {
  const [userSelectedSeats, setUserSelectedSeats] = useState({}); // required
  const [selectedSeat, setSelectedSeat] = useState(""); // required
  const [busData, setBusData] = useState<any[]>([]); // required

  const [userSelectedEventSeats, setUserSelectedEventSeats] = useState([]); // required

  return (
    <>
      <BusList
        busSeats={placeHolderBusSeats}
        busTicketData={BusListData as any} // needs to be specified as any
        onUserSelectedSeatsChange={setUserSelectedSeats}
        onSelectedSeatChange={setSelectedSeat}
        onBusDataChange={setBusData}
      />
      <Event
        seatMap={seatMap}
        onUserSelectedSeatsChange={setUserSelectedEventSeats as any} // needs to be specified as any
      />
    </>
  );
}

export default App;
```

#### Dependencies:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-icons": "^5.2.1",
  "rsuite": "^5.64.0",
  "sass": "^1.77.3"
}
```
