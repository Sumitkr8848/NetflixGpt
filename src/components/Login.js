import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4"
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayNmae: displayName, photoURL: photoURL }));
           
          }).catch((error) => {
            setErrorMessage(error.message);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);

        });
    }
  }

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='logo' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='absolute w-3/12 p-12 my-40 mx-auto right-0 left-0 bg-black  text-white bg-opacity-80 rounded-lg'  >
        <h1
          className='font-bold text-3xl py-4'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (<input type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)}

        <input
          ref={email}
          type='email'
          placeholder='Email Address'
          className='p-4 my-4 w-full bg-gray-700' />

        <input
          ref={password}
          type="password"
          placeholder='Password'
          className='p-4 my-4 w-full bg-gray-700' />
        <p className=' font-bold text-lg text-red-500'>
          {errorMessage}
        </p>
        <button
          className='p-4 my-6 bg-red-700 w-full rounded-lg'
          onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className='py-4 cursor-pointer'
          onClick={toggleSignInForm}> {isSignInForm ? "New to Netflix? Sign Up" : "Already a user? Sign in Now"}
        </p>

      </form>
    </div>
  )
}

export default Login
