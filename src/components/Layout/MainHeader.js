
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes.header}>
      <div>
        <h1>Patient Info</h1>
        <h3 style={{color: "grey"}}>Waiting Room / Patient Info</h3>
      </div>
    </header>
  );
};

export default MainHeader;
