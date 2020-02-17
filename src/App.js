import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Assets from "./Routes/Assets";

export default () => {
  const theme = createMuiTheme({
    typography: {
      fontFamily: "Playfair Display"
    },
    palette: {
      primary: {
        main: "#000"
      },
      secondary: {
        main: "#ffe600"
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/assets">
            <Assets />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
