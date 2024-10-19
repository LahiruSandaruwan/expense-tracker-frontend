# Expense Tracker - Frontend

This is the frontend project for the Expense Tracker application, built using React (version 18) and bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The application allows users to manage their expenses, including adding, editing, and deleting expenses. It interacts with the backend through API calls to store and retrieve data.

## Technologies and Plugins Used

- **React**: Version 18 (bootstrapped with Create React App)
- **JavaScript**: For application logic
- **React Router**: For client-side routing (`react-router-dom`)
- **Styled Components**: For component-level styling
- **Axios**: For making HTTP requests to the backend APIs
- **React Toastify**: For displaying notifications and alert messages
- **React Icons**: For using icons within the application
- **React Confirmation Alerts**: For displaying confirmation messages (e.g., before deleting an expense)

### Installed Plugins
- `styled-components`: For styling React components.
- `react-toastify`: For displaying toast notifications.
- `react-icons`: For adding attractive icons.
- `axios`: For making HTTP requests.
- `js-cookie`: For managing cookies, particularly for CSRF tokens and authentication.
- `react-confirm-alert`: For confirmation alerts before actions like deleting an expense.

To install the necessary plugins, run:
```bash
npm install styled-components react-toastify react-icons axios js-cookie react-confirm-alert
```

## Styling Methods

We are using **Styled Components** for styling the application. This approach allows us to create styled React components with a scoped CSS-in-JS approach, making our components modular and easy to manage.

## Validation Methods

We implemented custom validation for input fields:
- **Title Field**: Only accepts letters (no numbers allowed).
- **Form Validation**: Ensures all required fields are filled out correctly before submission.
- **Backend Validation Handling**: If a validation error occurs (e.g., duplicate title), it is captured and displayed using **React Toastify**.

### Example:
```javascript
<Input
    type="text"
    value={title}
    onChange={(e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) { // Only allow letters and spaces
            setTitle(value);
        }
    }}
    required
/>
```

## Services and API Integration

### API Communication
- **Axios** is used for making HTTP requests to the backend API. The API calls include:
  - Fetching expenses
  - Adding an expense
  - Updating an expense
  - Deleting an expense

- We have a separate `api.js` file where all API-related functions are defined for modularity and reusability. The functions are designed to handle API responses, errors, and CSRF tokens using `js-cookie` for Laravel Sanctum.

### CSRF Token Initialization
We use `axios` instances for handling CSRF tokens with Laravel Sanctum, ensuring secure API requests.

### Authentication
- Authorization token management (`Bearer token`) is set up using `setAuthToken()` function, ensuring the frontend is authenticated before making requests.

### Confirmation Alerts
- We use **React Confirmation Alerts** (`react-confirm-alert`) for actions like deleting an expense. Users are prompted with a confirmation message before deletion to prevent accidental actions.

## Features

- **Expense Management**: Add, edit, delete expenses with form validation and toast notifications.
- **Authentication**: Users must be authenticated to access the dashboard. If unauthenticated, they are redirected to the login page with an alert.
- **API Error Handling**: Friendly toast notifications display when API errors occur, such as network errors or validation failures.
- **Data Fetching**: Data is fetched and displayed dynamically from the backend API, and the UI updates based on API responses.
- **Confirmation Prompts**: Before deleting an expense, the user is shown a confirmation alert using **React Confirmation Alerts**.

## Running the Project

### Prerequisites
- Node.js and npm should be installed on your system.

### Install Dependencies
Run the following command in the project directory to install all required dependencies:
```bash
npm install
```

### Running the Development Server
To start the development server, run:
```bash
npm start
```
This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Building for Production
To build the app for production, run:
```bash
npm run build
```
This will create a `build` folder with the production-ready code.

## Folder Structure

```plaintext
expense-tracker-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ExpenseForm.js
    |   ├── EditExpense.js
│   │   └── ExpenseList.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Register.js
│   │   └── Login.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── App.css
└── package.json
```

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`
Launches the test runner in the interactive watch mode.

### `npm run build`
Builds the app for production, creating a `build` directory.

### `npm run eject`
Ejects the application configuration. **Warning**: This action is irreversible.

## Notes
- Make sure the backend server is running and accessible at the specified API base URL (`http://localhost:8000/api`) for the frontend to interact with the API.
- **Environment Variables**: You can set up `.env` files to manage environment-specific settings like API URLs or feature flags.

## Learn More

To learn more about React and Create React App:
- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

Feel free to customize and expand the project based on your needs. If you have any questions, refer to the documentation links provided.