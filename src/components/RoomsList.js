import React from "react";
import axios from "axios";


function RoomsList() {
    let [rooms, setRoom] = React.useState([])

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
        // TODO: funkcjonalność przycisków: edytuj, usuń, zarezerwuj
        // TODO: dokończyć funkcjonalność oznaczania czy sala jest dziś wolna czy zajęta

        <div className="roomsListContainer">
            {rooms.map((x) =>
                <ul className={isBookedToday(x) ? "free main-list" : "booked main-list"}>
                    <li className="listItemName">{(x.name).toUpperCase()}</li>
                    <ul className="listDetails">
                        <li className="listItemDetails">projektor: {x.has_projector.toString()}</li>
                        <li className="listItemDetails">pojemność: {x.capacity}</li>
                    </ul>
                    <ul className="listFunctions">
                        <li>edytuj</li>
                        <li>usuń</li>
                        <li>rezerwuj</li>
                    </ul>
                </ul>
            )}

        </div>
    )
}

export default RoomsList;

