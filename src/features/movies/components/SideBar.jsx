import "./SideBar.scss";
import { selectGenres, setCheckedGenres } from "../moviesSlice";
import { setOpen, selectToggle } from "../controlsSlice";
import { useDispatch, useSelector } from "react-redux";

const SideBar = (props) => {
  const { onSearchInput, search, screenMode, changeScreen, genreApiList } =
    props;

  const dispatch = useDispatch();

  const genreChecked = useSelector(selectGenres);
  // const toggle = useSelector(selectToggle);

  const isChecked = (id) => {
    const indexOf = genreChecked?.indexOf(id);
    if (indexOf === -1 || indexOf === undefined || id === -1) {
      return false;
    } else {
      return true;
    }
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

  // const showCollapsible = (
  //   <button onClick={() => dispatch(setOpen)} className="showCollapsible">
  //     Genres ▽{" "}
  //   </button>
  // );

  // const hideCollapsible = (
  //   <button onClick={() => dispatch(setOpen)} className="hideCollapsible">
  //     Genres △{" "}
  //   </button>
  // );

  // console.log(toggle);
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
            {/* <div id="showCollapsible">{!toggle && showCollapsible}</div>
            <div id="hideCollapsible">{toggle && hideCollapsible}</div> */}

            <div className="checkBoxDiv">{checkBoxes}</div>
            {/* <label className="clearCheckBox">
                <button onClick={clearChecked}>Clear</button>
              </label> */}
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
