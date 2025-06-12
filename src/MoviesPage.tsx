import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import MovieDropdown from './components/MovieDropdown';
import MovieDetails from './components/MovieDetails';
import MovieUpdate from './components/MovieUpdate';

const GET_ALL_MOVIES = gql`
  query GetAllMovies($page: Int, $limit: Int) {
    movies(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        description
        imageUrl
      }
      meta {
        totalCount
      }
    }
  }
`;

function MoviesPage() {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_MOVIES, {
    variables: { page: 1, limit: 8 },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color='error'>Error: {error.message}</Typography>;
  if (!data?.movies?.data) return <Typography>No movies found</Typography>;

  const handleMovieSelect = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsUpdating(false);
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Typography variant='h3' gutterBottom>
        Movies
      </Typography>
      <Box sx={{ mt: 4 }}>
        <MovieDropdown
          movies={data.movies.data}
          selectedMovieId={selectedMovieId}
          onMovieSelect={handleMovieSelect}
        />

        {selectedMovieId && !isUpdating && (
          <MovieDetails
            movieId={selectedMovieId}
            onUpdate={() => setIsUpdating(true)}
          />
        )}

        {selectedMovieId && isUpdating && (
          <MovieUpdate
            movieId={selectedMovieId}
            onCancel={() => setIsUpdating(false)}
          />
        )}
      </Box>
    </Container>
  );
}

export default MoviesPage;
