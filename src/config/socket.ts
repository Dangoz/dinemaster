import io from "socket.io-client";
import baseUrl from "./baseUrl";

const socket = io(baseUrl, {
  // withCredentials: true
})

export default socket;