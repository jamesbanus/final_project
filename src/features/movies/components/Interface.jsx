import Movie from "./Movie";
import Nav from "./Nav";
import SideBar from "./SideBar";
import "./Interface.scss";

const Interface = (props) => {
  const { movies } = props;

  return (
    <>
      <Nav />
      <div id="sideAndMain">
        <SideBar />
        <div id="mainContent">
          <h1 className="subHeading">Popular</h1>
          <div id="popularMovies">
            {movies?.map((item) => {
              return (
                <Movie
                  title={item.title}
                  key={item.id}
                  poster_path={item.poster_path}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Interface;
