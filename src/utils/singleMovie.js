// create empty object to store stripped out certification results

const certificateResults = {};

// loop through each country of the results, and then through the inner results. If there is a certificate add it to the above object

const certificateResult = (cert) => {
  for (let index = 0; index < cert?.length; index++) {
    const element = cert[index];
    const country = element.iso_3166_1;
    for (let index = 0; index < element?.release_dates.length; index++) {
      const innerElement = element.release_dates[index];
      if (innerElement.certification) {
        certificateResults[country] = innerElement.certification;
      }
    }
  }
};

// if our object has an age rating for GB, use that. If not then US, and if not then the first one.

const getAge = (cert) => {
  certificateResult(cert);
  if (certificateResults["GB"]) {
    return certificateResults["GB"];
  }
  if (certificateResults["US"]) {
    return certificateResults["US"];
  }
  const array = Object.values(certificateResults);
  return array[0];
};

// Find the release date year

const releaseDate = (movie) => {
  return new Date(movie?.release_date).getFullYear();
};

// Calculate movie runtime in hours and minutes

const hours = (movie) => {
  const runTime = movie?.runtime;
  const hours = Math.floor(runTime / 60);
  return hours;
};

const minutes = (movie) => {
  const runTime = movie?.runtime;
  const minutes = runTime % 60;
  return minutes;
};

// Create empty array to store the genres, n will be the index

// loop over the movie data and store each genre

// convert array to string

const genres = (movie) => {
  const genresResults = [];
  let n = 0;
  for (let index = 0; index < movie?.genres.length; index++) {
    const element = movie.genres[index];
    if (element.name) {
      genresResults[n] = element.name;
      n++;
    }
  }
  return genresResults.join(", ");
};

const trailerKey = (videos) => {
  const videosResults = {};
  for (let index = 0; index < videos?.length; index++) {
    const element = videos[index];
    const videoName = element.name;
    if (element.key) {
      videosResults[videoName] = element.key;
    }
  }
  if (videosResults["Official Trailer"]) {
    return videosResults["Official Trailer"];
  }
  if (videosResults["Main Trailer"]) {
    return videosResults["Main Trailer"];
  }
  if (videosResults["Teaser Trailer"]) {
    return videosResults["Teaser Trailer"];
  }
  const keys = Object.keys(videosResults);
  const indexof = keys.findIndex((item) => item.includes("Trailer"));
  if (indexof !== -1) {
    return videosResults[keys[indexof]];
  }
  return null;
};

export { getAge, releaseDate, hours, minutes, genres, trailerKey };
