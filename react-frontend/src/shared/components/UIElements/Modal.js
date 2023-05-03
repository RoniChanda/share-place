import { Fragment } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

import classes from "./Modal.module.css";

const ModalOverlay = (props) => {
  const content = (
    <div className={`${classes.modal} ${props.className}`} style={props.style}>
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`${classes["modal__content"]} ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`${classes["modal__footer"]} ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

function Modal(props) {
  return (
    <Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: classes["modal-enter"],
          enterActive: classes["modal-enter-active"],
          exit: classes["modal-exit"],
          exitActive: classes["modal-exit-active"],
        }}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
}

export default Modal;
