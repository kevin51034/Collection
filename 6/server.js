const express = require('express');
const bodyParser = require('body-parser');
const googleSheets = require('gsa-sheets');

const key = require('./privateSettings.json');


const SPREADSHEET_ID = 'YOURSPREADSHEET_ID';

const app = express();
const jsonParser = bodyParser.json();
const sheet = googleSheets(key.client_email, key.private_key, SPREADSHEET_ID);

app.use(express.static('public'));

async function onGet(req, res) {
  const result = await sheet.getRows();
  const rows = result.rows;

  this.status = new Array();
  this.items = [];
  for(let i=1;i<rows.length;i++){
    const item = {}  //can't use []
    for(let j=0;j<rows[i].length;j++){
      item[rows[0][j]] = rows[i][j];
    }
    this.items.push(item);
  }
  console.log(this.items);
  res.json(this.items);
}
app.get('/api', onGet);

async function onPost(req, res) {
  const messageBody = req.body;
  const result = await sheet.getRows();
  const rows = result.rows;

  let newRow = new Array;
  for(i=0;i<rows[0].length;i++){
    newRow[i]='';
  }
  for (let key in messageBody) {
    newRow[rows[0].indexOf(key.toLowerCase())] = messageBody[key];
  }
  sheet.appendRow(newRow);
  console.log(rows);
  res.json({
    response: 'success'
  });
}
app.post('/api', jsonParser, onPost);

async function onPatch(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const messageBody = req.body;
  const result = await sheet.getRows();
  const rows = result.rows;
  let temp = 0;
  let index = 0;
  let change = 0;
  const check = rows[0].indexOf(column.toLowerCase());
  if(check>-1){
    for(i=1;i<rows.length;i++){
      if(rows[i][check].toLowerCase() == value.toLowerCase()){
          temp = i;
          for (let key in messageBody) {
            index = rows[0].indexOf(key.toLowerCase());
            if(index>-1){
              rows[temp][index] = messageBody[key];
              change = 1;
            }
          }
          sheet.setRow(i,rows[i]);
      }
      if(change !==0){
        break;
      }
    }
  }
  console.log(rows);
  res.json({
    response: 'success'
  });
}
app.patch('/api/:column/:value', jsonParser, onPatch);

async function onDelete(req, res) {
  const column = req.params.column;
  const value = req.params.value;
  const result = await sheet.getRows();
  const rows = result.rows;
  for(i = 0;i<rows[0].length;i++){
      if(rows[0][i].toLowerCase() == column.toLowerCase()){
        for(let j = 1;j<rows.length;j++){
          if(rows[j][i].toLowerCase() == value.toLowerCase()){
            sheet.deleteRow(j);
            break;
          }
        }
      }
  }
  console.log(rows);
  res.json({
    response: 'success'
  });
}
app.delete('/api/:column/:value', onDelete);


const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server listening on port ${port}!`);
});
