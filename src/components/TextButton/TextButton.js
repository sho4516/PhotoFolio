import styles from "./TextButton.module.css";

const TextButton = ({ color, text, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
};

export default TextButton;
