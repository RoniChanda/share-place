import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import classes from "./SideDrawer.module.css";

function SideDrawer(props) {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      mountOnEnter
      unmountOnExit
      classNames="slide-in-left" // classNames is in index.css (not in SideDrawer.module.css)
    >
      <aside className={classes["side-drawer"]} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
}

export default SideDrawer;
