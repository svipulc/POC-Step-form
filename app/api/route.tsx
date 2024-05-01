"use server";

import { NextResponse } from "next/server";
import { Inputs } from "@/components/StepForm";
import { FormDataSchema } from "@/lib/schema";

const CityList = ["ahmadabad", "rajkot", "jamnagar", "bhavnagar"];
const PhoneList = ["9151626204", "1948215360", "4681307035", "7235311701"];
const EmailList = ["asdf@gmail.com", "abcd@gmail.com"];

interface ErrorListItem {
  fieldName: string;
  error: string;
}

export async function POST(request: Request) {
  const data: Inputs = await request.json();
  const errorList: ErrorListItem[] = [];
  const checkedData = FormDataSchema.safeParse(data);
  console.log("backend", checkedData);
  if (checkedData.success) {
    if (EmailList.includes(checkedData.data.email) == true) {
      errorList.push({
        fieldName: "email",
        error: "Email all ready in use.Try another.",
      });
      // return NextResponse.json({
      //   fieldName: "email",
      //   error: "Email all ready in use.Try another.",
      //   data: checkedData,
      // });
    }
    if (CityList.includes(checkedData.data.city.toLowerCase()) == false) {
      console.log("not in list");
      errorList.push({
        fieldName: "city",
        error: "Invalid city name",
      });
      // return NextResponse.json({
      //   fieldName: "city",
      //   error: "Invalid city name",
      //   data: checkedData,
      // });
    } else if (checkedData.data.city in CityList) {
      console.log("in list");
    }
    if (PhoneList.includes(checkedData.data.phoneNumber) === true) {
      console.log(
        "phone error",
        PhoneList.includes(checkedData.data.phoneNumber)
      );
      errorList.push({
        fieldName: "phoneNumber",
        error: "Phone number all ready in use.Try another.",
      });
      // return NextResponse.json({
      //   fieldName: "phoneNumber",
      //   error: "Phone number all ready in use.Try another.",
      //   data: checkedData,
      // });
    }
  }

  if (errorList.length > 0) {
    console.log("errorlist", errorList);
    return NextResponse.json({
      error: errorList,
      data: checkedData,
    });
  }
  return NextResponse.json({
    checkedData,
    success: "Ok",
  });
}

// {
//   firstName: string;
//   lastName: string;
//   email: string;
//   country: string;
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
//   companyName: string;
//   phoneNumber: string;
// }

/**
 * validation is required for following field:
 *
 * 1) name
 * 2) email if it exist in list return use another email.
 * 3) check country if it in list.
 * 4) city in list
 * 5) state in list
 * 6) zip check from valid list of zip code.
 * 7) phoneNumber is already used send new phone number to add
 *
 * errorList= [
 * {
 *  fieldName:string,
 *  errorMessage:string
 * }
 * ]
 *
 *
 *
 */

// export const CountryWiseList = [
//   {
//     countryName: "india",
//     State: [
//       {
//         StateName: "Gujarat",
//         City: [
//           {
//             CityName: "Bhavnagar",
//             ZipCode: ["364001", "364002"],
//           },
//           { CityName: "Rajkot", ZipCode: ["360001", "360002"] },
//         ],
//       },
//       {
//         StateName: "Madhya Pradesh",
//         City: [
//           {
//             CityName: "Bhopal",
//             ZipCode: ["462001", "462001"],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     countryName: "canada",
//     State: [
//       {
//         StateName: "Alberta",
//         City: [
//           {
//             CityName: "Calgary",
//             ZipCode: ["T0L 0X0", "T1X 0K2"],
//           },
//           { CityName: "Edmonton", ZipCode: ["T4X 0K4", "T4X 0L8"] },
//         ],
//       },
//       {
//         StateName: "British Columbia",
//         City: [
//           {
//             CityName: "Vancouver",
//             ZipCode: ["V5J", "V5K"],
//           },
//         ],
//       },
//     ],
//   },
// ];
