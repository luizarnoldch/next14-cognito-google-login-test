'use client'

import { useEffect, useState } from 'react';
import { getCurrentUser, signOut, fetchAuthSession } from 'aws-amplify/auth';

type Props = {}

const User = (props: Props) => {

  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState<any>('');
  const [isLogged, setIsLogged] = useState(false);

  const [accessToken, setAccessToken] = useState<any>();
  const [idToken, setIdToken] = useState<any>();

  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const getCurrentUserResonse = await getCurrentUser();
  
        console.log(`The username: ${getCurrentUserResonse.username}`);
        console.log(`The userId: ${getCurrentUserResonse.userId}`);
        console.log(`The signInDetails: ${getCurrentUserResonse.signInDetails}`);


        setUsername(getCurrentUserResonse.username)
        setUserId(getCurrentUserResonse.userId)
        setEmail(getCurrentUserResonse.signInDetails?.loginId)
        // console.log(getCurrentUserResonse);
        setIsLogged(true)
      } catch (err) {
        console.log(err);
      }
    }

    const currentSession = async () => {
      try {
        const authSessionResponse = (await fetchAuthSession()).tokens ?? {};
        const { accessToken, idToken }:any = authSessionResponse
        // setAccessToken(accessToken);
        // console.log(`accessToken: ${accessToken}`)
        // setIdToken(idToken);
        // console.log(`idToken: ${idToken}`)

        const tock = localStorage.getItem('CognitoIdentityServiceProvider.6jhjcse67j9f4ha0dcc381eqkl.04585478-b0d1-7003-74c7-08f9e1c2e89f.idToken');
        // console.log(tock)

        // if (idToken) {
        //   localStorage.setItem('token', idToken);
        //   console.log("idtoken storaged")
        // }

        // console.log(`authSessionResponse: ${JSON.stringify(authSessionResponse, null, 1)}`)
      } catch (err) {
        console.log(err);
      }
    };

    currentSession()
    currentAuthenticatedUser()
  },[isLogged])


  const handleSignOut = async () => {
    try {
      await signOut();
      setIsLogged(false)
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  return (
    <div>
      <p className='text-white'>User: {username}</p>
      <p className='text-white'>UserId: {userId}</p>
      <p className='text-white'>Email: {email}</p>
      <div>
        <p className='text-white'>isLogged: { isLogged ? 'yes' : 'no' }</p>
      </div>
      <button className='p-4 my-4 bg-blue-300' onClick={handleSignOut}>LogOut</button>

      <div>
        <p className='text-white'>AcessKey: on console</p>
        <p className='text-white'>IdToken: on console</p>
      </div>
    </div>
  )
}

export default User