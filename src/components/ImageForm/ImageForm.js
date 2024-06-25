import { useEffect, useRef } from "react";
import TextButton from "../TextButton/TextButton";
import styles from "./ImageForm.module.css";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";

const ImageForm = ({
  albumName,
  albumId,
  imageFormProps,
  setImageFormProps,
}) => {
  const titleRef = useRef();
  const urlRef = useRef();

  useEffect(() => {
    titleRef.current.value = imageFormProps.imageName;
    urlRef.current.value = imageFormProps.imageUrl;
    titleRef.current.focus();
  }, [imageFormProps]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const url = urlRef.current.value;
    const data = {
      name: title,
      url: url,
    };

    if (!imageFormProps.isUpdate) {
      await addDoc(collection(db, "albums", albumId, "images"), data);
    } else {
      const imageRef = doc(
        db,
        "albums",
        albumId,
        "images",
        imageFormProps.imageId
      );
      await updateDoc(imageRef, data);
      setImageFormProps((prev) => {
        let props = { ...prev };
        props.showImageForm = false;
        return props;
      });
    }

    titleRef.current.value = "";
    urlRef.current.value = "";
    titleRef.current.focus();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeading}>
        <h1>Add Images to {albumName}</h1>
      </div>
      <div className={styles.form}>
        <input ref={titleRef} type="text" placeholder="Title"></input>
        <input ref={urlRef} type="text" placeholder="Image URL"></input>
        <div className={styles.buttonContainer}>
          <TextButton color="#ff1300" text="Clear" />
          <TextButton
            onClick={handleSubmit}
            color="#0277ff"
            text={imageFormProps.isUpdate ? "Update" : "Add"}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
