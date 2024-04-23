"use server";

import { NextResponse } from "next/server";
import { Inputs } from "@/components/StepForm";
import { FormDataSchema } from "@/lib/schema";

const CityList = ["ahmadabad", "rajkot", "jamnagar", "bhavnagar"];
const PhoneList = ["9151626204", "1948215360", "4681307035", "7235311701"];
const EmailList = ["asdf@gmail.com", "abcd@gmail.com"];

export async function POST(request: Request) {
  const data: Inputs = await request.json();
  const checkedData = FormDataSchema.safeParse(data);
  if (checkedData.success) {
    if (EmailList.includes(checkedData.data.email) == true) {
      return NextResponse.json({
        fieldName: "email",
        error: "Email all ready in use.Try another.",
        data: checkedData,
      });
    }
    if (CityList.includes(checkedData.data.city.toLowerCase()) == false) {
      console.log("not in list");
      return NextResponse.json({
        fieldName: "city",
        error: "Invalid city name",
        data: checkedData,
      });
    } else if (checkedData.data.city in CityList) {
      console.log("in list");
    }
    if (
      PhoneList.includes(checkedData.data.phoneNumber) == true &&
      checkedData.data.phoneNumber.length < 10
    ) {
      console.log("phone error");
      return NextResponse.json({
        fieldName: "phoneNumber",
        error: "Phone number all ready in use.Try another.",
        data: checkedData,
      });
    }
  }
  return NextResponse.json({ checkedData, success: "Ok" });
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
