import { useEffect, useState } from "react";
import AlbumForm from "../AlbumForm/AlbumForm";
import styles from "./AlbumList.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseinit";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";
import Button from "../Button/Button";

const AlbumList = () => {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [currentAlbumDetails, setCurrentAlbumDetails] = useState({
    open: false,
    id: "",
  });
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "albums"), (doc) => {
      const res = doc.docs.map((item) => {
        return {
          id: item.id,
          ...item.data(),
        };
      });
      setAlbumList(res);
    });
  }, []);

  const handleAlbumClick = (id) => {
    setCurrentAlbumDetails({ open: true, id: id });
  };

  const handleBackClick = () => {
    setCurrentAlbumDetails({ open: false, id: "" });
  };

  return (
    <div className={styles.mainContainer}>
      {!currentAlbumDetails.open ? (
        <>
          {showAlbumForm && <AlbumForm />}
          <div className={styles.albumListContainer}>
            <div className={styles.albumListContainerHeading}>
              <div className={styles.albumListContainerHeadingText}>
                <h1>Your Albums</h1>
              </div>
              <div>
                <Button
                  onClick={() => setShowAlbumForm(!showAlbumForm)}
                  isVisible={showAlbumForm}
                  textWhenVisible="Cancel"
                  textWhenNotVisible="Add Album"
                  classWhenVisible="btnCancel"
                  classWhenNotVisible="btnAdd"
                />
              </div>
            </div>
            <div className={styles.albumList}>
              {albumList.map((item) => {
                return (
                  <Album
                    handleAlbumClick={handleAlbumClick}
                    albumDetails={item}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <ImageList handleBackClick={handleBackClick} id={currentAlbumDetails.id}/>
      )}
    </div>
  );
};

export default AlbumList;