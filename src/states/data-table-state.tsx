import { useEffect, useState } from 'react';
import { JsonDataArray } from '../models';
import jsonData from '../../example-data.json';

export function useDataTable() {
    //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
	const [state, setState] = useState({
		jsonData: [] as JsonDataArray,
		isLoading: false,
	});

    //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	function _startLoading() {
		setState((currentState) => ({ ...currentState, isLoading: true }));
	}

	function _stopLoading() {
		setState((currentState) => ({ ...currentState, isLoading: false }));
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
		// TODO: IMPLEMENT REMOVE
        //removeItem: _removeItem,
	};


}