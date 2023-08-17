import "./SideBar.scss";
import {
  selectCheckedGenreArray,
  setCheckedGenres,
  setClearCheck,
} from "../moviesSlice";
import { setToggle, selectToggle } from "../controlsSlice";
import { useDispatch, useSelector } from "react-redux";

const SideBar = (props) => {
  const { onSearchInput, search, screenMode, changeScreen, genreApiList } =
    props;

  const dispatch = useDispatch();

  const checkedGenreArray = useSelector(selectCheckedGenreArray);
  const toggle = useSelector(selectToggle);

  const isChecked = (id) => {
    return checkedGenreArray.includes(id);
  };

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

  const showCollapsible = (
    <div id="showCollapsible">
      <button onClick={() => dispatch(setToggle())} className="showCollapsible">
        Genres ▽{" "}
      </button>
    </div>
  );

  const hideCollapsible = (
    <div id="hideCollapsible">
      <button onClick={() => dispatch(setToggle())} className="hideCollapsible">
        Genres △{" "}
      </button>
      <div className="checkBoxDiv">{checkBoxes}</div>
    </div>
  );

  console.log(toggle);
  return (
    <>
      <div id="sideBar">
        {screenMode === 0 && (
          <>
            <div className="searchBoxDiv">
              <label htmlFor="movie" id="searchLabel">
                Search
              </label>

              <input
                value={search || ""}
                onInput={onSearchInput}
                type="search"
                name="movie"
                id="movieSearch"
              />
            </div>
            {!toggle ? showCollapsible : hideCollapsible}

            <label className="clearCheckBox">
              <button onClick={() => dispatch(setClearCheck())}>Clear</button>
            </label>
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
