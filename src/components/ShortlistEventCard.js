import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 200,
    margin: theme.spacing(2),
  },
  cardContent: {
    paddingBottom: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: 100,
    objectFit: "cover",
  },
}));

const ShortlistEventCard = ({ event }) => {
  const classes = useStyles();

  const imageUrl =
    event.images.find((image) => image.ratio === "3_2")?.url || "";

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <img src={imageUrl} alt={event.name} className={classes.image} />
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" gutterBottom>
            {event.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ShortlistEventCard;
