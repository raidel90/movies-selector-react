import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { mockGetAllMoviesResult } from '../MoviesPage';

const GET_MOVIE = gql`
  query GetMovie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      description
      imageUrl
    }
  }
`;

type MovieDetailsProps = {
  movieId: string;
  onUpdate: () => void;
  isMockData: boolean;
};

function MovieDetails({ movieId, onUpdate, isMockData }: MovieDetailsProps) {
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });

  if (loading) return <CircularProgress />;

  const selectedMovie = isMockData ? mockGetAllMoviesResult.data?.movies?.data?.find((m) => m.id == movieId) : data?.movie;


  return (
    <Box sx={{ mt: 4 }}>
      {error && !isMockData && <Typography color='error'>Error: {error.message}</Typography>}
      {!data?.movie && !selectedMovie && <Typography>Movie not found in the API</Typography>}

      {!!selectedMovie?.title && (
        <>
          <Typography variant='h4' gutterBottom>
            {selectedMovie.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <img
                src={selectedMovie?.imageUrl || ''}
                alt={selectedMovie?.title}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant='body1' paragraph>
                {selectedMovie?.description}
              </Typography>
              <Button variant='contained' onClick={onUpdate}>
                Update
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default MovieDetails;
