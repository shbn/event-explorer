import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import ShortlistEventCard from "./ShortlistEventCard";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const ShortlistPopup = ({ isOpen, onClose, shortlistedEvents }) => {
  const classes = useStyles();
  return (
    <Popover
      open={isOpen}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 100, left: window.innerWidth / 2 }}
      onClose={onClose}
      disableRestoreFocus
    >
      <div className={classes.paper}>
        {shortlistedEvents.length === 0 ? (
          <Typography variant="body2" color="textSecondary">
            You have not shortlisted any events yet
          </Typography>
        ) : (
          <>
            <h3>Shortlisted Events</h3>
            {shortlistedEvents.map((event) => (
              <ShortlistEventCard key={event.id} event={event} />
            ))}
          </>
        )}
      </div>
    </Popover>
  );
};

export default ShortlistPopup;
