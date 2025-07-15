/* // schema/BookSchema.js
const { ddbDocClient } = require("../congifDynomdb");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");

const TABLE_NAME = "Book";

class Book {
  static async create({ title, description, price }) {
    const item = {
      id,
      title,
      description,
      price,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: item,
    };

    await ddbDocClient.send(new PutCommand(params));

    return item; // Return the inserted item (including generated id)
  }
}

module.exports = { Book };
 */
/* const { ddbDocClient } = require("../congifDynomdb");
const { PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const BOOKS_TABLE = "Book";
const COUNTERS_TABLE = "Counters";

// Atomically increment the counter and get the next ID as a string
async function getNextBookId() {
  const params = {
    TableName: COUNTERS_TABLE,
    Key: { counterName: "bookId" },
    UpdateExpression: "SET #v = if_not_exists(#v, :zero) + :inc",
    ExpressionAttributeNames: { "#v": "value" },
    ExpressionAttributeValues: { ":inc": 1, ":zero": 0 },
    ReturnValues: "UPDATED_NEW",
  };

  const result = await ddbDocClient.send(new UpdateCommand(params));
  return result.Attributes.value.toString(); // e.g., "1", "2", "3" ...
}

class Book {
  static async create({ title, description, price }) {
    const id = await getNextBookId();

    const item = {
      id,
      title,
      description,
      price,
    };

    const params = {
      TableName: BOOKS_TABLE,
      Item: item,
    };

    await ddbDocClient.send(new PutCommand(params));
    return item;
  }
}
 */

// backend/schema/BookDynamoDb.js
const { ddbDocClient } = require("../congifDynomdb");
const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const BOOKS_TABLE = "Book";

// Create a new book with auto-incremented numeric string id
async function create({ title, description, price }) {
  // Scan to find max id
  const scanParams = {
    TableName: BOOKS_TABLE,
    ProjectionExpression: "id",
  };

  const data = await ddbDocClient.send(new ScanCommand(scanParams));

  // Find max id (parseInt and default to 0)
  let maxId = data.Items.reduce((max, item) => {
    const numId = parseInt(item.id, 10);
    return numId > max ? numId : max;
  }, 0);

  const newId = (maxId + 1).toString();

  const item = {
    id: newId,
    title,
    description,
    price,
  };

  const putParams = {
    TableName: BOOKS_TABLE,
    Item: item,
  };

  await ddbDocClient.send(new PutCommand(putParams));

  return item;
}

// Get all books
async function findAll() {
  const params = {
    TableName: BOOKS_TABLE,
  };
  const data = await ddbDocClient.send(new ScanCommand(params));
  return data.Items || [];
}

module.exports = {
  create,
  findAll,
};
