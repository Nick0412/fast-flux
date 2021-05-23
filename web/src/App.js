import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import UserPage from "./pages/UserPage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => (
  <Router>
    <HelmetProvider>
      <Helmet>
        <html lang="en" />
        <title>Fast Flux</title>
        <meta name="description" content="Fast flux" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" sizes="32x32" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <Navbar />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/users/:userId" component={UserPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </HelmetProvider>
  </Router>
);

export default App;
