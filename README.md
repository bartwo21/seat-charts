# Bus Seat Selection Functionality

## Overview

This component allows users to select seats on a bus, providing a visual representation of the bus layout and interactive seat selection. It handles different seat statuses and gender-based seat reservations.

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

## Seat Selection Logic

The `handleSelectSeat` function manages the seat selection process:

```typescript
const handleSelectSeat = (seatNumber: string, gender: string) => {
  const selectedSeat = Array.isArray(seats)
    ? seats.flat().find((seat) => seat.KoltukStr === seatNumber)
    : null;

  if (!selectedSeat) {
    alert("The selected seat is not available.");
    return;
  }
  if (userSelectedSeats?.length === 4) {
    alert("You can select up to 4 seats.");
    return;
  }

  if (
    selectedSeat.Durum !== "0" ||
    selectedSeat.DurumYan === "3" ||
    selectedSeat.DurumYan === "4" ||
    selectedSeat.DurumYan === "5" ||
    selectedSeat.DurumYan === "6"
  ) {
    alert("The selected seat is not available.");
    return;
  }

  if (selectedSeat.DurumYan === "1" && gender !== "female") {
    alert("This seat is only available for females.");
    return;
  }

  if (selectedSeat.DurumYan === "2" && gender !== "male") {
    alert("This seat is only available for males.");
    return;
  }

  if (!userSelectedSeats?.some((seat) => seat.seatNumber === seatNumber)) {
    setUserSelectedSeats((prevSeats) => {
      const updatedSeats = { ...prevSeats };
      const currentSeats = updatedSeats[busData.ID] || [];
      if (currentSeats.some((seat) => seat.seatNumber === seatNumber)) {
        updatedSeats[busData.ID] = currentSeats.filter(
          (seat) => seat.seatNumber !== seatNumber
        );
      } else {
        updatedSeats[busData.ID] = [
          ...currentSeats,
          {
            busId: busData.ID,
            seatNumber,
            gender,
            price: selectedSeat?.KoltukFiyatiInternet,
          },
        ];
      }
      return updatedSeats;
    });
  }
  setSelectedSeat(seatNumber);
  handleClose();
};
