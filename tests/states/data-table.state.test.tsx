import { useDataTable } from "../../src/states/data-table-state";
import { renderHook, act } from "@testing-library/react";
import { JsonData, JsonDataArray } from "../../src/models";

import jsonData from "../../example-data.json";
import jsonItem from "./example-item.json";

const exampleData = jsonData as JsonDataArray;
const exampleItem = jsonItem as JsonData;

describe("useDataTable hook", () => {
  it("should initialize state with example data", () => {
    const { result } = renderHook(() => useDataTable());

    expect(result.current[0].jsonData).toEqual(exampleData); // Assuming `exampleData` is defined somewhere.
    expect(result.current[0].isLoading).toBe(false);
  });

  it("should remove an item correctly", () => {
    const { result } = renderHook(() => useDataTable());

    act(() => {
      result.current[1].removeItem(exampleItem);
    });

    const filteredItems = exampleData.filter((value) => {
      const __hash = JSON.stringify(value);
      return __hash !== JSON.stringify(exampleItem);
    });

    expect(result.current[0].jsonData).toEqual(filteredItems); // Define `expectedDataAfterRemoval` based on the itemToRemove.
    expect(result.current[0].isLoading).toBe(false);
  });
});
