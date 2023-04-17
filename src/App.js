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
    setSelectedRoomDetails(rooms);
    console.log(typeof seletedRoomDetails.has_projector)
  };

  const [postResult, setPostResult] = React.useState(null);

  const new_room_name = React.useRef(null);
  const new_room_capacity = React.useRef(null);
  const new_room_has_projector = React.useRef(null);

  async function onAddRoom() {
    const postData = {
      name: new_room_name.current.value,
      capacity: new_room_capacity.current.value,
      has_projector: new_room_has_projector.current.value,
    };
    try {
      const res = await fetch("/api/rooms/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      if (!res.ok) {
        const message = `An error has occured: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data = await res.json();
      const result = {
        status: res.status + "-" + res.statusText,
        headers: {
          "Content-Type": res.headers.get("Content-Type"),
          "Content-Length": res.headers.get("Content-Length"),
        },
        data: data,
      };
      setPostResult(result);
    } catch (err) {
      setPostResult(err.message);
    }
  }

      return (
        <div className="mainContainer">
          <div className="navContainer"><h1>Zarezerwuj salę konferencyjną</h1></div>
          <div className="functionContainer">
            <div className="searchContainer"><h3>Wyszukiwanie</h3></div>
            <div className="scrollingList">
              <div className="roomsListContainer">
                {rooms.map((x) =>
                  // <ul className="free main-list" onMouseOver={() => onSelectedNameChange(x.id)}>
                  <ul className="free main-list" onMouseEnter={() => onSelectedNameChange(x)}>
                    <li className="listItemName" key={x.id}>{(x.name).toUpperCase()}</li>
                    <li className="listItemDetails" key={x.name}>{isBookedToday(x) ? "WOLNA" : "ZAJĘTA"}</li>
                    {/* <li className="listItemDetails" key={x.name}>{isFree}</li> */}
                  </ul>
                )}
              </div>
            </div>

            <div className="sideContainer">
              <div>
                <ul>
                  <li>REZERWUJ</li>
                  <li>EDYTUJ</li>
                  <li>USUŃ</li>
                  <li>projektor: {seletedRoomDetails.has_projector}</li>
                  <li>pojemność: {seletedRoomDetails.capacity}</li>
                  <li>{seletedRoomDetails.reservation}</li>
                </ul>
              </div>
              <div>
                <form>
                  <label>Nazwa:
                    <input type="text" ref={new_room_name}/>
                  </label>
                  <label>Pojemność:
                    <input type="number" ref={new_room_capacity}/>
                  </label>
                  <label>Projektor?:
                    <input type="bollean" ref={new_room_has_projector} />
                  </label>
                  <button type="submit" onClick={onAddRoom}>DODAJ</button>
                </form>
                <p>{postResult}</p>
              </div>
            </div>
          </div>
        </div>
      )

    };

    export default App;

