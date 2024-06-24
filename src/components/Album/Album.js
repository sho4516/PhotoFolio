import styles from "./Album.module.css";

const Album = ({ albumDetails, handleAlbumClick }) => {
  const id = albumDetails.id;
  return (
    <div
      onClick={() => {
        handleAlbumClick(id);
      }}
      className={styles.albumBox}
    >
      <div className={styles.albumImageHolder}>
        <img src="logo/albumlogo.png"></img>
      </div>
      <div className={styles.albumNameHolder}>
        <h3>{albumDetails.albumName}</h3>
      </div>
    </div>
  );
};

export default Album;
