/* eslint-disable no-use-before-define */

export interface JsonData {
  data: Data;
  kids?: Kids;
}

export type JsonDataArray = Array<JsonData>;

interface Data {
  [key: string]: string;
}

interface Records {
  records: JsonDataArray;
}

interface Kids {
  [key: string]: Records;
}
