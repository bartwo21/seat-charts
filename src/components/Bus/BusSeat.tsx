import { useEffect, useState } from "react";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { Button, Modal } from "rsuite";
import { placeHolderBusSeats } from "../../data/Bus";
import "./BusSeat.scss";

const BusSeat = ({
  busData,
  userSelectedSeats,
  setUserSelectedSeats,
  onEntered,
  setActiveTicketId,
}: {
  busData: any;
  userSelectedSeats: {
    busId?: string;
    seatNumber: string;
    gender: string;
    price: string;
  }[];
  setUserSelectedSeats: React.Dispatch<
    React.SetStateAction<{
      [busId: string]: {
        busId?: string;
        seatNumber: string;
        gender: string;
        price: string;
      }[];
    }>
  >;
  onEntered: boolean;
  setActiveTicketId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    setActiveTicketId(busData.ID);
  };
  const handleClose = () => setOpen(false);
  const [seats, setSeats] = useState<any>([]);
  const [selectedSeat, setSelectedSeat] = useState("");

  useEffect(() => {
    setSeats(placeHolderBusSeats);
  }, [onEntered]);

  const handleSelectSeat = (seatNumber: string, gender: string) => {
    const selectedSeat = Array.isArray(seats)
      ? seats.flat().find((seat) => seat.KoltukStr === seatNumber)
      : null;

    if (!selectedSeat) {
      alert("The seat you selected is not available.");
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
      alert("The seat you selected is not available.");
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
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      baseProfile="full"
      viewBox="0, 0, 940, 294"
      className="bus-layout"
    >
      <symbol id="front">
        <use xlinkHref="#front-upper" x="0" y="0" />
        <path
          d="m69.9 249h-1.7c0.8-12 10.1-21 21.3-21h3.5c-1.8 12-11.4 21-23.1 21zm-23.4-25c0-11 7.2-20 17.1-23v47c-9.9-3-17.1-12-17.1-24zm28.3 0c0 2-1.4 4-3.1 4s-3.1-2-3.1-4c0-1 1.4-3 3.1-3s3.1 2 3.1 3zm18.1-4h-3.4c-11.1 0-20.2-9-21.2-20h1.6c11.5 0 21 9 23 20zm-23-24c-15.4 0-27.8 12-27.8 28s12.4 29 27.8 29 27.9-13 27.9-29-12.5-28-27.9-28z"
          className="wheel"
          strokeWidth="2"
          fill="#fff"
        />
      </symbol>
      <symbol id="front-upper">
        <path
          d="m151 0.385s-87.1 4.48-112 10.3c-25.5 5.9-35.3 17.8-36.1 34.4-0.89 16.7-2.51 94.9-2.51 94.9l2.48 105s-2.61 18 17.7 27c0.8 0 15.2 5 16 6 21.6 8 64.4 9 64.4 9l66 3h41v-290c0 0.385-38 0.385-38 0.385h-19z"
          className="front"
          stroke="#BAC8CC"
          strokeWidth=".873"
          fill="#F3F7F8"
        />
      </symbol>
      <symbol id="back">
        <g className="back" stroke="#BAC8CC" strokeWidth="1.2" fill="#F3F7F8">
          <path
            d="m2.52 0.268s8.08 0.186 10.4 0.882c2.3 0.7 7.3 1.98 8.1 10.2 1.3 12.9 1.2 11 1.5 14.5 0.9 11.4 5.7 108 5.7 108s-5.5 121-10.4 138c-1.9 7-2.3 12-6 15-1.2 1-2.22 1-6.72 2h-7.5l4.94-289z"
            transform="translate(12.9 145) rotate(-1) translate(-12.9 -145)"
          />
        </g>
      </symbol>
      <symbol id="side">
        <path d="M0 0 H60 0" />
      </symbol>
      <symbol id="arrow">
        <g transform="translate(-23078.387 -2762.999)">
          <g transform="translate(23078.387 2762.999)">
            <path
              d="M488.829,155.4l17.162,5.259L488.829,166.2v-2.71H482v-5.364h6.829Z"
              transform="translate(-459.709 -155.4)"
            />
            <path
              d="M327.7,331.5h4.968v5.142H327.7Z"
              transform="translate(-312.696 -328.733)"
            />
            <path
              d="M218.1,331.5h2.956v5.142H218.1Z"
              transform="translate(-208.272 -328.733)"
            />
            <path
              d="M114,331.5h2.956v5.142H114Z"
              transform="translate(-109.088 -328.733)"
            />
            <path
              d="M10,331.5h2.956v5.142H10Z"
              transform="translate(-10 -328.733)"
            />
          </g>
          <g transform="translate(23090.387 2776.203)">
            <path
              d="M499.162,155.4,482,160.659l17.162,5.538v-2.71h6.829v-5.364h-6.829Z"
              transform="translate(-482 -155.4)"
            />
            <path
              d="M332.668,331.5H327.7v5.142h4.968Z"
              transform="translate(-301.391 -328.733)"
            />
            <path
              d="M221.056,331.5H218.1v5.142h2.956Z"
              transform="translate(-184.603 -328.733)"
            />
            <path
              d="M116.956,331.5H114v5.142h2.956Z"
              transform="translate(-75.587 -328.733)"
            />
            <path
              d="M12.956,331.5H10v5.142h2.956Z"
              transform="translate(33.325 -328.733)"
            />
          </g>
        </g>
      </symbol>
      <symbol id="seat">
        <rect x="1" y="4" width="45" height="40" rx="10" ry="10" />
        <rect x="15" y="2" width="25" height="7" rx="5" ry="5" />
        <rect x="15" y="39" width="25" height="7" rx="5" ry="5" />
        <rect x="36" y="1" width="12" height="46" rx="6" ry="6" />
      </symbol>
      <use className="s-front" xlinkHref="#front" x="0" y="0" />
      <use className="s-back" xlinkHref="#back" x="910" y="0" />
      <rect
        className="s-body"
        x="205"
        y="2"
        width="708"
        height="287"
        fill="#F3F7F8"
      />
      <use xlinkHref="#side" className="s-side" x="140" y="0" />
      {seats.map((seat: any, index: number) => {
        const rowCount = 5; // Number of rows
        // const columnCount = 13; Number of columns
        const columnWidth = 53 + 5; // Seat width + spacing
        const rowHeight = 50; // Seat height
        const startX = 120; // Starting x coordinate
        const startY = 20; // Starting y coordinate
        const columnIndex = Math.floor(index / rowCount); // Column index of the seat
        const rowIndex = rowCount - 1 - (index % rowCount); // Row index of the seat
        const x = startX + columnIndex * columnWidth;
        const y = startY + rowIndex * rowHeight;
        const seatStatus = seat.Durum;
        const seatNumber = seat.KoltukStr;

        let seatClass = "";
        switch (seatStatus) {
          case "0":
            seatClass = "empty-seat";
            break;
          case "1":
            seatClass = "sold-female";
            break;
          case "2":
            seatClass = "reserved-female";
            break;
          case "3":
            seatClass = "sold-male";
            break;
          case "4":
            seatClass = "reserved-male";
            break;
          case "5":
            seatClass = "being-sold";
            break;
          case "6":
            seatClass = "unavailable";
            break;
          default:
            seatClass = "";
        }

        const isSelected = userSelectedSeats?.some(
          (selectedSeat: any) => selectedSeat.seatNumber === seatNumber
        );
        const seatGender = userSelectedSeats?.find(
          (selectedSeat: any) => selectedSeat.seatNumber === seatNumber
        )?.gender;

        if (
          seat.KoltukStr === "KO" ||
          seat.KoltukStr === "KA" ||
          seat.KoltukStr === "PI"
        ) {
          // Create an empty area for seats labeled "KO", "KA", or "PI"
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width="53"
              height="49"
              fill="#F3F7F8"
              strokeWidth="2"
            />
          );
        } else {
          return (
            <a
              key={index}
              className={`${seatClass} ${
                isSelected && seatGender === "female"
                  ? "selected-female"
                  : isSelected && seatGender === "male"
                  ? "selected-male"
                  : ""
              }`}
              onClick={() => {
                setSelectedSeat(seat.KoltukStr);
                if (seatStatus !== "0") {
                  // If the seat is occupied, do not run handleOpen
                  return;
                }
                if (
                  !userSelectedSeats?.some(
                    (selectedSeat: any) =>
                      selectedSeat.seatNumber === seat.KoltukStr
                  )
                ) {
                  handleOpen();
                } else {
                  setUserSelectedSeats((prev) => {
                    if (prev && busData.ID in prev) {
                      const updatedSeats = { ...prev };
                      updatedSeats[busData.ID] = updatedSeats[
                        busData.ID
                      ].filter(
                        (selectedSeat) =>
                          selectedSeat.seatNumber !== seat.KoltukStr
                      );
                      return updatedSeats;
                    }
                    return prev;
                  });
                }
              }}
            >
              <use
                xlinkHref="#seat"
                x={x}
                y={y}
                className={`s-seat ${seatClass} ${
                  isSelected && seatGender === "female"
                    ? "selected-female"
                    : isSelected && seatGender === "male"
                    ? "selected-male"
                    : ""
                }`}
                width="53"
                height="49"
              />
              <text x={x + 20} y={y + 30} className="s-seat-n">
                {seat.KoltukStr}
              </text>
            </a>
          );
        }
      })}

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Select Gender for Seat Number {selectedSeat}
          </Modal.Title>
        </Modal.Header>
        <div className="select-gender">
          <Modal.Body>
            <Button
              onClick={() => handleSelectSeat(selectedSeat, "male")}
              appearance="primary"
            >
              <IoIosMan size={30} color="white" />
              Male
            </Button>
            <Button
              onClick={() => handleSelectSeat(selectedSeat, "female")}
              appearance="primary"
            >
              <IoIosWoman size={30} color="white" />
              Female
            </Button>
          </Modal.Body>
        </div>
      </Modal>
    </svg>
  );
};

export default BusSeat;
