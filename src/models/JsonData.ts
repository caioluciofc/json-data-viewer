export interface JsonData {
	data: Data;
	kids?: Kids;
}

export type JsonDataArray = Array<JsonData>;

interface Data {
	[key: string]: string;
}

interface Kids {
	[key: string]: Records;
}

interface Records {
	records: JsonDataArray;
}
