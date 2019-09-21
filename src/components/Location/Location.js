import React from "react";
import Card from "./../UI/Card/Card";
import classes from "./Location.module.scss";
import { Button } from "@material-ui/core";

const Location = props => {
  console.log(props);

  return (
    <Card
      className={[classes.Card, props.className].join(" ")}
      key={props.location.id}
    >
      <Button>Edit</Button>
      <Button onClick={props.passedFunction(props.location.id)}>delete</Button>

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
