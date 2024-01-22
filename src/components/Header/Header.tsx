import headerStyles from "./Header.module.css";

const Header = () => {
  return (
    <header className={headerStyles.headerContainer}>
      <h1 className={headerStyles.headerTitle}>Hi There!</h1>
    </header>
  );
};

export default Header;
