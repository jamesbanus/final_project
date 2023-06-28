import "./SideBar.scss";

const SideBar = (props) => {
  const { onSearchInput, search } = props;

  return (
    <>
      <div id="sideBar">
        <div>
          <label htmlFor="movie">Search</label>
          <input
            value={search}
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
      </div>
    </>
  );
};

export default SideBar;
