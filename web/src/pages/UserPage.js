import React from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@material-ui/core";

const UserPage = () => {
  const { userId } = useParams();

  return <Typography variant="h2">{userId}</Typography>;
};

export default UserPage;
