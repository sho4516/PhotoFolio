import styles from "./Album.module.css";

// The Album component is a functional component that renders an album tile with album details
const Album = ({ albumDetails, handleAlbumClick }) => {
  // Extracting id and albumName from albumDetails prop
  const id = albumDetails.id;
  const name = albumDetails.albumName;

  return (
    // A div that handles album click events, calling handleAlbumClick with the album id and name
    <div
      onClick={() => {
        handleAlbumClick(id, name);
      }}
      className={styles.albumBox}
    >
      {/* A container for the album image */}
      <div className={styles.albumImageHolder}>
        {/* An img element displaying a static logo for the album */}
        <img src="logo/albumlogo.png" alt={`${name} logo`} />
      </div>
      {/* A container for the album name */}
      <div className={styles.albumNameHolder}>
        {/* Displaying the album name */}
        <h3>{albumDetails.albumName}</h3>
      </div>
    </div>
  );
};

// Exporting the Album component as the default export
export default Album;
