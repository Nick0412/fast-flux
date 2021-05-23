import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { Link } from "@material-ui/core";

const Footer = () => (
  <Link to="/about" component={RouterLink}>
    About Us
  </Link>
);

export default Footer;
