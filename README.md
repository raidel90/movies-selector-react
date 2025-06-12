# Project description

I have a an object:

Movie
ID, 
Name,
Description,
ImageURL

There's a graphql server that has the following:
Query
GetMovie(movieId: number)
getAllMovies()

Mutation
updateMovie(updatedMove: Movie)

Can you whip up the required react components to display
1. A drop down of the available movies. 
2. When the user selects a move, the movie title, description and image are displayed. 
3. The user can change the movie title and description, and save it to the graphQL server.

# How to run


```bash
npm install
npm run dev
```

> [!info]
> The API endpoints are not functional, It was made to showcase the React App
