import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Typography, Button, Box, CircularProgress } from '@mui/material';

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
};

function MovieDetails({ movieId, onUpdate }: MovieDetailsProps) {
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: { movieId },
  });

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color='error'>Error: {error.message}</Typography>;
  if (!data?.movie) return <Typography>Movie not found</Typography>;

  const { title, description, imageUrl } = data.movie;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        {title}
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
            src={imageUrl}
            alt={title}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant='body1' paragraph>
            {description}
          </Typography>
          <Button variant='contained' onClick={onUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default MovieDetails;
