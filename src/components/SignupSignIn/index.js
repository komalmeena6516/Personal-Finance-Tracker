 import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup,  GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignupSigninComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    setLoading(true);
    console.log(name, email, password, confirmPassword);
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            toast.success("User Created");
            console.log("user>>>> ", user);
            setLoading(false);
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");

            //create doc fot user
            createDoc(user);
            navigate("/dashboard");

            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
      } else {
        toast.error("Password and Confirm Password is don't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory");
      setLoading(false);
    }
  };

  function loginUsingEmail() {
    console.log(email, password);
setLoading(true);
    if (email !== "" && password !== "") {
      
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User is Logedin");
          navigate("/dashboard");
          setLoading(false);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All Fileds Are Mandatory");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    // make sure that the doc with the uid doesnot exist
    // create a
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
         await setDoc(doc(db, "users", user.uid), {
          name: user.DisplayName ? user.DisplayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date() 
         });
         toast.success("Doc Created");
         setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("Doc already exists");
      setLoading(false);
    }
   
  }

function googleAuth(){
setLoading(true);

try{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    setLoading(false);
    createDoc(user);
    navigate("/dashboard");
    toast.success("User is Authenticated");
    console.log("this is ....-> " , user);
    
  }).catch((error) => {
    // Handle Errors here.
    setLoading(false);
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  

  });
}catch(e){
  setLoading(false);

  toast.error(e.message)
}

}
  
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>

          <form>
            <Input
              type="email"
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"johnDeo@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Login Using Email and Password"}
              onClick={loginUsingEmail}
            />
            <p className="or">or</p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Login Using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Don't Have An Account ? Click Here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely.</span>
          </h2>

          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
            />
            <Input
              type="email"
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"johnDeo@gmail.com"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
            />
            <p className="or">or</p>
            <Button
            onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Or Have An Account Already ? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
};
