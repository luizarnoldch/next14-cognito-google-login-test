"use client"

import 'aws-amplify/auth/enable-oauth-listener';
import { getCurrentUser, fetchUserAttributes, AuthUser, signOut } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useState, useEffect } from 'react';

function GoogleProvider() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<unknown>(null);
  const [customState, setCustomState] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
        switch (payload.event) {
          case "signInWithRedirect":
            const GoogleUser = await getCurrentUser();
            const userAttributes = await fetchUserAttributes();
            console.log({user, userAttributes});
            setUser(GoogleUser)
            break;
          case "signInWithRedirect_failure":
            // handle sign in failure
            break;
          case "customOAuthState":
            const state = payload.data; // this will be customState provided on signInWithRedirect function
            console.log(state);
            break;
        }
      });
    return unsubscribe;
  }, []);

  return (
    <div className="p-8 flex w-full flex-col">
      
      <div className="p-4 m-4 text-white">{user?.username}</div>
      <div className="p-4 m-4 text-white">{customState}</div>
      <button
        className="p-4 m-4 text-white bg-slate-500"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}

export default GoogleProvider;
