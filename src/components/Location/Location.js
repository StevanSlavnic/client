import React from "react";
import Card from "./../UI/Card/Card";
import { Button } from "@material-ui/core";

import classes from "./Location.module.scss";

const Location = props => {
  return (
    <Card
      className={[classes.Card, props.className].join(" ")}
      key={props.location.id}
    >
      {!props.isAdmin ? (
        <div className={classes.LocationGeneral}>
          <div>ID: {props.location.id}</div>
          <div>
            <Button
              onClick={() => {
                props.openEditModal(props.location.id);
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                props.openDeleteModal(props.location.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div>
        <div>
          <h2>{props.location.title}</h2>
        </div>
        <div>
          <p>{props.location.description}</p>
        </div>
      </div>
      <div>
        <div>Address: {props.location.address}</div>
        <div>City: {props.location.city}</div>
        <div>State: {props.location.state}</div>
        <div>Zip Code: {props.location.zip_code}</div>
      </div>
    </Card>
  );
};

export default Location;
