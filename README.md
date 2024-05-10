# Project Setup

This project (By [Yassir WAHID](https://github.com/Y7T007)) is a React-based application that uses Firebase for authentication and Material UI for design.

## Prerequisites

- Node.js 14.0.0 or later
- npm 6.14.0 or later
- Firebase account
- WebStorm 2023.1.3 or any other IDE

## Steps to Setup

1. Clone the repository to your local machine.
2. Install the required npm packages by running `npm install`.
3. Set up Firebase:
    - Create a new Firebase project.
    - Enable Email/Password sign-in under the Authentication sign-in method.
    - Generate a new private key file for your service account.
    - Save the JSON file and note down the path.
4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following lines to the file:
      ```
      REACT_APP_FIREBASE_API_KEY=<your_firebase_api_key>
      REACT_APP_FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
      REACT_APP_FIREBASE_PROJECT_ID=<your_firebase_project_id>
      REACT_APP_FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your_firebase_messaging_sender_id>
      REACT_APP_FIREBASE_APP_ID=<your_firebase_app_id>
      ```
5. Run the application by executing `npm start`.

## Documentation

### `src/routes.js`

This file sets up the routes for the application. Each object in the exported array corresponds to a different route in the application.

### `src/layouts/pages/landing-pages/contact-us/index.js`

This file defines the `ContactUs` component which is the entry point for the Dashboard page.

### `src/components/qr-code-generator.js`

This file defines the `QRCodeForm` component which is used to generate QR codes.

### `src/components/ExcelAdapter.js`

This file defines the `ExcelAdapter` class which is used to read product names from an Excel file.

### `src/components/Product.js`

This file defines the `Product` class which represents a product.

### `src/pages/QRCodeGenerator.jsx`

This file defines the `QRCodeGenerator` component which is the entry point for the QR code generator page.

### `src/pages/LandingPages/ContactUs/index.js`

This file defines the `ContactUs` component which is the entry point for the contact us page.

## How It Works

When a request comes in, it is first handled by the router which routes the request to the appropriate component. The component then calls the appropriate function to perform the business logic. The response is then rendered back to the client.