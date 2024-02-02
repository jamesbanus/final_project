import Movie from "./Movie";
import Nav from "./Nav";
import SideBar from "./SideBar";
import Controls from "./Controls";
import SingleMovie from "./SingleMovie";
import Favourites from "./Favourites";
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
import { closeModal, closeLogin, selectLoginOpen } from "../modalSlice";

const Interface = (props) => {
  const {
    movies,
    onPageNext,
    onPageBack,
    onPageReset,
    page,
    onSearchInput,
    search,
    totalPages,
    genreApiList,
    ratingsData,
  } = props;

  const screenMode = useSelector(selectScreen);
  const id = useSelector(selectID);
  const isLoginOpen = useSelector(selectLoginOpen);

  const dispatch = useDispatch();

  const changeScreen = (e) => {
    if (e.target.id) {
      dispatch(setID(e.target.id));
    } else if (e.target.innerHTML === "Favourites") {
      dispatch(setScreenMode(2));
    } else {
      dispatch(setScreenMode(0));
      dispatch(clearCert());
      dispatch(clearMovie());
      dispatch(closeModal());
      dispatch(closeLogin());
    }
  };

  return (
    <>
      <Nav changeScreen={changeScreen} />
      <div id="sideAndMain">
        <SideBar
          onSearchInput={onSearchInput}
          search={search}
          screenMode={screenMode}
          changeScreen={changeScreen}
          genreApiList={genreApiList}
        />
        <div
          id="mainContent"
          style={isLoginOpen ? { opacity: 0.2 } : { opacity: 1 }}
        >
          {screenMode === 0 && (
            <>
              <Movie
                movies={movies}
                changeScreen={changeScreen}
                ratingsData={ratingsData}
              />
              <Controls
                onPageNext={onPageNext}
                onPageBack={onPageBack}
                onPageReset={onPageReset}
                page={page}
                totalPages={totalPages}
              />
            </>
          )}
          {screenMode === 1 && (
            <>
              <SingleMovie
                changeScreen={changeScreen}
                id={id}
                ratingsData={ratingsData}
              />
            </>
          )}
          {screenMode === 2 && (
            <>
              <Favourites
                changeScreen={changeScreen}
                ratingsData={ratingsData}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Interface;
