import { NextPage } from "next";
import { useState, useEffect } from "react";
import { signIn } from 'next-auth/react';
import { trpc } from '../../utils/trpc';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Auth: NextPage = () => {
  const { data: sessionData } = useSession();

  const [signInForm, setSignInForm] = useState({ usernameOrEmail: "", password: "" }) 
  const [signUpForm, setSignUpForm] = useState({ username: "", email: "", password: "", retypedPassword: "" });

  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (sessionData) {
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
      className="relative bg-auth-image h-screen w-screen bg-cover flex justify-end items-center pr-60"
    >
      <div 
        className={`relative min-w-fit px-10 bg-beige-400 rounded-md flex flex-col items-center shadow-lg ${isSignUp ? "h-4/5" : "h-3/5"}`}
      >
        {/* Website name */}
        <h1
          className={`text-green-700 text-5xl font-pacifico ${isSignUp ? "mt-16" : "mt-12"}`}
        >
          Stock Geek
        </h1>
        <hr className="bg-green-700 h w-full mt-8 mb-8" />
        <h1
          className="text-green-700 text-3xl font-raleway font-medium mb-8 px-3"
        >
          Welcome to Stock Geek!
        </h1>

        {/* Form */}
        {isSignUp ? 
          <form
          className="w-full flex flex-col gap-0"
          >
            <label
              className="text-beige-700 text-xl font-raleway"
              htmlFor="username"
            >
              Username
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-xl font-raleway outline-none w-full"
              type="text" id="username" name="username"
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, username: e.target.value})}
            /><br />
            <label
              className="text-beige-700 text-xl font-raleway"
              htmlFor="email"
            >
              Email
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-xl font-raleway outline-none w-full"
              type="text" id="email" name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, email: e.target.value})}
            /><br />

            <label
              className="text-beige-700 text-xl  font-raleway"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-xl font-raleway outline-none w-full"
              type="password" id="password" name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, password: e.target.value})}
            /><br />

            <label
              className="text-beige-700 text-xl font-raleway"
              htmlFor="retyped-password"
            >
              Confirm password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-xl font-raleway outline-none w-full"
              type="password" id="retyped-password" name="retyped-password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpForm({ ...signUpForm, retypedPassword: e.target.value})}
            /><br />

            {/* Submit button */}
            <button
              className="bg-green-700 text-white font-raleway mt-8 self-center px-8 py-2 rounded-lg text-lg hover:px-9 hover:py-3 hover:mt-7 duration-300"
              type="submit"
              onClick={handleSignUp}
            >
              Sign up
            </button>
            <div
              className="flex justify-center absolute bottom-6 left-0 right-0"
            >
              <div
                className="flex flex-row"
              >
                <p
                  className="text-beige-700 font-raleway text-lg"
                >
                  Already have an account?&nbsp;
                </p>

                <button
                  className="text-beige-700 italic underline font-raleway text-lg"
                  onClick={handleChangeForm}
                >
                  Sign in
                </button>

              </div>
            </div>
          </form>
            :
          <form
            className="w-full flex flex-col gap-0"
          >
            <label
              className="text-beige-700 text-xl font-raleway"
              htmlFor="username-or-email"
            >
              Username or Email
            </label>
            <input 
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-xl font-raleway outline-none w-full"
              type="text" id="username-or-email" name="username-or-email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInForm({ ...signInForm, usernameOrEmail: e.target.value})}
            /><br />
            <label
              className="text-beige-700 font-raleway text-xl"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-transparent border-b border-slate-400 caret-slate-400 text-slate-700 text-lg font-raleway outline-none w-full"
              type="password" id="password" name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInForm({ ...signInForm, password: e.target.value})}
            /><br />

            {/* Submit button */}
            <button
              className="bg-green-700 text-white font-raleway mt-8 self-center px-8 py-2 rounded-lg text-lg hover:px-9 hover:py-3 hover:mt-7 duration-300"
              type="submit"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <div
              className="flex justify-center absolute bottom-6 left-0 right-0"
            >
              <div
                className="flex flex-row"
              >
                <p
                  className="text-beige-700 font-raleway text-lg"
                >
                  Don&apos;t have an account?&nbsp;
                </p>
                <button
                  className="text-beige-700 italic underline font-raleway text-lg"
                  onClick={handleChangeForm}
                >
                  Sign up
                </button>

              </div>
            </div>
          </form> }
      </div>
    </div>
  )
}

export default Auth;