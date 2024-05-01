"use client";

//Library
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";

//UI
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

//Form Schema
import { FormDataSchema } from "@/lib/schema";

//Constant
import { stepList } from "@/constant";

//Input field type
export type Inputs = z.infer<typeof FormDataSchema>;
type FieldName = keyof Inputs;

//Error list item type
export interface ErrorListItem {
  fieldName: keyof Inputs;
  error: string;
}

//Error list
interface ErrorListType {
  error?: ErrorListItem[];
  data?: Inputs;
}

export default function StepForm() {
  // all the state
  const [currentStep, setCurrentStep] = useState(0);
  const [previousStep, setPreviousStep] = useState(0);
  const [prevCurrent, setPrevCurrent] = useState(0);
  const delta = currentStep - previousStep;
  const [serverError, setServerError] = useState<ErrorListType>({});

  // Form
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  });

  //Submit function
  const processForm: SubmitHandler<Inputs> = async (data) => {
    const serverData = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    }).then((res) => res.json());

    if (serverData.error) {
      setServerError(serverData);
    }
    if (serverData.success) {
      alert(JSON.stringify(serverData));
      setServerError({});
      setCurrentStep(0);
      setPrevCurrent(0);
      setPreviousStep(0);
      reset();
    }
  };

  const next = async () => {
    const fields = stepList[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < stepList.length) {
      if (currentStep === stepList.length - 1) {
        await handleSubmit(processForm)();
      } else {
        setPreviousStep(currentStep);
        setPrevCurrent((step) => step + 1);
        setCurrentStep((step) => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  useEffect(() => {
    if (serverError.error) {
      stepList.map((step, index) => {
        if (step.fields) {
          step.fields.map((f, i) => {
            serverError.error?.map((ef, eindex) => {
              if (f == ef.fieldName) {
                if (eindex == 0) {
                  setCurrentStep(index);
                }
                setPreviousStep(index - 1);
                setFocus(ef.fieldName!);
                setError(ef.fieldName, {
                  type: "",
                  message: ef.error,
                });
              }
            });
          });
        }
      });
    }
  }, [setError, serverError, setFocus]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-neutral-300 to-stone-400">
      <div className="w-2/3 shadow-lg h-[700px] backdrop-blur-md bg-white/60 rounded-sm">
        <div className="flex overflow-y-hidden  justify-between p-10">
          {stepList.map((step, i) => {
            return (
              <div
                key={step.id}
                className="step-item cursor-pointer flex flex-col justify-center items-center w-36 relative before:absolute before:h-[3px] before:w-full before:top-1/3 before:-translate-y-2/4 before:right-full "
                onClick={() => {
                  if (i <= prevCurrent) {
                    setCurrentStep(i);
                    setPreviousStep(i - 1);
                  }
                }}
              >
                <span
                  className={cn(
                    "relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-slate-400",
                    {
                      "bg-slate-900 text-white": currentStep == i,
                      "bg-green-500":
                        i < currentStep || currentStep == stepList.length - 1,
                    }
                  )}
                >
                  {i < currentStep || currentStep == stepList.length - 1 ? (
                    <Check className="text-white" />
                  ) : (
                    i + 1
                  )}
                </span>
                <p className="truncate">{step.name}</p>
              </div>
            );
          })}
        </div>
        <div className="px-10 h-2/3">
          <form className="" onSubmit={handleSubmit(processForm)}>
            {currentStep === 0 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Provide your personal details.
                </p>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        autoComplete="given-name"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.firstName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        autoComplete="family-name"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.lastName?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        autoComplete="email"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Address
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Country
                    </label>
                    <div className="mt-2">
                      <select
                        id="country"
                        {...register("country")}
                        autoComplete="country-name"
                        defaultValue={"india"}
                        className="block w-full rounded-md border-0 p-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value={"india"}>India</option>
                        <option value={"canada"}>Canada</option>
                        {/* <option value={"mexico"}>Mexico</option> */}
                      </select>
                      {errors.country?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="street"
                        {...register("street")}
                        autoComplete="street-address"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.street?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.street.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="city"
                        {...register("city")}
                        autoComplete="address-level2"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.city?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.city.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="state"
                        {...register("state")}
                        autoComplete="address-level1"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.state?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="zip"
                        {...register("zip")}
                        autoComplete="postal-code"
                        className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                      />
                      {errors.zip?.message && (
                        <p className="mt-2 text-sm text-red-400">
                          {errors.zip.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <>
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Work Experience
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide your Work details.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Company name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          id="companyName"
                          {...register("companyName")}
                          autoComplete="given-name"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        {errors.companyName?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.companyName?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
            {currentStep === 3 && (
              <>
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Contact Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Provide your Contact details.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phoneNumber"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          id="phoneNumber"
                          {...register("phoneNumber")}
                          autoComplete="given-name"
                          className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phoneNumber?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.phoneNumber?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
            {currentStep === 4 && (
              <>
                <motion.div
                  initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Complete
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Thank you for your submission.
                  </p>
                </motion.div>
              </>
            )}
          </form>
        </div>
        {/* Navigation */}
        <div className="mt-4 pt-5">
          <div className="flex justify-around">
            <Button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </Button>
            <Button
              type="button"
              onClick={next}
              disabled={currentStep === stepList.length}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {currentStep === stepList.length - 1 ? (
                "Finish"
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
