import { useEffect, useRef } from "react";
import styles from "./AlbumForm.module.css";
import { db } from "../../firebaseinit";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AlbumForm = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const clearForm = () => {
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  const handleAdd = () => {
    async function handle() {
      const docRef = await addDoc(collection(db, "albums"), {
        albumName: inputRef.current.value,
      });
      toast.success("Album added successfully");
      const albumId = docRef.id;
    }

    handle();
    clearForm();
  };

  return (
    <div className={styles.albumFormContainer}>
      <div className={styles.albumFormHeading}>
        <div>Create an album</div>
      </div>
      <div className={styles.albumForm}>
        <input type="text" ref={inputRef} placeholder="Album Name"></input>
        <button className={styles.clear} onClick={clearForm}>
          Clear
        </button>
        <button onClick={handleAdd} className={styles.create}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AlbumForm;
