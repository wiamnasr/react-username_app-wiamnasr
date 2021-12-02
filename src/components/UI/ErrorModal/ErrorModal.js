import React from "react";
import ReactDOM from "react-dom";

// Style
import classes from "./ErrorModal.module.css";

// Style Components
import Card from "../Card/Card";

// Components
import Button from "../Button/Button";

// Splitting Backdrop and ErrorModal, that makes working with Portals much easier

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm}></div>;
};

const ModalOverlay = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {/* 
        createPortal, takes 2 arguments, first is react node that should be rendered (backdrop in this case), has to be jsx
        second argument is a pointer to that container in the real dom where this element should be rendered to

       */}
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
