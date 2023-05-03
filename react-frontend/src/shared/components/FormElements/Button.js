import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = (props) => {
  const buttonClasses = `${classes.button}
  ${classes["button--" + (props.size || "default")]} ${
    props.inverse && classes["button--inverse"]
  } ${props.danger && classes["button--danger"]}`;

  if (props.href) {
    return (
      <a className={buttonClasses} href={props.href}>
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link to={props.to} exact={props.exact} className={buttonClasses}>
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={buttonClasses}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
