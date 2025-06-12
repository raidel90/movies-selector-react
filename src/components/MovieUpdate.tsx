import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

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

const UPDATE_MOVIE = gql`
  mutation UpdateMovie($updateMovie: Movie!) {
    updateMovie(updateMovie: $updateMovie) {
      id
      title
      description
      imageUrl
    }
  }
`;

type MovieUpdateProps = {
  movieId: string;
  onCancel: () => void;
};

function MovieUpdate({ movieId, onCancel }: MovieUpdateProps) {
  const { data, loading } = useQuery(GET_MOVIE, { variables: { movieId } });
  const [updateMovie, { loading: updating }] = useMutation(UPDATE_MOVIE);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (data?.movie) {
      setTitle(data.movie.title);
      setDescription(data.movie.description);
      setImageUrl(data.movie.imageUrl);
    }
  }, [data]);

  if (loading) return <CircularProgress />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMovie({
      variables: {
        updateMovie: {
          id: movieId,
          title,
          description,
          imageUrl,
        },
      },
    });
    onCancel();
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 4 }}>
      <Typography variant='h4' gutterBottom>
        Update Movie
      </Typography>
      <TextField
        label='Title'
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        fullWidth
        required
        margin='normal'
      />
      <TextField
        label='Description'
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
        fullWidth
        required
        multiline
        rows={6}
        margin='normal'
      />
      <TextField
        label='Image URL'
        value={imageUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImageUrl(e.target.value)
        }
        fullWidth
        required
        margin='normal'
      />
      <Button
        type='submit'
        variant='contained'
        disabled={updating}
        sx={{ mt: 2 }}
      >
        Update
      </Button>
      <Button variant='outlined' onClick={onCancel} sx={{ mt: 2, ml: 2 }}>
        Cancel
      </Button>
    </Box>
  );
}

export default MovieUpdate;
