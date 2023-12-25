import { useEffect, useState } from 'react';
import { JsonData, JsonDataArray } from '../models';
import jsonData from '../../example-data.json';

export function useDataTable() {
    //  ╔═╗╔╦╗╔═╗╔╦╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
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

	function _removeItem(item: JsonData) {
		_startLoading();

		const _hash = JSON.stringify(item);
		const _items = [...state.jsonData];

		const result = _findAndRemove(_hash, _items);

		setState((currentState) => ({
			...currentState,
			jsonData: result,
		}));

		_stopLoading();
	}
	
	function _findAndRemove(originalKey : string, items : JsonDataArray) : JsonDataArray {
		let filteredItems = items.filter((value) => {
			const __hash = JSON.stringify(value);
			return __hash !== originalKey;
		}) as JsonDataArray;

		if (items.length === filteredItems.length) {
			filteredItems = items.map((item) => {
				if (item.kids) {
					const kids = Object.entries(item.kids).map(([key, value]) => {
						const _kids = _findAndRemove(originalKey, value.records);
						return { [key] : { records : _kids }};
					});

					return { ...item, kids } as unknown as JsonData;
				}
				return item
			})
		}

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