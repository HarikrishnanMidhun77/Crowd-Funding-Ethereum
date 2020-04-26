import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";
import Home from "./components/Home";
import Campaign from "./components/Campaign";
import NotFound from "./components/NotFound";
import "semantic-ui-css/semantic.min.css";

import logo from "./logo.svg";
import "./App.css"; //history="history"

function App() {
  // navigateToHome() {
  //   window.location = "/";
  // }
  return (
    <Router>
      <Container>
        <Menu secondary>
          <Menu.Item
            name="/home"
            onClick={() => {
              window.location = "/";
            }}
          />
        </Menu>
        <Switch>
          <Route path="/" exact render={(props) => <Home {...props} />} />
          <Route
            path="/campaigns/:address"
            exact
            render={(props) => <Campaign {...props} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </Router>
    // <Router>
    //   <Container>
    //     <Menu secondary>
    //       <Menu.Item name="/home" onClick={navigateToHome()} />
    //     </Menu>
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/campaigns/:address" component={Campaign} />
    //       <Route component={NotFound} />
    //     </Switch>
    //   </Container>
    // </Router>
  );
}

export default App;
