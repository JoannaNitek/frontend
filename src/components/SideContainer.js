import React from "react";
import RoomDetails from "./RoomDetails";
// import AddNewRoom from "./AddNewRoom";

export default function SideContainer() {

    return (
        <div className="sideContainer">
            {/* <AddNewRoom /> */}
            <RoomDetails />
            <h2>Najedź na wybraną salę aby zobaczyć podgląd kalendarza</h2>
            <hr />
            <h2>Kliknij aby dodać nową salę <br /></h2>
                {/* {/* <Link to={<AddNewRoom />}>+</Link></h2> */}

        </div>
    )
}