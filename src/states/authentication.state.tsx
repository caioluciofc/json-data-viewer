import { useEffect, useState } from 'react';
import { authService } from '../services/authentication.service';
import { toast } from 'react-hot-toast';

interface AuthState {
  userName?: string;
  authToken?: string;
  isLoading: boolean;
}

export default function useAuthState() {
  //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
  });

  //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
  //  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
  //  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝

  function _startLoading() {
    setAuthState((current) => ({ ...current, isLoading: true }));
  }

  function _stopLoading() {
    setAuthState((current) => ({ ...current, isLoading: false }));
  }

  async function _signup(username: string, password: string) {
    try {
      _startLoading();
      const user = await authService.signup(username, password);
      if (user) {
        toast.success('User Successfully Created!');
      } else {
        toast.error("User Couldn't be created!");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
    _stopLoading();
  }

  async function _signin(username: string, password: string) {
    try {
      _startLoading();
      const authToken = await authService.signin(username, password);
      if (authToken) {
        setAuthState((current) => ({ ...current, userName: username, authToken }));
      } else {
        toast.error(`Login data is not correct`);
      }
    } catch (error) {
      toast.error(`${error}`);
    }

    _stopLoading();
  }

  function _signout() {
    setAuthState((current) => ({ ...current, authToken: undefined, userName: undefined }));
  }

  //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  const _actions_ = {
    signin: _signin,
    signup: _signup,
    signout: _signout,
  };

  return [authState, _actions_] as [typeof authState, typeof _actions_];
}
