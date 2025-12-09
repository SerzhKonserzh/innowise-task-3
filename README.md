# Online Store

A demo application featuring user authentication, product catalog, shopping cart, and detailed product pages. All data is fetched from the public [DummyJSON](https://dummyjson.com) API.

## Features

- **User authentication**
- **Product catalog** with:
  - Category filtering
  - Sorting (by title, price, rating, stock availability)
  - Pagination
- **Product detail page**
- **Shopping cart**:
  - Add/remove items
  - Adjust item quantities
  - Display total order amount
- **Fully responsive design** (Mobile First)
- **Session persistence** across page reloads

## Tech Stack & Dependencies

- **Frontend**: React 19, TypeScript, React Router v7
- **State management**: Redux Toolkit, RTK Query
- **UI Library**: Material UI (v7)
- **Build tool**: Webpack 
- **API**: [DummyJSON](https://dummyjson.com)

Key dependencies (`package.json`):

```json
  "devDependencies": {
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@types/webpack": "^5.28.5",
    "@types/webpack-dev-server": "^4.7.1",
    "gh-pages": "^6.3.0",
    "html-webpack-plugin": "^5.6.5",
    "ts-loader": "^9.5.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3",
    "webpack": "^5.103.0",
    "webpack-cli": "^6.0.1",
    "webpack-dev-server": "^5.2.2"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/icons-material": "^7.3.5",
    "@mui/material": "^7.3.5",
    "@reduxjs/toolkit": "^2.11.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-redux": "^9.2.0",
    "react-router": "^7.9.6",
    "react-router-dom": "^7.9.6"
  }
```

## How to run
### 1. Clone the repository
```
git clone https://github.com/SerzhKonserzh/innowise-task-3.git
cd innowise-task-3
```
### 2. Install dependencies
```
npm install
```
### 3. Start the development server
```
npm run start
```
### 4. Build for production
```
npm run build:prod
```

## Deploy Link
https://serzhkonserzh.github.io/innowise-task-3/

## Lighthouse check
<img width="1709" height="656" alt="image" src="https://github.com/user-attachments/assets/69349f0f-32b8-402f-8ff1-c44fc146ddd9" />
