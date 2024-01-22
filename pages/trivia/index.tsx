'use client'; // This is a client component 👈🏽

import React, { useEffect, useState } from 'react';
import { TitleLarge } from '@/design_system';
import { styles } from '../../design_system/styles/trivia.style';
import Link from 'next/link';
import { Avatar } from '@/components';
import { useAppContext } from '@/src/app.provider';
import { toast } from 'react-hot-toast';
import AppProvider from '@/src/app.provider';
import TriviaMenu from './trivia-menu';

export default function TriviaGame() {
  return <TriviaMenu />;
}
