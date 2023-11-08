import React, { useState, useEffect } from "react";
import { IconX, IconAlertCircle, IconMailUp} from '@tabler/icons-react';
import firebase from "@/utils/server/firebase-client-init";
import 'firebase/auth';

interface Parameters {
    isOpen: boolean;
    onClose: () => void;
  }

const LoginSignupPopup: React.FC<Parameters> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [email, setEmail] = useState(''); 

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        await firebase.auth().signInWithPopup(provider);
        setError(null);
        handleClose();
    } catch (error) {
        setError('An error occurred. Please try again.');
    }
  }

  function signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
  
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          const twitterCredential = result.credential as firebase.auth.OAuthCredential;
          handleClose();
        }
  
      }).catch((error) => {
        console.error(error);
      });
  }
  
  const handleSendSignInLinkToEmail = async (email: string) => {
    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true
    };
    try {
      await firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings);
      setEmailError(null);
      setEmailSent(true);
      window.localStorage.setItem('emailForSignIn', email);
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email address. Please enter a valid email.');
          break;
        case 'auth/network-request-failed':
          setEmailError('Network error. Please check your internet connection and try again.');
          break;
        default:
          setEmailError('An error occurred. Please try again later.');
          break;
      }
    }
  };

  return (
    <div className={`fixed z-50 inset-0 flex items-center justify-center inset-negative-5 overflow-y-auto ${isOpen ? "block" : "hidden"}`}>
      <div className="bg-black opacity-30 absolute inset-0"></div>
      <div className="bg-white dark:bg-[#202123] rounded-lg text-white w-full max-w-md m-auto overflow-hidden z-50 relative border border-gray-300">
      <div 
          className="absolute top-2 right-2 cursor-pointer w-10 h-10 flex items-center justify-center"
          onClick={onClose}
        >
          <IconX color="gray" size={22} strokeWidth={2} />
        </div>
      <div className="pt-12 pb-2 p-6">
        <div className="pt-2 pb-2 p-8 w-full flex flex-col justify-center items-center space-y-4">
          <h1 className="text-black dark:text-white text-3xl pt-2 pb-4 font-bold">
          {isCreatingAccount ? 'Create Your Account' : 'Welcome Back'}
          </h1>
        <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-white dark:bg-[#202123] text-black dark:text-white border border-gray-300 text-lg hover:bg-[#dddddd] dark:hover:bg-[#343541]"
            />
            {emailError && (
              <div className="text-xs flex items-center justify-center text-red-500 text-center ">
                <IconAlertCircle size={18} className="mr-2"/>
                {emailError}
              </div>
            )}
            {emailSent && (
              <div className="text-xs flex items-center justify-center text-green-500 text-center ">
                <IconMailUp size={18} className="mr-2"/>
                {"Email link sent successfully!"}
              </div>
            )}
            <button
            onClick={() => handleSendSignInLinkToEmail(email)}
            className="flex items-center justify-center w-full px-4 py-2 rounded bg-white dark:bg-[#202123] text-black dark:text-white border border-gray-300 text-lg hover:bg-[#dddddd] dark:hover:bg-[#343541]">
              {isCreatingAccount ? 'Sign up with Email Link' : 'Log in with Email Link'}
            </button>
            <span className="mx-4 text-black dark:text-white">OR</span>
            <button 
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full px-4 py-2 rounded bg-white dark:bg-[#202123] text-black dark:text-white border border-gray-300 text-lg hover:bg-[#dddddd] dark:hover:bg-[#343541]">
                
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-brand-google" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path>
                </svg>
                {isCreatingAccount ? 'Sign up with Google' : 'Log in with Google' }
            </button>
            <button 
              onClick={signInWithTwitter} 
              className="flex items-center justify-center w-full px-4 py-2 rounded bg-white dark:bg-[#202123] text-black dark:text-white border border-gray-300 text-lg hover:bg-[#dddddd] dark:hover:bg-[#343541]">

              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 icon icon-tabler icon-tabler-brand-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
              {isCreatingAccount ? 'Sign up with Twitter / X' : 'Log in with Twitter / X' }
          </button>
        </div>
          {error && (
            <div className="text-xs flex items-center justify-center text-red-500 text-center pb-2 py-2">
                <IconAlertCircle size={18} className="mr-2"/>
                {error}
            </div>
            )}
        </div>
        <div className="text-center text-xs text-black dark:text-white pt-2 pb-2">
            By using HackerGPT, you agree to our <a 
            href="/terms-and-conditions"
            target="_blank"
            className="underline font-semibold"
            >
            Terms of Use
            </a>.
        </div>
        <div className="pt-6 pb-5 p-6 flex justify-center">
        {isCreatingAccount ? (
                <button 
                onClick={() => { 
                    setIsCreatingAccount(false); 
                    setError('');
                }}
                className="text-black dark:text-white"
                >
                Already have an account? <span className="font-semibold">Log in</span>
                </button>
            ) : (
                <button 
                onClick={() => {
                    setIsCreatingAccount(true); 
                    setError('');
                }}
                className="text-black dark:text-white"
                >
                Don&apos;t have an account? <span className="font-semibold">Sign up</span>
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPopup;