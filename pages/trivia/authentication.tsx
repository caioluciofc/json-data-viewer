'use client'; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react';
import { TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/trivia.style';
import Link from 'next/link';
import { Avatar } from '@/components';
import { useAppContext } from '@/src/app.provider';
import { toast } from 'react-hot-toast';
import AppProvider from '@/src/app.provider';
import { useRouter } from 'next/router';
import { JumpingQuestion } from '../../components/jumping_question';

export default function TriviaAuth() {
  const { authState, signin } = useAppContext();

  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignin = async (event: any) => {
    event.preventDefault();

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
        <form onSubmit={handleSignin} method="POST">
          <input
            type="username"
            defaultValue="caiolu"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            defaultValue="caiolu"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? 'bg-slate-600' : 'bg-slate-800'
            } text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150`}>
            {isSubmitting && (
              <i className="fas fa-circle-notch animate-spin text-white mx-auto text-1xl mr-2"></i>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
