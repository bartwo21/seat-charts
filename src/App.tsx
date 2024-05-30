import { useState } from "react";
import "./components/BusList.scss";
import BusSeat from "./components/BusSeat";
import { BusTicket } from "./data/Types";
import { BusListData } from "./data/BusListData";
import { Button, Panel, PanelGroup, Tooltip, Whisper } from "rsuite";
import { CiClock1, CiHeadphones } from "react-icons/ci";
import { MdKeyboardDoubleArrowRight, MdOutlineWbSunny } from "react-icons/md";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { BsLightningCharge } from "react-icons/bs";
import { IoIosTabletLandscape } from "react-icons/io";
import "rsuite/dist/rsuite.min.css";
import "./App.css";

function App() {
  const [userSelectedSeats, setUserSelectedSeats] = useState<{
    [busId: string]: { seatNumber: string; gender: string; price: string }[];
  }>({});
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [data, _] = useState<any[]>(BusListData);
  const [busTicket, setBusTicket] = useState<BusTicket | null>(null);

  const handleBuyBusTicket = () => {
    if (
      !userSelectedSeats[activeTicketId as any]?.length ||
      userSelectedSeats[activeTicketId as any]?.length === 0
    ) {
      alert("Lütfen koltuk seçimi yapınız.");

      return;
    }
    const selectedSeats = userSelectedSeats[activeTicketId as any];
    const ticket = data?.find((ticket) => ticket.ID === activeTicketId);
    const selectedTicket = {
      ...ticket,
      selectedSeats,
    };
    setBusTicket(selectedTicket);
  };

  const formatTime = (timeString: any) => {
    return timeString.substr(11, 5);
  };

  return (
    <div className="app">
      <h3>Bus Seat Chart</h3>
      <div className="bus-tickets-boxes">
        <PanelGroup accordion>
          {data?.map((ticket: any, index: number) => (
            <Panel
              key={ticket.ID}
              className="box"
              onEntered={() => {
                setActiveTicketId(ticket.ID);
              }}
              onExited={() => setActiveTicketId(null)}
              header={
                <div className="bus-ticket-header">
                  <div className="company">
                    {ticket.companyLogo?.logo ? (
                      <img
                        src={
                          "https://yonetim.ucuzyolu.com/storage/" +
                          "/" +
                          ticket.companyLogo?.logo
                        }
                        alt=""
                      />
                    ) : (
                      <p
                        style={{
                          fontSize: ".7rem",
                        }}
                      >
                        {ticket.FirmaAdi}
                      </p>
                    )}
                  </div>
                  <div className="time">
                    <CiClock1 /> {formatTime(ticket.Saat)}
                  </div>
                  <div className="origin">
                    <p>Origin</p>
                    <p>{ticket.KalkisNokta}</p>
                  </div>
                  <MdKeyboardDoubleArrowRight className="arrow" size={23} />
                  <div className="destination">
                    <p>Destination</p>
                    <p>{ticket.VarisNokta}</p>
                  </div>
                  <div className="seat-type">
                    <img src="/koltuk.png" alt="" />
                    {ticket.OtobusKoltukYerlesimTipi}
                  </div>
                  <div className="price">{ticket.NormalBiletFiyati} TL</div>
                  <span className="select-seat-button">Select Seat</span>
                </div>
              }
              bordered
              eventKey={index}
            >
              <div className="top">
                <div className="seat-infos">
                  <div className="icons">
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>TV</Tooltip>}
                      controlId="control-id-hover"
                    >
                      <Button>
                        <PiTelevisionSimpleLight size={20} />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Electricity</Tooltip>}
                      controlId="control-id-hover"
                    >
                      <Button>
                        <BsLightningCharge size={20} />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Tablet</Tooltip>}
                      controlId="control-id-hover"
                    >
                      <Button>
                        <IoIosTabletLandscape size={20} />
                      </Button>
                    </Whisper>
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Headphones</Tooltip>}
                      controlId="control-id-hover"
                    >
                      <Button>
                        <CiHeadphones size={20} />
                      </Button>
                    </Whisper>
                  </div>
                  <div className="seat-colors">
                    <div className="seat-color">
                      <img src="/kerkek1.png" alt="" />
                      <p>Male (Occupied)</p>
                    </div>
                    <div className="seat-color">
                      <img src="/kkadin1.png" alt="" />
                      <p>Female (Occupied)</p>
                    </div>
                    <div className="seat-color">
                      <img src="/bos.png" alt="" />
                      <p>Empty Seat</p>
                    </div>
                    <div className="seat-color">
                      <img src="/satilamaz.png" alt="" />
                      <p>Not For Sale</p>
                    </div>
                  </div>
                  <p>
                    <MdOutlineWbSunny size={12} /> The sun will mostly shine
                    from the left side on this trip.
                  </p>
                </div>
                <div className="seats">
                  <BusSeat
                    busData={ticket}
                    userSelectedSeats={userSelectedSeats[ticket.ID] || []}
                    onEntered={activeTicketId === ticket.ID}
                    setActiveTicketId={setActiveTicketId}
                    setUserSelectedSeats={setUserSelectedSeats}
                  />
                </div>
              </div>
              <div className="bottom">
                <div className="selected-seats">
                  <p>Selected Seats</p>
                  <div className="selected-seats-box">
                    {userSelectedSeats[ticket.ID]?.map((seat) => (
                      <div
                        key={seat.seatNumber}
                        className={`selected-seat ${
                          seat.gender === "male" ? "male" : "female"
                        }`}
                      >
                        <p>{seat.seatNumber}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="buy">
                  <p>
                    {userSelectedSeats[ticket.ID]?.reduce(
                      (acc, seat) => acc + parseInt(seat.price),
                      0
                    ) || "0"}{" "}
                    TL
                  </p>
                  <Button
                    onClick={handleBuyBusTicket}
                    className="buy-bus-ticket"
                  >
                    Buy Ticket
                  </Button>
                </div>
              </div>
            </Panel>
          ))}
        </PanelGroup>
      </div>
    </div>
  );
}

export default App;
