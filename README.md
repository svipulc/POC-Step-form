# POC: Step Form

A multi-step form is a longer form broken up into shorter, less daunting steps. From the marketer’s point of view, it’s great for any situation in which you want to collect detailed prospect information because it does so in small chunks. From the prospect’s point of view, multi-step forms allow them to demonstrate their interest by completing a short form, then proceeding to additional form fields to share more about themselves and/or their businesses.

Now in this poc we will try to implement using **NextJs v14** and **React hook form** get ready to deep dive into it.

## Table of content

- Install Dependancy
- About React hook form and function.
- Code Explanation

### Install Dependancy

To install all the required dependancy for project is all written in package.json file but to install in your local system you have to first create clone and and write small code to make up running project in you system follow the below given step.

**Firstly**, We have to create clone of this projec to do that go to you VS Code Editor run the following code:

```
git clone https://github.com/svipulc/step-form.git
```

Moving forward now after cloning the project in you local system. We need install all required dependancy for this project to do that write following code in your terminal of vs code and it will automatically all the depandancy of this project.

```
npm install
```

Now the exiting part comes here to run project write simple and small code and i am sure you got this

```
npm run dev
```

Above run project on development environment on [Open in Browser](http://localhost:3000)

### About React Hook Form and Function

React Hook Form is one such library that helps to manage complex forms. It has excellent performance, is super lightweight, has zero dependencies, can be easily integrated with different React UI frameworks like Material, Antd, and provides an intuitive API and excellent developer experience.

#### Function use in Project

- **useForm :** useForm is a custom hook for managing forms with ease. It takes one object as optional argument. The following example demonstrates all of its properties along with their default values.

- **register :** This method allows you to register an input or select element and apply validation rules to React Hook Form. Validation rules are all based on the HTML standard and also allow for custom validation methods.

- **tigger :** Manually triggers form or input validation. This method is also useful when you have dependant validation (input validation depends on another input's value).

- **setFocus :** This method will allow users to programmatically focus on input. Make sure input's ref is registered into the hook form.

- **setError :** The function allows you to manually set one or more errors.
