import io from "socket.io-client";

//  export const setupSocket = () => {
//     const userToken = localStorage.getItem("jwtToken");
//     if (userToken && !socket) {
//       const newSocket = io.connect("http://localhost:5000", {
//         query: {
//           token: localStorage.getItem("userToken"),
//         },
//       });

//       newSocket.on("disconnect", () => {
//         setSocket(null);
//         setTimeout(setupSocket, 2000);
//         console.log("socket disconnected");
//       });

//       newSocket.on("connect", () => {
//         console.log("socket connected!");
//       });

//       setSocket(newSocket);
//     }
//   };