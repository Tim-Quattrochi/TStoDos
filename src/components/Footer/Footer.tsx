import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made by Tim Quattrochi{" "}
      <a
        rel="noopener"
        target="_blank"
        href="https://github.com/Tim-Quattrochi"
      >
        Github
      </a>
    </footer>
  );
};
export default Footer;
