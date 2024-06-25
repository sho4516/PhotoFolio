import { useEffect, useState } from "react";
import AlbumForm from "../AlbumForm/AlbumForm";
import styles from "./AlbumList.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseinit";
import Album from "../Album/Album";
import ImageList from "../ImageList/ImageList";
import Button from "../Button/Button";
import { ToastContainer } from "react-toastify";
import Spinner from "react-spinner-material";

const AlbumList = () => {
  const [showAlbumForm, setShowAlbumForm] = useState(false);
  const [currentAlbumDetails, setCurrentAlbumDetails] = useState({
    open: false,
    id: "",
    name: "",
  });
  const [albumList, setAlbumList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const unsub = onSnapshot(collection(db, "albums"), (doc) => {
        const res = doc.docs.map((item) => {
          return {
            id: item.id,
            ...item.data(),
          };
        });
        setAlbumList(res);
        setLoading(false);
      });
    }, 1000);
  }, []);

  const handleAlbumClick = (id, name) => {
    setCurrentAlbumDetails({ open: true, id: id, name: name });
  };

  const handleBackClick = () => {
    setCurrentAlbumDetails({ open: false, id: "" });
  };

  return (
    <div className={styles.mainContainer}>
      <ToastContainer />
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
            {loading ? (
              <div className={styles.spinnerContainer}>
                <Spinner
                  size={60}
                  spinnerColor={"#333"}
                  spinnerWidth={2}
                  visible={true}
                />
              </div>
            ) : (
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
            )}
          </div>
        </>
      ) : (
        <ImageList
          handleBackClick={handleBackClick}
          id={currentAlbumDetails.id}
          name={currentAlbumDetails.name}
        />
      )}
    </div>
  );
};

export default AlbumList;
