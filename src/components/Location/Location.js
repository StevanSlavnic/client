import React from "react";
import Card from "./../UI/Card/Card";
import classes from "./Location.module.scss";
import { Button } from "@material-ui/core";

const Location = props => {
  console.log(new Date(props.location.created_at));
  console.log(new Date(props.location.updated_at));

  return (
    <Card
      className={[classes.Card, props.className].join(" ")}
      key={props.location.id}
    >
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
      <div>{props.location.id}</div>
      <div>{props.location.title}</div>
      <div>{props.location.description}</div>
      <div>{props.location.address}</div>
      <div>{props.location.city}</div>
      <div>{props.location.state}</div>
      <div>{props.location.zip_code}</div>
    </Card>
  );
};

export default Location;
