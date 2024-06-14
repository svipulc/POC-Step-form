export const stepList = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["firstName", "lastName", "email", "imgUrl"],
  },
  {
    id: "Step 2",
    name: "Education Information",
    fields: ["country", "state", "city", "street", "zip"],
  },
  { id: "Step 3", name: "Work Experience", fields: ["companyName"] },
  {
    id: "Step 4",
    name: "Contact Information",
    fields: ["phoneNumber"],
  },
  { id: "Step 5", name: "Complete" },
];

export const CountryWiseList = [
  {
    countryName: "india",
    State: [
      {
        StateName: "Gujarat",
        City: [
          {
            CityName: "Bhavnagar",
            ZipCode: ["364001", "364002"],
          },
          { CityName: "Rajkot", ZipCode: ["360001", "360002"] },
        ],
      },
      {
        StateName: "Madhya Pradesh",
        City: [
          {
            CityName: "Bhopal",
            ZipCode: ["462001", "462001"],
          },
        ],
      },
    ],
  },
  {
    countryName: "canada",
    State: [
      {
        StateName: "Alberta",
        City: [
          {
            CityName: "Calgary",
            ZipCode: ["T0L 0X0", "T1X 0K2"],
          },
          { CityName: "Edmonton", ZipCode: ["T4X 0K4", "T4X 0L8"] },
        ],
      },
      {
        StateName: "British Columbia",
        City: [
          {
            CityName: "Vancouver",
            ZipCode: ["V5J", "V5K"],
          },
        ],
      },
    ],
  },
];
