import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import EventCard from "./EventCard";
import { searchEvents } from "../redux/actions/eventActions";
import EventModal from "./EventModal";
import { fetchCategories } from "../redux/actions/categoryActions";
import ShortlistPopup from "./ShortlistPopup";
import SearchForm from "./SearchForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },

  resultsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(searchEvents(searchKeyword, selectedCategory));
  };
  const events = useSelector((state) => state.event.events);

  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    if (categories.length === 0) {
      // fetch categories only once
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    handleSearch();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryNames = [];
  if (categories?.length) {
    categories.forEach((category) => {
      //Avoid results with out proper category names
      if (category?.segment?.name) {
        categoryNames.push(category?.segment?.name);
      }
    });
  }
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shortlists, setShortlists] = useState([]);

  const handleEventCardClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };
  const [shortlistPopupOpen, setShortlistPopupOpen] = useState(false);
  const toggleShortlistPopup = () => {
    setShortlistPopupOpen(!shortlistPopupOpen);
  };
  const shortlistCount = shortlists.length;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h3">Event Explorer</Typography>
        </Toolbar>
        <Box>
          <Button color="inherit" onClick={toggleShortlistPopup}>
            Shortlisted Events ({shortlistCount})
          </Button>
        </Box>
      </AppBar>
      <ShortlistPopup
        isOpen={shortlistPopupOpen}
        onClose={toggleShortlistPopup}
        shortlistedEvents={shortlists}
      />
      <div className={classes.searchContainer}>
        <SearchForm
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleSearch={handleSearch}
          categoryNames={categoryNames}
        />
      </div>
      <div className={classes.resultsContainer}>
        {events.length === 0 ? (
          <Typography variant="subtitle1">No events found</Typography>
        ) : (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => {
                handleEventCardClick(event);
              }}
            />
          ))
        )}
      </div>
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onShortlist={() => {
          setShortlists([...shortlists, selectedEvent]);
          handleCloseModal();
        }}
      />
    </div>
  );
};

export default Home;
