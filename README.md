# Dynamic Form Application

A Next.js application that demonstrates a dynamic form with validation and state management.

## Features

- Dynamic form with input fields and select boxes
- Field validation with error messages
- Ability to add and remove form field rows
- Form state display in a table format
- Responsive design with Tailwind CSS

## Requirements

- Node.js 18.17 or later
- npm or yarn

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd 6sense-form-app
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.js` - The main page component
- `src/components/DynamicForm.js` - The dynamic form component with all the functionality
- `src/app/globals.css` - Global styles

## Form Functionality

The form includes:

1. Input fields and select boxes side by side
2. Validation for required fields
3. Error messages displayed below each field
4. A "+" button to add new field rows
5. Delete buttons to remove field rows
6. Form state display in a table format

## Technologies Used

- Next.js
- React
- Tailwind CSS
- JavaScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
