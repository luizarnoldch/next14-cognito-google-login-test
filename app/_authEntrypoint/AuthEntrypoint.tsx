'use client'

import { Amplify } from 'aws-amplify';
import { CookieStorage  } from 'aws-amplify/utils';
import config from '../aws-exports.js';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

Amplify.configure(config, { ssr: true });
cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

export default function AuthEntrypoint() {
  return null
}