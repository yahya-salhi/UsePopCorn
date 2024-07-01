/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import WatchedSummury from "./components/WatchedSummury";
import WatchedList from "./components/WatchedList";
import MoviesList from "./components/MoviesList";
import StartRating from "./StartRating";
import { useMovies } from "./useMovies";
const tempMovieData = [
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
];

export default function App() {
  // moved to custom hook useMovies
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectId, setSelectId] = useState(null);

  const { movies, isLoading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  // useEffect(function () {
  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&S=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);
  function handleSelectMovie(id) {
    setSelectId((selectId) => (selectId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectId(null);
  }
  const handelAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // this hook be customize in useMovies
  // useEffect(
  //   function () {
  //     const controller = new AbortController();
  //     const signal = controller.signal;
  //     async function fetchMovies() {
  //       try {
  //         setIsLoading(true);
  //         setError("");
  //         const res = await fetch(
  //           `http://www.omdbapi.com/?apikey=${KEY}&S=${query}`,
  //           { signal }
  //         );
  //         if (!res.ok) throw new Error("something went wrong");

  //         const data = await res.json();
  //         if (data.Response === "False") throw new Error("Movie not found");

  //         setMovies(data.Search);
  //         setError("");
  //       } catch (err) {
  //         console.error(err.message);
  //         if (err.name !== "AbortError") {
  //           setError(err.message);
  //         }
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     if (query.length < 3) {
  //       setError("");
  //       setMovies([]);
  //       return;
  //     }
  //     handleCloseMovie();
  //     fetchMovies();
  //     //clean up the abort the fetch request
  //     return () => {
  //       controller.abort();
  //     };
  //   },
  //   [query]
  // );

  // some experinece here

  // useEffect(() => {
  //   console.log("After the initial render");
  // }, []);
  // useEffect(() => {
  //   console.log("after evry render");
  // });
  // console.log("during runder");
  // useEffect(() => {
  //   console.log("d");
  // }, [query]);
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* using compostion to make reusable box */}
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErroMessage message={error} />}
        </Box>

        {/* <Box>
          <WatchedSummury watched={watched} />

          <WatchedList watched={watched} />
        </Box> */}
        {/* using element el as props alternative to children */}
        <Box
          el={
            selectId ? (
              <MovieDetails
                selectId={selectId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handelAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSummury watched={watched} />
                <WatchedList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )
          }
        />
      </Main>
    </>
  );
}
function Loading() {
  return (
    <>
      <p className="loader">is loading...</p>
    </>
  );
}
function ErroMessage({ message }) {
  return (
    <p className="error">
      <span>😘</span>
      {message}
    </p>
  );
}

function MovieDetails({ selectId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWtached = watched.map((movie) => movie.imdbID).includes(selectId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectId
  )?.userRating;

  const countRef = useRef(0);
  let count = 0; // if we use variable count instead of userfe the count stil always 1 so useref is the correct
  useEffect(() => {
    if (userRating) countRef.current += 1;
    if (userRating) count++;
  }, [userRating, count]);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecision: countRef.current,
      count,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie |${title}`;
    return () => {
      document.title = "usePopCorn";
    };
  }, [title]);

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("closing");
        }
      }
      document.addEventListener("keydown", callback);
      return () => {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie]
  );
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`poster of the ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>{released}&bull;</p>
          <span>{runtime}</span>
          <p>{genre}</p>
          <p>
            <span>✨</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <p>
          <em>{plot}</em>
        </p>
        <p> Starring {actors}</p>
        <p>directed by {director}</p>
      </section>

      <div className="rating">
        {!isWtached ? (
          <>
            <StartRating maxRating={10} size={24} onsetRating={setUserRating} />
            {userRating > 0 && (
              <button className="btn-add" onClick={handleAdd}>
                + add to list
              </button>
            )}
          </>
        ) : (
          <StartRating
            maxRating={watchedUserRating}
            size={24}
            defaultRating={watchedUserRating}
          />
        )}
      </div>
    </div>
  );
}
