import "./Controls.scss";

const Controls = (props) => {
  const { onPageBack, onPageNext, onPageReset, page } = props;

  if (page === 1) {
    return (
      <>
        <div id="nextPreviousButton">
          <button onClick={onPageNext} id="nextPage">
            Next
          </button>
        </div>
      </>
    );
  } else if (page === 500) {
    return (
      <>
        <div id="nextPreviousButton">
          <button onClick={onPageBack} id="previousPage">
            Back
          </button>
          <button onClick={onPageNext} id="nextPage">
            Next
          </button>
          <button onClick={onPageReset} id="resetPage">
            Reset
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id="nextPreviousButton">
          <button onClick={onPageBack} id="previousPage">
            Back
          </button>
          <button onClick={onPageNext} id="nextPage">
            Next
          </button>
          <button onClick={onPageReset} id="resetPage">
            Reset
          </button>
        </div>
      </>
    );
  }
};

export default Controls;
