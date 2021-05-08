import io from "socket.io-client";
const socketURI = ( () => {
  if(window.location.host === 'localhost'){
    return 'http://localhost:3001'
  }
  return window.location.href
})();
const socket = io(socketURI);
export default socket;
