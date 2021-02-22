import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { getData } from "../../api/AsyncHttpRequest";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function CardCitas({ data }) {
  const classes = useStyles();

  console.log(data);
  return (
    <div className="flex flex-wrap justify-center">
      {data.map((item) => (
        <div className="m-2" key={item.id_cita_paciente}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {`${item.nombre} ${item.apellidos}`}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {item.fecha_cita}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Ir a consulta</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
