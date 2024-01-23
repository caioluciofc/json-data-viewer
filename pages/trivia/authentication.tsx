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

export default function TriviaAuth() {
  const { authState, signin } = useAppContext();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignin = async () => {
    if (username === '' || password === '') {
      toast.error('Missing details!');
      return;
    }

    setIsSubmitting(true);

    try {
      await signin(username, password);
      setIsSubmitting(false);
      if (authState.authToken) {
        router.push('/trivia/trivia-menu');
      }
    } catch {
      setIsSubmitting(false);
      toast.error('Username or password is not correct!');
    }
  };

  return (
    <main style={styles.main}>
      <div style={styles.menu}>
        <JumpingQuestion />

        <div style={styles.header}>
          <TitleLarge text="Trivia Master" />
        </div>
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
            onClick={() => handleSignin()}
            isLoading={isSubmitting}
            />
      </div>
    </main>
  );
}
