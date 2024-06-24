import styles from './Button.module.css';

const Button = ({
  onClick,
  isVisible,
  textWhenVisible,
  textWhenNotVisible,
  classWhenVisible,
  classWhenNotVisible
}) => {
    return <button onClick={onClick} className={`${styles.button} ${isVisible?styles[classWhenVisible]:styles[classWhenNotVisible]}`}>
        {isVisible?textWhenVisible:textWhenNotVisible}
    </button>
};

export default Button;
