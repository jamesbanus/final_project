import "./RecMovies.scss";

const RecMovies = (props) => {
  const { recommendations, changeScreen } = props;

  const obj = recommendations?.results;

  const newArray = obj?.filter((el) => {
    return el.poster_path !== null && el.backdrop_path !== null;
  });

  if (newArray?.length === 0) {
    return (
      <>
        <div id="relFilmHeading">
          <p>Sorry, no recommendations!</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="relFilmHeading">
          <p>Other recommendations</p>
        </div>
        <div className="relatedFilmsDiv">
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
        </div>
      </>
    );
  }
};

export default RecMovies;
