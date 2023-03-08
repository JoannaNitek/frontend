import React from "react";
import axios from "axios";


function AddNewRoom() {
    const [room, setRoom] = React.useState({
        name: "",
        capacity: 0,
        has_projector: false
        // reservation: null
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setRoom({
            ...room,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: room.name,
            capacity: room.capacity,
            has_projector: room.has_projector
            // reservation: room.reservation
        };
        axios.post("/api/rooms/", userData).then((res) => {
            console.log("DODANO SALĘ " + res.status, res.data)
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> nazwa: 
                    <input
                        type="text"
                        name="name"
                        value={room.name}
                    onChange={handleChange}/>
                </label>
                <label> pojemność: 
                    <input
                        type="number"
                        name="capacity"
                        value={room.capacity}
                    onChange={handleChange}/>
                </label>
                <label> projektor: 
                    <input
                        type="text"
                        name="has_projector"
                        value={room.has_projector}
                    onChange={handleChange}/>
                </label>
                {/* <label> projektor: 
                    <input
                        type="text"
                        name="reservation"
                        value={room.reservation}
                    onChange={handleChange}/>
                </label> */}
                <button type="submit">DODAJ</button>
            </form>
        </div>
    )

}

export default AddNewRoom;