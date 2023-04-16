import React from "react";

export default function RoomDetails() {

    const room = {
        id: "id",
        name: "name"
    }

    return (
        <span>
            <h6>{room.name}</h6>
            <ul className="listFunctions">
                <li>edytuj</li>
                <li>usuń</li>
                <li>rezerwuj</li>
            </ul>
        </span>
    )
}