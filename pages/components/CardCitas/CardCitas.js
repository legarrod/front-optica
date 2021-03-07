import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from 'next/link' ;
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
});

export default function CardCitas({ data, allData }) {
  const classes = useStyles();
  return (
    <div className="flex flex-wrap justify-center">
      {data?.map((item) => (
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
            <Link href={`/citas/?${item.id_cita_paciente}`}>
              <a>
              <Button size="small">Ir a consulta</Button>
              </a>
            </Link>  
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
}
