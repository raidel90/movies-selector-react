import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

type Movie = {
  id: string;
  title: string;
};

type MovieDropdownProps = {
  movies: Movie[];
  selectedMovieId: string | null;
  onMovieSelect: (movieId: string) => void;
};

function MovieDropdown({
  movies,
  selectedMovieId,
  onMovieSelect,
}: MovieDropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onMovieSelect(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel>Select a Movie</InputLabel>
      <Select
        value={selectedMovieId || ''}
        label='Select a Movie'
        onChange={handleChange}
        sx={{ minWidth: 400 }}
      >
        {movies.map((movie) => (
          <MenuItem key={movie.id} value={movie.id}>
            {movie.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MovieDropdown;
