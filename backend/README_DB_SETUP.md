# Database Setup for Scientific Calculator

## MongoDB Installation

1. Download and install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start the MongoDB server (default port 27017).
3. The backend will connect to the database at `mongodb://localhost:27017/scientific_calculator` by default.

## Environment Variables

- Set your MongoDB URI and any API keys in the `.env` file in the backend directory.

```
MONGODB_URI=mongodb://localhost:27017/scientific_calculator
CURRENCY_API_KEY=your_currency_api_key_here
```

## Collections
- `conversionhistories`: Stores all currency and unit conversion history.

## Useful Commands
- To start MongoDB: `mongod`
- To view data: Use MongoDB Compass or `mongo` shell.
