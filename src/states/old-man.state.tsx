import { useEffect, useState } from 'react';
import { JsonData, JsonDataArray } from '../models';
import jsonData from '@/example-data.json';

export function useOldManState() {
  //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  const [state, setState] = useState({
    text: '',
  });

  //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
  //  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
  //  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
  function _setOldManText(text : string) {
    setState((currentState) => ({ ...currentState, text : text }));
  }

  //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  const _actions_ = {
    setOldManText: _setOldManText,
  };

  return [state, _actions_] as [typeof state, typeof _actions_];
}
