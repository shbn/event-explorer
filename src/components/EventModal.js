import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600,
    width: "90%",
  },
  image: {
    width: "100%",
    maxHeight: 400,
    objectFit: "cover",
    marginBottom: "20px",
  },
}));

const EventModal = ({ event, isOpen, onClose, onShortlist }) => {
  const classes = useStyles();

  if (!event) {
    return null;
  }

  const imageUrl =
    event.images.find((image) => image.ratio === "16_9")?.url || "";

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="event-modal-title"
      aria-describedby="event-modal-description"
    >
      <Box className={classes.modalContent}>
        <Typography variant="h4" id="event-modal-title" gutterBottom>
          {event.name}
        </Typography>
        <img src={imageUrl} alt={event.name} className={classes.image} />

        {event.classifications && (
          <Typography variant="body1" gutterBottom>
            Genre: {event.classifications[0]?.genre?.name}
          </Typography>
        )}
        {event.venues && (
          <Typography variant="body2" color="textSecondary">
            Venue: {event._embedded.venues[0]?.name}
          </Typography>
        )}
        {event.dates && (
          <>
            <Typography variant="body2" color="textSecondary">
              Start Date: {event.dates.start?.localDate}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Start Time: {event.dates.start?.localTime}
            </Typography>
          </>
        )}

        {event.pleaseNote && (
          <Typography variant="body2" gutterBottom>
            Please Note: {event.pleaseNote}
          </Typography>
        )}

        <Box className="footer" sx={{ margin: "20px", textAlign: "center" }}>
          <Button onClick={onShortlist} variant="contained" color="primary">
            Shortlist
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
