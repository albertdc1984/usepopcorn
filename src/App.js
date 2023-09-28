import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
//import StarRating from "./components/StarRating";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Search from "./components/Search";

/* const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
]; */

const KEY = "34db19ce";
const tempQuery = "clockwork orange";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState(tempQuery);
  //const [movieRating, setMovieRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchMovies() {
    try {
      setIsLoading(true);
      setError("");
      const res = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
      );
      if (!res.ok) throw new Error("Something went wrog with fetching movies");

      const data = await res.json();

      if (data.Response === "False") throw new Error("Movie not found");

      setMovies(data.Search);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (query.length < 2) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} setMovies={setMovies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} setWatched={setWatched} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            <WatchedSummary watched={watched} />

            <WatchedMoviesList watched={watched} />
          </>
        </Box>
        {/*>div className="rating" style={{ width: "100vw" }}>
          <StarRating
            maxRating={5}
            messages={["Terrible", "Bad", "Okay", "Good", "Masterpiece"]}
            defaultRating={3}
            onSetRating={setMovieRating}
            movieRating={movieRating}
          />
        </div>
         <Box
            element={
              <>
                <WatchedSummary watched={watched} />

                <WatchedMoviesList watched={watched} />
              </>
            }
          />         
          
          
          */}
      </Main>
    </>
  );
}
