import React from "react";
import axios from "axios";
// import RoomDetails from "./RoomDetails";
import { Link } from "react-router-dom";


function RoomsList() {
    const [rooms, setRoom] = React.useState([]);

    // useEffect pozwala nam wykonać daną czynność (w tym wypadku request API) tylko raz
    React.useEffect(() => {
        axios.get("/api/rooms/")
            .then((res) => {
                setRoom(res.data)
            }).catch(() => {
                alert("Something went wrong");
            })
    }, [])

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
                // console.log('isAvailable: ' + isAvailable)
                // console.log('type of date: ' + typeof(valueR))

            }
        }
        return isAvailable
    };


    rooms.map(x => {
        return console.log('is available today?: ' + isBookedToday(x));
    });

    return (

        // TODO: po najechaniu na salę w bocznym kontenerze wyświetla się kalendarz z listą dostępnych terminów
        // TODO: funkcjonalność przycisków: edytuj, usuń, zarezerwuj -> przenieść do details?
        // TODO: dokończyć funkcjonalność oznaczania czy sala jest dziś wolna czy zajęta

        <div className="roomsListContainer">
            {rooms.map((x) =>
                // <Link to={<RoomDetails />}>
                
                    <ul className={isBookedToday(x) ? "free main-list" : "booked main-list"}>
                    <Link to={`rooms/${x.id}`}><li className="listItemName" key={x.id}>{(x.name).toUpperCase()}</li></Link>
                    <ul className="listDetails">
                        <li className="listItemDetails">projektor: {x.has_projector.toString()}</li>
                        <li className="listItemDetails">pojemność: {x.capacity}</li>
                    </ul>
                    </ul>

                // </Link>
                
            )}

        </div>
    )
}

export default RoomsList;

