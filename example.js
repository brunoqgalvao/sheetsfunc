const SheetsFunc = require('./sheetsFunc');

async function main() {
    const sheetsUrl = 'https://docs.google.com/spreadsheets/d/1mRVAUy-XbG5L9e86kb2GpwqfBq65MbhFkQlWjWdOiRw/edit#gid=0';
    const authFile = './key.json';
    
    const inputs = {"numero_1":"Sheet1!A1","numero_2":"Sheet1!A2"};
    const outputs = {"output_1":"Sheet1!B1:5"};
    const myFunction = await SheetsFunc.createSheetsFunction(sheetsUrl, authFile, inputs, outputs);


    const outputDict = await myFunction({"numero_1":[[1]], "numero_2":[['3']]});
    console.log(outputDict);

  }

  main()