const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, GetCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

// Initialize DynamoDB client
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "visitor-counter";
const ITEM_KEY = "site-visitors";

// CORS headers
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", // Update this to your domain in production
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Get current visitor count
async function getCount() {
  try {
    const response = await docClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { id: ITEM_KEY },
      })
    );
    return response.Item?.count || 0;
  } catch (error) {
    console.error("Error getting count from DynamoDB:", error);
    throw error;
  }
}

// Increment visitor count
async function incrementCount() {
  try {
    const response = await docClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { id: ITEM_KEY },
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

// Lambda handler
exports.handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2));

  // Handle OPTIONS request for CORS preflight
  if (event.httpMethod === "OPTIONS" || event.requestContext?.http?.method === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  try {
    const method = event.httpMethod || event.requestContext?.http?.method;

    if (method === "GET") {
      // Return current count
      const count = await getCount();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count }),
      };
    } else if (method === "POST") {
      // Increment and return new count
      const count = await incrementCount();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ count }),
      };
    } else {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
