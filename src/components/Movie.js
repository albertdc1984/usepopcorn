export default function Movie({ movie, onSelectedId }) {
  const { Title: title, Year: year, Poster: poster } = movie;
  return (
    <li onClick={() => onSelectedId(movie.imdbID)}>
      <img src={poster} alt={`${title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
}
