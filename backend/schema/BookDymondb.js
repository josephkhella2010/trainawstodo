const { ddbDocClient } = require("../congifDynomdb");
const {
  PutCommand,
  ScanCommand,
  DeleteCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");

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

//✅ Delete a book by ID
async function deleteBook(id) {
  const params = {
    TableName: BOOKS_TABLE,
    Key: { id },
  };

  await ddbDocClient.send(new DeleteCommand(params));
  return { message: "Book deleted successfully" };
}
//✅ Delete a book by ID
async function getBookById(id) {
  const params = {
    TableName: BOOKS_TABLE,
    Key: { id },
  };
  const result = await ddbDocClient.send(new GetCommand(params));
  return result.Item;
}
//✅ Delete a book by ID

async function putBook(id, { title, description, price }) {
  const params = {
    TableName: "Book",
    Item: {
      id,
      title,
      description,
      price,
    },
  };

  await ddbDocClient.send(new PutCommand(params));
  return params.Item;
}

module.exports = {
  create,
  findAll,
  deleteBook,
  getBookById,
  putBook,
};
