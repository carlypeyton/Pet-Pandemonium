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
import Pregame from "./pages/Pregame";
import Game from "./pages/Game";
import Postgame from "./pages/Postgame";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <UserProvider>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <ChatProvider>
            <SocketProvider>
              <Route exact path="/lobby" component={Lobby} />
              <GameProvider>
                <Route exact path="/game" component={Game} />
                <Route exact path="/pregame" component={Pregame} />
                <Route exact path="/postgame" component={Postgame} />
              </GameProvider>
            </SocketProvider>
          </ChatProvider>
        </UserProvider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
