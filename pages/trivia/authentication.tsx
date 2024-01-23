'use client'; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react';
import { PrimaryButton, TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/trivia.style';
import Link from 'next/link';
import { Avatar } from '@/components';
import { useAppContext } from '@/src/app.provider';
import { toast } from 'react-hot-toast';
import AppProvider from '@/src/app.provider';
import { useRouter } from 'next/router';
import { JumpingQuestion } from '../../components/jumping_question';
import { TextField } from '@/design_system';
import { OldMan } from '@/components/old_man_auth';

interface Props {
  text : string
}

export default function TriviaAuth() {
  const { authState, signin, signup, setOldManText } = useAppContext();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = async () => {
    if (username === '' || password === '') {
      toast.error('Missing details!');
      return;
    }
    setIsSubmitting(true);
    setOldManText("Great, I'm signing you in!")

    try {
      await signin(username, password);
      setIsSubmitting(false);
      if (authState.authToken) {
        router.push('/trivia/trivia-menu');
      } else {
        setOldManText("Oooops, your username or password is not correct!")
      }
    } catch {
      setIsSubmitting(false);
      setOldManText("Oooops, your username or password is not correct!")
      toast.error('Username or password is not correct!');
    }
  };

  const handleSignUp = async () => {
    if (username === '' || password === '') {
      toast.error('Missing details!');
      return;
    }

    setIsSubmitting(true);

    try {
      await signup(username, password);
      setIsSubmitting(false);
      await signin(username, password)
    } catch {
      setIsSubmitting(false);
      toast.error('An error has occurred!');
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.menu}>

        <OldMan />
        
          <TextField 
            type='text'
            defaultValue=''
            isDisabled={false}
            onChange={setUsername}
            />
          <TextField
            type='password'
            defaultValue=''
            isDisabled={false}
            onChange={setPassword}
            />
          <PrimaryButton
            text='Sign In'
            onClick={() => handleSignIn()}
            isLoading={isSubmitting}
            />
          <PrimaryButton
            text='Sign Up'
            onClick={() => handleSignUp()}
            isLoading={isSubmitting}
            />
      </div>
    </main>
  );
}
