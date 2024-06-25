import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebaseinit";
import styles from "./ImageList.module.css";
import Button from "../Button/Button";
import ImageForm from "../ImageForm/ImageForm";
import { deleteDoc } from "firebase/firestore";
import Carousel from "../Carousel/Carousel";
import { toast } from "react-toastify";
import Spinner from "react-spinner-material";

const ImageList = ({ id, name, handleBackClick }) => {
  const [images, setImages] = useState([]);
  const [showSearch, setShowSearch] = useState(true);
  const [imageFormProps, setImageFormProps] = useState({
    showImageForm: false,
    isUpdate: false,
    imageId: "",
    imageName: "",
    imageUrl: "",
  });
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Added dummy timeout to showcase spinner
    setTimeout(() => {
      const unsub = onSnapshot(
        collection(db, "albums", id, "images"),
        (snapshot) => {
          const images = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setImages(images);
          setFilteredImages(images);
          setLoading(false);
        }
      );
    }, 1000);

    //return () => unsub();
  }, [id]);

  const handleEditClick = (image, e) => {
    e.stopPropagation();
    setImageFormProps({
      showImageForm: true,
      isUpdate: true,
      imageId: image.id,
      imageName: image.name,
      imageUrl: image.url,
    });
  };

  const handleDeleteClick = async (imageId, e) => {
    e.stopPropagation();
    try {
      const imageRef = doc(db, "albums", id, "images", imageId);
      await deleteDoc(imageRef);
      console.log(`Image with ID: ${imageId} deleted successfully`);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleCloseCarousel = () => {
    setIsCarouselOpen(false);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
    setImageFormProps((prev) => {
      let props = { ...prev };
      props.showImageForm = false;
      return props;
    });
  };

  return (
    <>
      {imageFormProps.showImageForm && (
        <ImageForm
          albumName={name}
          albumId={id}
          imageFormProps={imageFormProps}
          setImageFormProps={setImageFormProps}
        />
      )}
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
                  <input
                    ref={searchInputRef}
                    value={filterText}
                    onChange={(e) => {
                      setFilterText(e.target.value);
                      let filteredImages = images.filter((item) => {
                        return item.name
                          .toUpperCase()
                          .includes(e.target.value.toLocaleUpperCase());
                      });
                      setFilteredImages(filteredImages);
                    }}
                    type="text"
                    placeholder="Search..."
                  ></input>
                )}
                <img
                  onClick={() => {
                    setShowSearch(!showSearch);
                    setFilterText("");
                    setFilteredImages(images);
                    if (showSearch) {
                      setTimeout(() => {
                        searchInputRef.current.focus();
                      }, 500);
                    }
                  }}
                  src={showSearch ? "search.png" : "clear.png"}
                ></img>
              </div>
            </div>
          )}
          <div>
            <Button
              onClick={() => {
                setImageFormProps((prev) => {
                  let props = { ...prev };
                  props.showImageForm = !props.showImageForm;
                  props.isUpdate = false;
                  props.imageId = "";
                  props.imageName = "";
                  props.imageUrl = "";
                  return props;
                });
              }}
              isVisible={imageFormProps.showImageForm}
              textWhenVisible="Cancel"
              textWhenNotVisible="Add Image"
              classWhenVisible="btnCancel"
              classWhenNotVisible="btnAdd"
            />
          </div>
        </div>
        {loading && (
          <div className={styles.spinnerContainer}>
            <Spinner
              size={60}
              spinnerColor={"#333"}
              spinnerWidth={2}
              visible={true}
            />
          </div>
        )}
        {images.length > 0 && !loading && (
          <div className={styles.imageContainer}>
            {filteredImages.map((image, index) => {
              return (
                <div
                  onClick={() => {
                    handleImageClick(index);
                  }}
                  className={styles.imageHolder}
                >
                  <img
                    src={image.url}
                    key={image.id}
                    className={styles.image}
                  />
                  <div className={styles.imageNameHolder}>
                    <h3>{image.name}</h3>
                  </div>
                  <div className={styles.updateBox}>
                    <div
                      onClick={(e) => {
                        handleEditClick(image, e);
                      }}
                      className={styles.updateBoxImageHolder}
                    >
                      <img src="edit.png" alt="edit"></img>
                    </div>
                    <div
                      onClick={(e) => {
                        handleDeleteClick(image.id, e);
                      }}
                      className={styles.updateBoxImageHolder}
                    >
                      <img src="trash-bin.png" alt="delete"></img>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {isCarouselOpen && (
          <Carousel
            handleCloseCarousel={handleCloseCarousel}
            currentImageIndex={currentImageIndex}
            images={images}
          />
        )}
      </div>
    </>
  );
};

export default ImageList;
