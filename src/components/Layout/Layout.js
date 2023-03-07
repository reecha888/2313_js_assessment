import { Fragment } from "react";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <hr
        style={{
          background: "#CCCCCC",
          margin: "0 0% 0 10%",
          height: "2px",
          border: "none",
        }}
      />
      <hr
        style={{
          background: "#FAF9F6",
          margin: "20px 0px 0px 10%",
          height: "2px",
          border: "none",
        }}
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
