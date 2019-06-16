const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static('public'));

let db = null;
async function main() {
  const DATABASE_NAME = 'cs193x-db';
  const MONGO_URL = `mongodb://localhost:27017/${DATABASE_NAME}`;
  //const MONGO_URL = `mongodb://127.0.0.1:27017/${DATABASE_NAME}`;

  // The "process.env.MONGODB_URI" is needed to work with Heroku.
  db = await MongoClient.connect(process.env.MONGODB_URI || MONGO_URL);

  // The "process.env.PORT" is needed to work with Heroku.
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Server listening on port ${port}!`);
  console.log('123');
};

main();

////////////////////////////////////////////////////////////////////////////////



async function createDiary(req, res) {
    console.log('createDiary');
    const doc = {};
    const collection = db.collection('diary');
    const response = await collection.insertOne(doc);
    const id = response.insertedId;
    res.json({ diaryId: id });
}
app.post('/create-diary', createDiary);

async function getDiary(req , res) {
    console.log('getDiary');

    const diaryId = req.params.diaryId;
    //db = await MongoClient.connect(MONGO_URL);
    const collection = db.collection('diary');
    const response = await collection.findOne({ _id: ObjectID(diaryId) });
    res.json(response);
}
app.get('/:diaryId' , getDiary);

async function createEntry(req , res) {
    console.log('createEntry');

    const diaryId = req.body.diaryId;
    const date = req.body.date;
    const prompt = req.body.prompt;
    const contents = req.body.contents;

    //	The modifications to apply
    const doc = {
      diaryId: diaryId,
      date: date,
      prompt: prompt,
      contents: contents
    };
    const collection = db.collection('entry');

    //The selection criteria for the update
    const query = {
        date: date,
        diaryId: diaryId
    };

    //If upsert is true and no document matches the query criteria,
    //update() inserts a single document
    const params = {
        upsert: true
    };
    const response = await collection.update(query, doc, params);
    res.json(doc);
}
app.post('/create-entry', jsonParser, createEntry);

async function getEntry(req , res) {
  console.log('getEntry');

  const date = req.params.month + "/" + req.params.day + "/" + req.params.year;
  const collection = db.collection('entry');
  const response = await collection.findOne({diaryId: req.params.diaryId, date: date});
  res.json(response);
}
app.get('/id/:diaryId/:month/:day/:year', getEntry);


async function getDiaryView(req, res) {
  console.log('getDiaryView');

  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
}
app.get('/id/:diaryId', getDiaryView);
