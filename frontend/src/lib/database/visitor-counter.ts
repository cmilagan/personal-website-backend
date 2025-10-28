// Database abstraction layer for visitor counter
// This allows easy switching between different database providers

export interface VisitorCounterDatabase {
  getCount(): Promise<number>;
  incrementCount(): Promise<number>;
}

// Example implementation for AWS DynamoDB
// Uncomment and configure when ready to use
/*
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

export class DynamoDBVisitorCounter implements VisitorCounterDatabase {
  private docClient: DynamoDBDocumentClient;
  private tableName: string;
  private itemKey: string;

  constructor() {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.docClient = DynamoDBDocumentClient.from(client);
    this.tableName = process.env.DYNAMODB_TABLE_NAME || "visitor-counter";
    this.itemKey = "site-visitors";
  }

  async getCount(): Promise<number> {
    try {
      const response = await this.docClient.send(
        new GetCommand({
          TableName: this.tableName,
          Key: { id: this.itemKey },
        })
      );
      return response.Item?.count || 0;
    } catch (error) {
      console.error("Error getting count from DynamoDB:", error);
      return 0;
    }
  }

  async incrementCount(): Promise<number> {
    try {
      const response = await this.docClient.send(
        new UpdateCommand({
          TableName: this.tableName,
          Key: { id: this.itemKey },
          UpdateExpression: "SET #count = if_not_exists(#count, :start) + :inc, lastUpdated = :now",
          ExpressionAttributeNames: {
            "#count": "count",
          },
          ExpressionAttributeValues: {
            ":inc": 1,
            ":start": 0,
            ":now": new Date().toISOString(),
          },
          ReturnValues: "ALL_NEW",
        })
      );
      return response.Attributes?.count || 0;
    } catch (error) {
      console.error("Error incrementing count in DynamoDB:", error);
      throw error;
    }
  }
}
*/

// In-memory implementation (for development/demo)
// Replace this with your actual database implementation
class InMemoryVisitorCounter implements VisitorCounterDatabase {
  private count: number = 0;

  async getCount(): Promise<number> {
    return this.count;
  }

  async incrementCount(): Promise<number> {
    this.count += 1;
    return this.count;
  }
}

// Factory function to get the appropriate database implementation
export function getVisitorCounterDB(): VisitorCounterDatabase {
  const dbType = process.env.DATABASE_TYPE || 'memory';

  switch (dbType) {
    case 'dynamodb':
      // return new DynamoDBVisitorCounter();
      throw new Error('DynamoDB implementation not yet configured. Uncomment the code above and install @aws-sdk packages.');
    case 'memory':
    default:
      return new InMemoryVisitorCounter();
  }
}
