import { useEffect, useState } from 'react';
import { JsonData, JsonDataArray } from '../models';
import jsonData from '../../example-data.json';

export function useDataTable() {
    //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝

	// Since I'm using NEXT it would be better here to initialize with the JSONDATA
	// Pre populated, so I can use better the serverside part of the
	const [state, setState] = useState({
		jsonData: [] as JsonDataArray,
		isLoading: false,
	});

	// initializate the state
	useEffect(() => {
		setState((currentState) => ({
			...currentState,
			jsonData: jsonData as JsonDataArray,
		}));
	}, []);

    //  ╔═╗╦═╗╦╔ ╗╔═╗╔╦╗╔═╗
	//  ╠═╝╠╦╝║║ ║╠═╣ ║ ║╣
	//  ╩  ╩╚═╩╚╝ ╩ ╩ ╩ ╚═╝
	function _startLoading() {
		setState((currentState) => ({ ...currentState, isLoading: true }));
	}

	function _stopLoading() {
		setState((currentState) => ({ ...currentState, isLoading: false }));
	}

	function _removeItem(ancestors : number[]) {
		_startLoading();
		const _items = [...state.jsonData];

		const result = _findAndRemove(_items, ancestors);

		setState((currentState) => ({
			...currentState,
			jsonData: result,
		}));

		_stopLoading();
	}
	
	function _findAndRemove(items : JsonDataArray, ancestors : number[]) : JsonDataArray {
		let filteredItems;
		if (ancestors.length === 1) {
			filteredItems = items.filter((value, index) => {
				return index !== ancestors[0]
			}) as JsonDataArray;
		} else {
			filteredItems = items.map((item, index) => {
				if (index === ancestors[0] && item.kids) {
					const kids = Object.entries(item.kids).map(([key, value]) => {
						const _kids = _findAndRemove(value.records, ancestors.slice(1));
						return { [key] : {records : _kids}}
					})
					const result = kids.reduce((acc, cur) => ({ ...acc, ...cur}), {});
					return { ...item, kids : result }
				} else {return item}
			})}
		return filteredItems
	}

	//  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
	const _actions_ = {
        removeItem: _removeItem,
	};

    return [state, _actions_] as [typeof state, typeof _actions_];
}