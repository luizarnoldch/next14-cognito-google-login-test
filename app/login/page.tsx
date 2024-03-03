'use client'

import { useState } from 'react';
import { signIn, type SignInInput } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation'


type Props = {}

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter()

  async function handleSignIn({ username, password }: SignInInput) {
    try {
      const signInResponse = await signIn({ username, password });
      console.log(signInResponse.isSignedIn)
      console.log(signInResponse.nextStep)
      console.log(signInResponse)
    } catch (e:any) {
      console.log('error signing in', e);
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await handleSignIn({username: email, password})
    // router.push('/fetch')
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              className='text-black p-2'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              className='text-black p-2'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">SignIn</button>
        </form>
      </div>
    </>
    
  );
}

export default Login