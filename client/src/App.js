import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { GameProvider } from "./utils/GameState";
import { SocketProvider } from "./utils/SocketState";
import { UserProvider } from "./utils/UserState";
import { ChatProvider } from "./utils/ChatState";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Login from "./pages/Login";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";

import grass_field from "./assets/img/grass_field.png";

function App() {
  return (
    <Router>
      <div
        style={{
          backgroundImage: `url(${grass_field})`,
          backgroundSize: "100%",
          height: "100vh"
        }}
      >
        <UserProvider>
          <SocketProvider>
            <Navbar />
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <ChatProvider>
              <GameProvider>
                <Route exact path="/lobby" component={Lobby} />
                <Route exact path="/game" component={Game} />
              </GameProvider>
            </ChatProvider>
          </SocketProvider>
        </UserProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
