import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { ChangeEventHandler, FC } from "react";

interface SearchInputProps {
  onSearchChange: (searchTerm: string) => void
}

const SearchInput:FC<SearchInputProps> = ({ onSearchChange }) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for contact by last name..."
        inputProps={{ 'aria-label': 'Search for contact by last name' }}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Paper>
  );
};

export default SearchInput;