import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link' ;

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
	margin: 10
  },
  media: {
    height: 140,
  },
});

export default function CardIndex() {
	const data = [
		{
			title: "Citas pendientes",
			description: "Aca encontramos todas las citas que estan pendientes",
			img: "https://cdn.pixabay.com/photo/2017/10/04/09/56/laboratory-2815638_960_720.jpg",
			path: "/modulocitas"
		},
		{
			title: "Pacientes",
			description: "Aca encontramos unlistado con todos los pacientes, tambien podemos crear y actualizar un paciente.",
			img: "https://cdn.pixabay.com/photo/2021/02/19/02/58/doctor-6029079_960_720.png",
			path: "/modulousuarios"
		},
		{
			title: "Productos",
			description: "Aca encontramos un listado de todos los productos, con sus cantidades, tambien podemos crear productos",
			img: "https://cdn.pixabay.com/photo/2019/05/15/20/49/sunglasses-4205915_960_720.jpg",
			path: "/productos"
		},
		{
			title: "Registro de abonos",
			description: "Aca encontramos un listado de todos los pacientes con informacion de abonos",
			img: "https://cdn.pixabay.com/photo/2015/01/27/20/40/notebook-614213_960_720.jpg",
			path: "/contabilidad"
		},
	]
  const classes = useStyles();

  return (
	  <div className="flex flex-wrap">
		  {
		  data.map((item, index) => (
			 <Link href={item.path}>
				<Card className={classes.root} key={index}>
				
				<CardActionArea>
					<CardMedia
					className={classes.media}
					image={item.img}
					alt="optica"
					title="Contemplative Reptile"
					/>
					<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{item.title}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{item.description}
					</Typography>
					</CardContent>
				</CardActionArea>
					
				<CardActions>
					
						<Button size="small" color="primary">
						Ver...
						</Button>
					
				</CardActions>
				
				</Card>
			</Link>	
		  ))
	  }
	  </div>
	  
    
  );
}