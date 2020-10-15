import React, { useEffect, useState } from "react"
import * as Yup from "yup";
import axios from "axios";


//easy regex via Yup import -- checks if inputs match desired limits
const formSchema = Yup.object().shape({
  nameInput: Yup
    .string()
    .min(4, "Your name must be at least 4 characters long."),
  emailInput: Yup
    .string()
    .email("Must be a valid email address.")
    .required("Must enter an email address."),
  passwordInput: Yup
    .string()
    .required("Password is required.")
    .min(8, "Your password must be at least 8 characters in length."),
  tosInput: Yup 
    .boolean()
    .oneOf([true], "You must accept the terms of service."),
})

export default function Form() {
  //object containing current values for inputs
  const [formState, setFormState] = useState({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    tosInput: false,
  })

  //object containing error messages for inputs
  const [errorsState, setErrorsState] = useState({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    tosInput: "",
  })
  //checks if submit button can be enabled -- set to disabled by default
  const [buttonDisabled, setButtonDisabled] = useState(true);

  //checks formState against formSchema. if all OK, then button is enabled. 
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    })
  }, [formState]); //updates with formState


  function validate(e) {
    Yup.reach(formSchema, e.target.name) //sets which field to check against formSchema
      .validate(e.target.value) //provides current input to check
      .then(valid=> {
        setErrorsState({...errorsState, [e.target.name]: ""}) //set error message to none
      })
      .catch(err=> {
        setErrorsState({...errorsState, [e.target.name]: err.errors[0]}) //set error message
      })
  }
  const inputChange = e => {
    e.persist(); //makes sure react doesn't get rid of eventhandler
    validate(e); 
    setFormState({...formState, [e.target.name]: e.target.value}); //so input fields aren't limited to one character
  }

  return (
    <div className="form-container">
      <form onSubmit={e => {
        e.preventDefault(); //so react doesn't reload the whole page 
        axios.post("https://reqres.in/api/users", formState) //submit form data to url
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }}>
        <label htmlFor="nameInput">Name</label> 
        <input 
          type="text" 
          name="nameInput"
          value={formState.nameInput}
          onChange={inputChange} 
        />
        {errorsState.nameInput.length > 0 && <p>{errorsState.nameInput}</p>}
{/* displays error only if error state is greater than empty string */}

        <label htmlFor="emailInput">Email</label>
        <input 
          type="email" 
          name="emailInput"
          value={formState.emailInput}
          onChange={inputChange}
        />
        {errorsState.emailInput.length > 0 && <p>{errorsState.emailInput}</p>}
        
        <label htmlFor="">Password</label>
        <input 
          type="passwordInput" 
          name="passwordInput"
          value={formState.passwordInput}
          onChange={inputChange}
        />
        {errorsState.passwordInput.length > 0 && <p>{errorsState.passwordInput}</p>}

        <label htmlFor="tosInput">Accept Terms of Service</label>
        <input 
          type="checkbox" 
          name="tosInput" 
          value={true}
          onChange={inputChange}
        />
        {errorsState.tosInput.length > 0 && <p>{errorsState.tosInput}</p>}

        <button type="submit" disabled={buttonDisabled}>Submit</button>
      </form>
    </div>
  )
}