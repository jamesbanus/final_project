import "./SideBar.scss";
import { selectGenres, setCheckedGenres } from "../moviesSlice";
import { useDispatch, useSelector } from "react-redux";

const SideBar = (props) => {
  const { onSearchInput, search, screenMode, changeScreen, genreApiList } =
    props;

  const dispatch = useDispatch();

  const genreChecked = useSelector(selectGenres);

  console.log(genreChecked);

  const isChecked = (id) => {
    const indexOf = genreChecked?.indexOf(id);
    if (indexOf === -1 || indexOf === undefined || id === -1) {
      return false;
    } else {
      return true;
    }
  };

  // const genre = useSelector(selectGenres);

  const genreArray = genreApiList?.genres;

  const checkBoxes = genreArray?.map((item) => (
    <label key={item.id}>
      {item.name}
      <input
        writable="true"
        type="checkbox"
        className="checkBox"
        onChange={() => {
          dispatch(setCheckedGenres(item.id));
        }}
        checked={isChecked(item.id) || false}
      />
    </label>
  ));

  return (
    <>
      <div id="sideBar">
        {screenMode === 0 && (
          <>
            <div>
              <label htmlFor="movie">Search</label>
              <input
                value={search || ""}
                onInput={onSearchInput}
                type="search"
                name="movie"
                id="movieSearch"
              />
              {checkBoxes}
              <label className="clearCheckBox">
                {/* <button onClick={clearChecked}>Clear</button> */}
              </label>
            </div>
          </>
        )}
        {screenMode === 1 && (
          <>
            <div id="backButtonDiv">
              <button className="backButton" onClick={changeScreen}>
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SideBar;
