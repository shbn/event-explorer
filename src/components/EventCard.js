import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 300,
    margin: theme.spacing(2),
  },
  cardContent: {
    paddingBottom: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "cover",
  },
}));

const EventCard = ({ event, onClick }) => {
  const classes = useStyles();

  const imageUrl =
    event.images.find((image) => image.ratio === "3_2")?.url || "";

  return (
    <Card className={classes.card} onClick={onClick}>
      <CardActionArea>
        <img src={imageUrl} alt={event.name} className={classes.image} />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6" gutterBottom>
            {event.name}
          </Typography>
          {event.classifications && (
            <Typography variant="body2" color="textPrimary">
              {event.classifications[0]?.genre?.name}
            </Typography>
          )}
          {event.venues && (
            <Typography variant="body2" color="textPrimary">
              {event._embedded.venues[0]?.name}
            </Typography>
          )}

          <Typography variant="body2" color="textPrimary">
            {event.dates.start.localDate} {event.dates.start.localTime}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
