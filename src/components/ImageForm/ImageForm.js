import { useEffect, useRef } from "react";
import TextButton from "../TextButton/TextButton";
import styles from "./ImageForm.module.css";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseinit";

const ImageForm = ({ name, id }) => {
  const titleRef = useRef();
  const urlRef = useRef();

  useEffect(()=>{
    titleRef.current.focus();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const url = urlRef.current.value;
    const data = {
      name: title,
      url: url,
    };

    const albumRef = doc(db, "albums", id);
    await updateDoc(albumRef, {
      images: arrayUnion(data),
    });

    titleRef.current.value="";
    urlRef.current.value="";
    titleRef.current.focus();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeading}>
        <h1>Add Images to {name}</h1>
      </div>
      <div className={styles.form}>
        <input ref={titleRef} type="text" placeholder="Title"></input>
        <input ref={urlRef} type="text" placeholder="Image URL"></input>
        <div className={styles.buttonContainer}>
          <TextButton color="#ff1300" text="Clear" />
          <TextButton onClick={handleSubmit} color="#0277ff" text="Add" />
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
