// import React, { useState } from "react";
// import axios from "axios";


// function BookingForm() {

//     const [data, setData] = useState({
//         name: "",
//         date: "",
//         comment: "",
//         room: ""
//     });

//     const handleChange = (e) => {

//         const value = e.target.value;
//         setData({
//             ...data,
//             [e.target.name]: value
//         })
//         // setData(e.target.value);
//     }

//     // /api/rooms/"

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const userData = {
//             name: data.name,
//             date: data.date,
//             comment: data.comment,
//             room: data.room
//         };
//         axios.post("/api/rooms/", userData).then((res) => {
//             console.log("STATUS: " + res.status)
//         })
//     } 

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>Imię
//                 <input
//                     type="text"
//                     name="name"
//                     value={data.name}
//                     onChange={handleChange} />
//             </label>
//             <label>Data
//                 <input
//                     name="date"
//                     value={data.date}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>Komentarz
//                 <input
//                     name="comment"
//                     value={data.comment}
//                     onChange={handleChange}
//                 />
//             </label>
//             <label>Sala
//                 <input
//                     name="room"
//                     value={data.room}
//                     onChange={handleChange}
//                 />
//             </label>
//             <button type="submit">Zarezerwuj</button>
//         </form>
//     )


// }

// export default BookingForm