import Movie from "./Movie";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Controls from "./Controls";
import SingleMovie from "./SingleMovie";
import "./Interface.scss";
import {
  setScreenMode,
  selectScreen,
  setID,
  selectID,
  clearCert,
  clearMovie,
} from "../moviesSlice";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../modalSlice";

const Interface = (props) => {
  const { movies, onPageNext, onPageBack, onPageReset, page } = props;

  const screenMode = useSelector(selectScreen);
  const id = useSelector(selectID);

  const dispatch = useDispatch();

  const changeScreen = (e) => {
    if (e.target.id) {
      dispatch(setID(e.target.id));
    } else {
      dispatch(setScreenMode(0));
      dispatch(clearCert());
      dispatch(clearMovie());
      dispatch(closeModal());
      console.log(id);
    }
  };

  return (
    <>
      <Nav />
      <div id="sideAndMain">
        <SideBar />
        <div id="mainContent">
          {screenMode === 0 && (
            <>
              <h1 className="subHeading">Popular</h1>
              <div id="popularMovies">
                <Movie movies={movies} changeScreen={changeScreen} />
              </div>
              <Controls
                onPageNext={onPageNext}
                onPageBack={onPageBack}
                onPageReset={onPageReset}
                page={page}
              />
            </>
          )}
          {screenMode === 1 && (
            <>
              <SingleMovie changeScreen={changeScreen} id={id} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Interface;
