import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography, Box, CircularProgress, Switch } from '@mui/material';
import MovieDropdown from './components/MovieDropdown';
import MovieDetails from './components/MovieDetails';
import MovieUpdate from './components/MovieUpdate';

export const mockGetAllMoviesResult = {
  data: {
    movies: {
      data: [
        {
          id: '1',
          title: 'Inception',
          description: 'A skilled thief leads a team into people’s dreams.',
          imageUrl: 'https://example.com/inception.jpg',
        },
        {
          id: '2',
          title: 'The Matrix',
          description: 'A hacker discovers the world is a simulation.',
          imageUrl: 'https://example.com/matrix.jpg',
        },
        {
          id: '3',
          title: 'Interstellar',
          description: 'A team travels through a wormhole to save humanity.',
          imageUrl: 'https://example.com/interstellar.jpg',
        },
      ],
      meta: {
        totalCount: 15,
      },
    },
  },
};

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
  const [isMockData, setIsMockData] = useState(true);
  const apiResponse = useQuery(GET_ALL_MOVIES, {
    variables: { page: 1, limit: 8 },
  });
  let data = apiResponse.data;
  const error = apiResponse.error;
  const loading = apiResponse.loading;

  if (loading) return <CircularProgress />;
  if (isMockData) data = mockGetAllMoviesResult.data;

  const handleMovieSelect = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsUpdating(false);
  };

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      {error && !isMockData &&  <Typography color='error'>Error from API(graphQL): {error.message}</Typography>}
      {!data?.movies?.data && <Typography>No movies found in the api</Typography>}

      <div style={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Typography>Mock Data: </Typography>
        <Switch
          checked={isMockData}
          onChange={() => setIsMockData(!isMockData)}
          color="primary"
        />
      </div>

      <Typography variant='h3' gutterBottom>Movies</Typography>
      <Box sx={{ mt: 4 }}>
        <MovieDropdown
          movies={data?.movies?.data || []}
          selectedMovieId={selectedMovieId}
          onMovieSelect={handleMovieSelect}
        />

        {selectedMovieId && !isUpdating && (
          <MovieDetails
            movieId={selectedMovieId || data?.movie?.id}
            onUpdate={() => setIsUpdating(true)}
            isMockData
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
