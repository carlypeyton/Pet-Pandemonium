import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
// import Login from "./pages/Login";
// import Lobby from "./pages/Lobby";
// import Pregame from "./pages/Pregame";
// import Game from "./pages/Game";
// import Postgame from "./pages/Postgame";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        {/* <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/pregame" component={Pregame} />
        <Route exact path="/game" component={Game} />
        <Route exact path="/postgame" component={Postgame} /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
