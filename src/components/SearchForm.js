import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    marginRight: "10px",
    minWidth: "220px",
  },

  categorySelector: {
    marginRight: theme.spacing(2),
    minWidth: "220px",
  },
  searchButton: {
    marginTop: "10px",
  },
}));

const SearchForm = ({
  searchKeyword,
  setSearchKeyword,
  selectedCategory,
  setSelectedCategory,
  handleSearch,
  categoryNames,
}) => {
  const classes = useStyles();

  return (
    <div>
      <TextField
        label="Search Events"
        variant="outlined"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className={classes.searchInput}
        id="search-events-input"
      />
      <FormControl variant="outlined" className={classes.categorySelector}>
        <InputLabel
          htmlFor="select-category"
          className={classes.inputLabel}
          id="select-category-label"
        >
          Select Category
        </InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Select Category"
          id="select-category"
          variant="outlined"
          className={classes.categorySelector}
        >
          <MenuItem key="" value="">
            All
          </MenuItem>
          {categoryNames.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className={classes.searchButton}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchForm;
