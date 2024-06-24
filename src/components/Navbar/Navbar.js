import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.brandHolder}>
        <div className={styles.brandImageHolder}>
          <img src="logo/logo.png"></img>
        </div>
        <div className={styles.brandNameHolder}>
          <h1>PhotoFolio</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
