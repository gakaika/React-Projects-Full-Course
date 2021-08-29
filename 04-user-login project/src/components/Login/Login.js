import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';
import AuthContext from '../../store/auth-context';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const emailReducer = (prevState, action) => {
  if (action.type === "USER_INPUT") {
    // updates both the value and isValid as we have this data now
    return {value: action.val, isValid: action.val.includes("@")}
  }
  else if(action.type === "INPUT_BLUR"){
    return {value: prevState.value, isValid: prevState.value.includes("@")};
  }
  else {
    // default state for any other action (in case)
    return {value: "", isValid: false};
  }
};

const passwordReducer = (prevState, action) => {
  if(action.type === "USER_INPUT"){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  else if(action.type === "INPUT_BLUR"){
    return {value: prevState.value, isValid: prevState.value.trim().length > 6}
  }
  else {
    return {value: "", isValid: false};
  }
}

const Login = () => {
  const authCtx = useContext(AuthContext);
  
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: "", isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: "", isValid: null});
  
  useEffect(() => {
    // wait 500ms before checking form validity
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
    }, 500);

    // useEffect cleanup function 
    return () => {
      clearTimeout(identifier);
    };

    // note: passing specific properties as dependencies vs the whole object for more optimal code, see note 118
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type: "USER_INPUT", val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: "USER_INPUT", val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailState.isValid) {
      emailInputRef.current.focus();
    }
    else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          isValid={emailState.isValid} 
          label="E-Mail" 
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input 
          ref={passwordInputRef}
          isValid={passwordState.isValid} 
          label="Password" 
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
