import "./Movie.scss";

const Movie = (props) => {
  const { movies, changeScreen } = props;

  return (
    <>
      {movies?.results.map((item) => {
        return (
          <div className="movie" key={item.id}>
            <img
              className="moviePoster"
              src={`https://image.tmdb.org/t/p/w780${item.poster_path}`}
              alt={item.title}
              id={item.id}
              onClick={changeScreen}
            />
            <h1 className="movieTitle">{item.title}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Movie;
