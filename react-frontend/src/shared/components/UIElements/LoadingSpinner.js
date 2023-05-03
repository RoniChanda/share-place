import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = (props) => {
  return (
    <div
      className={`${props.asOverlay && classes["loading-spinner__overlay"]}`}
    >
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
