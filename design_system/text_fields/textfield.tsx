import { CustomStyle } from '@/src/models';
import React from 'react';
import { Colors, Paddings } from '..';

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  isDisabled: boolean;
  type: string
}

export function TextField({ defaultValue, isDisabled, onChange, type }: Props) {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      disabled={isDisabled}
      style={styles.input}
      // className={`${
      //   isDisabled ? 'text-slate-400' : 'text-slate-600'
      // } border-0 px-3 py-3 placeholder-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150`}
      placeholder={''}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

const styles: CustomStyle = {
  input: {
    padding: Paddings.small,
    margin: Paddings.small,
    width: '95%',
    height: 20,
    backgroundColor: Colors.grey + 20,
    border: 'solid 1px ' + (Colors.grey + 60),
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
