'use client'

import { useState } from 'react';
import { signUp, confirmSignUp  } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation'

export function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [signupNextStep, setSignupNextStep] = useState('');

  const router = useRouter()

  const AmpliFyCognitoSignUp = async () => {
    if (password !== confirmPassword) {
      setError('La contraseña y la confirmación no coinciden.');
      return;
    }

    try {
      const SignUpResponse = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });

      console.log(SignUpResponse.userId);
      console.log(SignUpResponse.isSignUpComplete);
      console.log(SignUpResponse.nextStep);
      console.log();
      console.log(SignUpResponse);

      setSignupNextStep(SignUpResponse.nextStep.signUpStep)

    } catch (e: any) {
      console.error('Error en el registro: ', e);
      setError(e.message || 'Ocurrió un error durante el registro');
    }
  };

  async function handleSignUpConfirmation() {
    try {
      const SignUpResponseCode = await confirmSignUp({ username: email, confirmationCode: code });

      console.log(SignUpResponseCode);
    } catch (e: any) {
      console.error('Error en el registro: ', e);
      setError(e.message || 'Ocurrió un error durante el registro');
    }
  }

  const handleSubmitCode = async (e: any) => {
    e.preventDefault();
    await handleSignUpConfirmation();
    router.push('/login')
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await AmpliFyCognitoSignUp();
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
          <div>
            <label>Confirmar Contraseña:</label>
            <input
              className='text-black p-2'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Registrarse</button>
        </form>
      </div>
      {
        signupNextStep === "CONFIRM_SIGN_UP" && 
        <div>
          <form onSubmit={handleSubmitCode}>
            <div>
              <label>Confirmar Codigo:</label>
              <input
                className='text-black p-2'
                type="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Confirmar</button>
          </form>
          
        </div> 
      }
    </>
    
  );
}

export default App;
