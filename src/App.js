import React from "react";

function App() {

  return (
    <div className="mainContainer">
      <div className="navContainer"><h1>Zarezerwuj salę konferencyjną</h1></div>
      <div className="functionContainer">
        <div className="searchContainer"><h3>Wyszukiwanie</h3></div>
        <div className="scrollingList"></div>
        <div className="sideContainer"></div>
      </div>
    </div>
  )

};

export default App;

  // TODO: Brak możliwości rejestracji na sobotę i niedzielę? --> w API
  // TODO: Komponent: navbar wyszukiwarki i sortowania
  // TODO: Komponent: lista lub kalendarz z zaznaczonymi zarezerwowanymi dniami (np. wyszarzonymi)
  // TODO: Komponent: dodawanie/edycja sali