import React, { useState, useRef } from "react";

// Components
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";

// Style
import classes from "./AddUser.module.css";

// Helpers
import Wrapper from "../../Helpers/Wrapper";

const AddUser = (props) => {
  // useRef Hooks
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  // initial value undefined => no need to pass any other initial value here
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    // making sure enteredAge is a number with +enteredAge (not needed here as the input field type is already set as 'number', but good to know)
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }
    // lifting state up to App.js as it has the UsersList component that I want to add the enteredUsername and enteredAge to as a new user
    props.onAddUser(enteredName, enteredUserAge);

    // Not a recommended approach to use useRef to manipulate the DOM, just showing an alternative approach to useState
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          {/* uncontrolled component by React, only fetched by react. Then using regular DOM api to set the input in a DOM node (internal state not controlled by React) */}
          <input id='username' type='text' ref={nameInputRef} />
          <label htmlFor='age'>Age (years)</label>
          {/* uncontrolled component by React, only fetched by react. Then using regular DOM api to set the input in a DOM node (internal state not controlled by React) */}
          <input id='age' type='number' ref={ageInputRef} />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
