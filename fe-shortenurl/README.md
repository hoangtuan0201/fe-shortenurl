# URL Shortener Application

A simple web application that helps shorten long URLs into shorter, more shareable links.

## Features

- Minimalist, user-friendly interface
- Shortens long URLs into compact links
- Copy shortened URL to clipboard
- URL validation
- Success notification when copying to clipboard

## Technologies Used

- React + Vite
- Material-UI (MUI) for user interface
- Axios for API calls

## Installation

1. Clone repository:
```bash
git clone <repository-url>
cd fe-shortenurl
```

2. Install dependencies:
```bash
npm install
```

3. Run the application in development mode:
```bash
npm run dev
```

## How to Use

1. Enter the URL you want to shorten in the input field
2. Click the "Shorten" button
3. After processing, the shortened URL will be displayed
4. Click the copy icon to copy the shortened URL to clipboard

## API Integration

The application uses TinyURL's public API to shorten URLs. The implementation can be found in `src/services/api.js`.

If you want to use a different URL shortening service:

1. Update the API endpoint in the `shortenUrl` function
2. Adjust the response handling to match the new API's response format

## Customization

- Change theme: Edit the `theme` object in `src/App.jsx`
- Modify interface: Edit the MUI components in `src/App.jsx`
