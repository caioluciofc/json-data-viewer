import { JsonData, JsonDataArray } from "@/src/models";

describe("JsonData interfaces", () => {
  it("should define JsonData interface correctly", () => {
    const jsonData: JsonData = {
      data: { key: "value" },
      kids: {
        has_phone: {
          records: [
            {
              data: { key2: "value2" },
              kids: {
                has_phone: {
                  records: [],
                },
              },
            },
          ],
        },
      },
    };

    expect(jsonData).toBeDefined();
  });

  it("should define JsonDataArray type correctly", () => {
    const jsonDataArray: JsonDataArray = [
      {
        data: { key: "value" },
        kids: {
          has_phone: {
            records: [
              {
                data: { key2: "value2" },
                kids: {
                  has_phone: {
                    records: [],
                  },
                },
              },
            ],
          },
        },
      },
    ];

    expect(jsonDataArray).toBeDefined();
  });
});
