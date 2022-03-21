# Conference Mock Web app

## What is used:

- Typescript
- React (create-react-app)
- Redux Toolkit
- Material-UI

Codesandbox [demo link](https://codesandbox.io/s/conf-list-demo-19uk5f)

### Reasons to use selected framework

- Typescript: makes development much easier. No need to jump between files to check the data format
- React: easy to set up with Typescript and I'm familiar with the library
- Redux Toolkit: simple state management tool. Very handy and straight forward. Easy to scale
- Material-UI: has needed set of styled components and has great API and integration into react

## What is done

- App generates a list of past and future conferences and displays them
- Each conference has a list of properties that are displayed and it expands by clicking on the header
- Creating of a new conference using floating button
- Testing on a basic level

## What to improve

- Creation of a new conference is in simulation mode. The form does not cover all the required fields. On submit it does not take in account user input, but creates a conference with pre-set values
- Testing is done on basic level, test only mock data generator

## What is not done

- Translations
- A11y check - although Material-UI supports A11y out of the box
- Weather fetch
