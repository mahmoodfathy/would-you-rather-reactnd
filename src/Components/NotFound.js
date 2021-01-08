import React from "react";
import { Typography, Card } from "@material-ui/core";
import { NotInterested } from "@material-ui/icons";

const NotFound = () => {
  return (
    <>
      <Card
        raised
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          marginTop: "200px",
        }}
      >
        <Typography
          style={{ textAlign: "Center", marginTop: "75px" }}
          variant="h6"
        >
          Error 404 Not Found!
        </Typography>
        <NotInterested
          style={{ color: "red", fontSize: 70, marginLeft: "50px" }}
        ></NotInterested>
      </Card>
    </>
  );
};

export default NotFound;
