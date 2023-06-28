import "./Controls.scss";

const Controls = (props) => {
  const { onPageBack, onPageNext, onPageReset, page } = props;

  if (page === 1) {
    return (
      <>
        <div id="nextPreviousButton">
          <div className="button">
            <button onClick={onPageNext} id="nextPage">
              Next
            </button>
          </div>
        </div>
      </>
    );
  } else if (page === 500) {
    return (
      <>
        <div id="nextPreviousButton">
          <div className="button">
            <button onClick={onPageBack} id="previousPage">
              Back
            </button>
          </div>
          <div className="button">
            <button onClick={onPageReset} id="resetPage">
              Reset
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="nextPreviousButton">
          <div className="button">
            <button onClick={onPageBack} id="previousPage">
              Back
            </button>
          </div>
          <div className="button">
            <button onClick={onPageNext} id="nextPage">
              Next
            </button>
          </div>
          <div className="button">
            <button onClick={onPageReset} id="resetPage">
              Reset
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default Controls;
