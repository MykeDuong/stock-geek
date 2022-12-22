import { NextPage } from "next";
import { useState, useEffect } from "react";
import { signIn } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Auth: NextPage = () => {
  // const { data: sessionData, status } = useSession();
  const { data: sessionData } = useSession();

  const [signInForm, setSignInForm] = useState({ usernameOrEmail: "", password: "" }) 
  const [signUpForm, setSignUpForm] = useState({ username: "", email: "", password: "", retypedPassword: "" });

  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionData) {
      console.log(sessionData);
      router.push('/home');
    }
  }, [ sessionData ])

  const signUp = trpc.auth.signup.useMutation();

  const handleChangeForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
  }

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (signUpForm.password !== signUpForm.retypedPassword) {
      alert("The confirm password is incorrect")
      return;
    }
    if (!signUpForm.email.includes('@')) {
      alert("Incorrect email format");
      return;
    }
    if (signUpForm.username.includes('@')) {
      alert("The username must not contain @")
      return
    }

    const {retypedPassword, ...submittedForm} = signUpForm

    await signUp.mutate(submittedForm);

    if (signUp.error) {
      alert(signUp.error.message);
    }

  } 

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    signIn("credentials", signInForm);
    
    e.preventDefault();
  }

  return (
    <div
      className="bg-workdesk h-screen w-screen bg-cover flex justify-center items-center"
    >
      <div 
        className={`bg-green-700 w-1/4 rounded-md flex flex-col items-center ${isSignUp ? "h-4/5" : "h-3/5"}`}
      >
        {/* Website name */}
        <h1
          className={`text-white text-5xl font-pacifico ${isSignUp ? "mt-16" : "mt-12"}`}
        >
          Stock Geek
        </h1>
        <hr className="bg-white h-1 w-4/5 mt-10 mb-6" />
        <h1
          className="text-white text-3xl font-nunito"
        >
          Welcome to Stock Geek!
        </h1>

        {/* Form */}
        {isSignUp ? 
          <form
          className="w-full pl-12 pr-12 mt-8 flex flex-col gap-0"
          >
            <label
              className="text-slate-400 font-raleway"
              htmlFor="username"
            >
              Username
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="text" id="username" name="username"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, username: e.target.value})}
            /><br />
            <label
              className="text-slate-400 font-raleway"
              htmlFor="email"
            >
              Email
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="text" id="email" name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, email: e.target.value})}
            /><br />

            <label
              className="text-slate-400 font-raleway"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="password" id="password" name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, password: e.target.value})}
            /><br />

            <label
              className="text-slate-400 font-raleway"
              htmlFor="retyped-password"
            >
              Confirm password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="password" id="retyped-password" name="retyped-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, retypedPassword: e.target.value})}
            /><br />

            <button
              className="text-slate-400 hover:text-white duration-300 mt-4"
              onClick={handleChangeForm}
            >
              Already have an account?</button>
            {/* Submit button */}
            <button
              className="bg-coffee-300 text-coffee-900 mt-8 self-center px-8 py-2 rounded-lg text-lg hover:px-9 hover:py-3 hover:mt-7 duration-300"
              type="submit"
              onClick={handleSignUp}
            >
              Sign up
            </button>
          </form> :
          <form
            className="w-full pl-12 pr-12 mt-8 flex flex-col gap-0"
          >
            <label
              className="text-slate-400 font-raleway"
              htmlFor="username-or-email"
            >
              Username or Email
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="text" id="username-or-email" name="username-or-email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInForm({ ...signInForm, usernameOrEmail: e.target.value})}
            /><br />
            <label
              className="text-slate-400 font-raleway"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-white text-lg font-raleway outline-none w-full"
              type="password" id="password" name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInForm({ ...signInForm, password: e.target.value})}
            /><br />

            <button
              className="text-slate-400 hover:text-white duration-300 mt-4"
              onClick={handleChangeForm}
            >
              Don&apos;t have an account?
            </button>
            {/* Submit button */}
            <button
              className="bg-coffee-300 text-coffee-900 mt-8 self-center px-8 py-2 rounded-lg text-lg hover:px-9 hover:py-3 hover:mt-7 duration-300"
              type="submit"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          </form> }
      </div>
    </div>
  )
}

export default Auth;