import React from "react";
import RoomsList from "./components/RoomsList";
import AddNewRoom from "./components/AddNewRoom"
import './index.css'
import SideContainer from "./components/SideContainer";

function App() {

  // TODO: Brak możliwości rejestracji na sobotę i niedzielę?
  // TODO: Komponent: navbar wyszukiwarki i sortowania
  // TODO: Komponent: lista lub kalendarz z zaznaczonymi zarezerwowanymi dniami (np. wyszarzonymi)
  // TODO: Komponent: dodawanie/edycja sali

  return (
    <div className="mainContainer">
      <div className="navContainer"><h1>Zarezerwuj salę konferencyjną</h1></div>
      <div className="functionContainer">
        <div className="searchContainer"><h3>Wyszukiwanie</h3></div>
        <div className="scrollingList"> <RoomsList /></div>
        {/* <div className="sideContainer">Side Container</div> */}
        <SideContainer />
      </div>
      <AddNewRoom />
    </div>
  )

};

export default App;
