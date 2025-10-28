# Visitor Counter Setup

The visitor counter has been implemented with a database abstraction layer that allows you to use any cloud database provider.

## Current Setup

By default, the visitor counter uses an **in-memory implementation** for development. This means the count will reset when the server restarts.

## Configuring Cloud Database Providers

### AWS DynamoDB

1. Install AWS SDK:
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

2. Create a DynamoDB table with:
   - Table name: `visitor-counter` (or set via `DYNAMODB_TABLE_NAME`)
   - Partition key: `id` (String)

3. Set environment variables in `.env.local`:
```env
DATABASE_TYPE=dynamodb
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
DYNAMODB_TABLE_NAME=visitor-counter
```

4. Uncomment the DynamoDB implementation in `src/lib/database/visitor-counter.ts`

5. Update the factory function to return the DynamoDB instance

### Other Database Providers

You can easily add support for other databases by:

1. Creating a new class that implements the `VisitorCounterDatabase` interface:
```typescript
export interface VisitorCounterDatabase {
  getCount(): Promise<number>;
  incrementCount(): Promise<number>;
}
```

2. Adding your implementation to `src/lib/database/visitor-counter.ts`

3. Updating the factory function in `getVisitorCounterDB()`

#### Example: MongoDB
```typescript
class MongoDBVisitorCounter implements VisitorCounterDatabase {
  // Your MongoDB implementation
}
```

#### Example: PostgreSQL
```typescript
class PostgreSQLVisitorCounter implements VisitorCounterDatabase {
  // Your PostgreSQL implementation
}
```

#### Example: Redis
```typescript
class RedisVisitorCounter implements VisitorCounterDatabase {
  // Your Redis implementation
}
```

## How It Works

1. **API Route**: `/src/app/api/visitor-count/route.ts`
   - `GET /api/visitor-count` - Returns current visitor count
   - `POST /api/visitor-count` - Increments and returns new count

2. **Database Abstraction**: `/src/lib/database/visitor-counter.ts`
   - Provides interface for database operations
   - Factory function to select database implementation based on `DATABASE_TYPE` env var

3. **Frontend**: `/src/components/sections/Hero.tsx`
   - Displays visitor count with Eye icon
   - Automatically increments count on page load
   - Shows loading state and error handling

## Features

- Automatic visitor tracking on page load
- Clean, database-agnostic architecture
- Easy to switch between database providers
- Error handling and fallback
- Number formatting with locale support
- Loading states
