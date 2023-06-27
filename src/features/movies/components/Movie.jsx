import "./Movie.scss";

const Movie = (props) => {
  const { title, poster_path } = props;

  return (
    <>
      <div className="movie">
        <img
          className="moviePoster"
          src={`https://image.tmdb.org/t/p/w185${poster_path}`}
          alt={title}
        />
        <h1 className="movieTitle">{title}</h1>
      </div>
    </>
  );
};

export default Movie;
