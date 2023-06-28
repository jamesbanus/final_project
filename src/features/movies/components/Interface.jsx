import Movie from "./Movie";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Controls from "./Controls";
import "./Interface.scss";

const Interface = (props) => {
  const { movies, onPageNext, onPageBack, onPageReset, page } = props;

  return (
    <>
      <Nav />
      <div id="sideAndMain">
        <SideBar />
        <div id="mainContent">
          <h1 className="subHeading">Popular</h1>
          <div id="popularMovies">
            {movies?.results.map((item) => {
              return (
                <Movie
                  title={item.title}
                  key={item.id}
                  poster_path={item.poster_path}
                />
              );
            })}
          </div>
          <Controls
            onPageNext={onPageNext}
            onPageBack={onPageBack}
            onPageReset={onPageReset}
            page={page}
          />
        </div>
      </div>
    </>
  );
};

export default Interface;
