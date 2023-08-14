import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";

import EventCard from "./EventCard";
import { searchEvents } from "../redux/actions/eventActions";
import EventModal from "./EventModal";
import { fetchCategories } from "../redux/actions/categoryActions";
import ShortlistPopup from "./ShortlistPopup";

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
  searchInput: {
    marginRight: theme.spacing(2),
    minWidth: "220px",
  },

  categorySelector: {
    marginRight: theme.spacing(2),
    minWidth: "220px",
  },
  inputLabel: {
    marginLeft: theme.spacing(2),
    marginTop: "-4px",
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
        <TextField
          className={classes.searchInput}
          label="Search Events"
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="select-category-label" className={classes.inputLabel}>
            Select Category
          </InputLabel>
          <Select
            labelId="select-category"
            id="select-category"
            className={classes.categorySelector}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Select Category"
            variant="outlined"
          >
            <MenuItem key="" value="">
              All
            </MenuItem>
            {categoryNames.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
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
                console.log(event);
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
