import React from "react";
import axios from "axios";


function AddNewRoom() {

    const [projector, setProjector] = React.useState(false)

    const [room, setRoom] = React.useState({
        name: "",
        capacity: 0,
        has_projector: projector
    });

    const handleCheckProjector = () => {
        setProjector(!projector)
    }

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
        };
        axios.post("/api/rooms/", userData).then((res) => {
            console.log("DODANO SALĘ " + res.status, res.data)
        });
    };

    return (
            <form onSubmit={handleSubmit}>
                <label> Nazwa
                    <input
                        type="text"
                        name="name"
                        placeholder="Nazwa sali"
                        value={room.name}
                        onChange={handleChange} />
                </label>
                <label> Pojemność
                    <input
                        type="number"
                        name="capacity"
                        placeholder="0"
                        value={room.capacity}
                        onChange={handleChange} />
                </label>
                <label> Projektor?
                    <input
                        type="checkbox"
                        name="has_projector"
                        value={projector}
                        onChange={handleCheckProjector} />
                </label>
                <button type="submit">DODAJ</button>
            </form>
    )

}

export default AddNewRoom;