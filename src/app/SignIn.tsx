import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/authentication/firebase"; 

export default function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : null;
        const user = result.user;
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        const token = credential ? credential.accessToken : null;
      });
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}
