import "./Movie.scss";

const Movie = (props) => {
  const { movies, changeScreen } = props;

  const obj = movies?.results;

  const newArray = obj?.filter((el) => {
    return el.poster_path !== null && el.backdrop_path !== null;
  });

  console.log(newArray);

  return (
    <>
      {newArray?.map((item) => {
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
