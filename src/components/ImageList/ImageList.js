import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseinit";
import styles from "./ImageList.module.css";
import Button from "../Button/Button";
import ImageForm from "../ImageForm/ImageForm";

const ImageList = ({ id, name, handleBackClick }) => {
  const [images, setImages] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [showImageForm, setShowImageForm] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "albums", id), (doc) => {
      const res = doc.data();
      console.log(res);
      setImages(res.images);
    });
  }, []);

  return (
    <>
      {showImageForm && <ImageForm name={name} id={id} />}
      <div className={styles.imageListContainer}>
        <div className={styles.imageListContainerHeading}>
          <div>
            <button onClick={handleBackClick} className={styles.backButton}>
              <img src="back.png"></img>
            </button>
          </div>
          {images.length === 0 ? (
            <div className={styles.noImagesPresent}>
              <h1>No Images found in the album</h1>
            </div>
          ) : (
            <div className={styles.imagesPresent}>
              <h1>Images of {name}</h1>
              <div className={styles.searchComponent}>
                {!showSearch && (
                  <input type="text" placeholder="Search..."></input>
                )}
                <img
                  onClick={() => setShowSearch(!showSearch)}
                  src={showSearch ? "search.png" : "clear.png"}
                ></img>
              </div>
            </div>
          )}
          <div>
            <Button
              onClick={() => setShowImageForm(!showImageForm)}
              isVisible={showImageForm}
              textWhenVisible="Cancel"
              textWhenNotVisible="Add Image"
              classWhenVisible="btnCancel"
              classWhenNotVisible="btnAdd"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageList;
