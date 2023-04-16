import React from "react";
import './index.css';

// TODO: Brak możliwości rejestracji na sobotę i niedzielę? --> w API
// TODO: Komponent: navbar wyszukiwarki i sortowania
// TODO: Komponent: lista lub kalendarz z zaznaczonymi zarezerwowanymi dniami (np. wyszarzonymi)
// TODO: Komponent: dodawanie/edycja sali

function App() {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/rooms/")
      .then((response) => response.json())
      .then((data) => setRooms(data));
  }, []);

  // -- POBIERANIE I FORMATOWANIE AKTUALNEJ DATY
  const date = new Date();
  const humanDate = date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, "0") + '-' + date.getDate().toString().padStart(2, "0");

  //  -- FUNKCJONALNOŚĆ SPRAWDZAJĄCA CZY KTÓRAŚ Z REZERWACJI DANEJ SALI JEST TAKA SAMA JAK DZISIEJSZA DATA
  //  -- CZYLI, CZY DANA SAL JEST DZIŚ DOSTĘPNA CZY NIE
  // -- FUNKCJA, KTÓRA PORÓWNUJE PODANĄ DATĘ Z DATĄ AKTUALNĄ I ZWRACA FALSE JEŚLI DATY SĄ TAKIE SAME
  const freeOrBooked = x => {
    let isToday;
    if (x === humanDate) {
      isToday = false
    }
    else {
      isToday = true
    }
    return isToday;
  };

  // -- FUNKCJA, KTÓRA OTRZYMUJE OBIEKT DANEJ SALI, WYCIĄGA Z NIEGO DATY REZERWACJI I WPROWADZA JE DO FUNKCJI freeOrBooked()
  const isBookedToday = (obj) => {
    let isAvailable;
    const res = obj.reservation;
    if (Object.keys(res).length === 0) {
      isAvailable = true
    } else {
      for (const valueR of Object.values(res)) {
        isAvailable = freeOrBooked(valueR)
      }
    }
    return isAvailable
  };

  const [seletedRoomDetails, setSelectedRoomDetails] = React.useState([]);

  const onSelectedNameChange = (rooms) => {
    fetch(`/api/rooms/${rooms}/`)
      .then((response) => response.json())
      .then((data) => setSelectedRoomDetails(data));
  };

  return (
    <div className="mainContainer">
      <div className="navContainer"><h1>Zarezerwuj salę konferencyjną</h1></div>
      <div className="functionContainer">
        <div className="searchContainer"><h3>Wyszukiwanie</h3></div>
        <div className="scrollingList">
          <div className="roomsListContainer">
            {rooms.map((x) =>
              <ul className="free main-list" onMouseOver={() => onSelectedNameChange(x.id)}>
                <li className="listItemName" key={x.id}>{(x.name).toUpperCase()}</li>
                <li className="listItemDetails" key={x.name}>{isBookedToday(x) ? "WOLNA" : "ZAJĘTA"}</li>
              </ul>
            )}
          </div>
        </div>

        <div className="sideContainer">
          <div>
            <ul>
              <li>projektor: {seletedRoomDetails.has_projector.toString()}</li>
              <li>pojemność: {seletedRoomDetails.capacity}</li>
              <li>{seletedRoomDetails.reservation}</li>
              <li>REZERWUJ</li>
              <li>EDYTUJ</li>
              <li>USUŃ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

};

export default App;

