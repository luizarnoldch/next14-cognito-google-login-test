"use client";

import {
  signInWithRedirect,
} from "aws-amplify/auth";

function GoogleProvider() {
  const handleSignWithGoogle = async () => {
    try {
        await signInWithRedirect({
          provider: 'Google'
        });
      } catch (error) {
        console.log('error signing up:', error);
      }
  };

  return (
    <div className="p-8 flex w-full flex-col">
      <button
        className="p-4 m-4 text-white bg-green-500"
        onClick={handleSignWithGoogle}
      >
        Open Google
      </button>
    </div>
  );
}

export default GoogleProvider;
