import "./SideBar.scss";

const SideBar = (props) => {
  const { onSearchInput, search, screenMode, changeScreen } = props;

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
                type="text"
                name="movie"
                id="movieSearch"
              />
            </div>
            <div>
              <h1>option2</h1>
            </div>
            <div>
              <h1>option3</h1>
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
