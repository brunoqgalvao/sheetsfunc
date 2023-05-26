
const {google} = require('googleapis');

const SheetsFunc = {
    createSheetsFunction: async function(sheetsUrl, authFile, inputs, outputs) {
      const spreadsheetId = sheetsUrl.split('/')[sheetsUrl.split('/').length-2]; // Extracting ID from URL
  
      // Load the service account key JSON file for each function
      const auth = new google.auth.GoogleAuth({
        keyFile: authFile,
        scopes: [
          'https://www.googleapis.com/auth/spreadsheets',
        ],
      });
  
      // Acquire an auth client, and bind it to all future calls
      const authClient = await auth.getClient();
      google.options({auth: authClient});
  
      const googleSheets = google.sheets({ version: 'v4' });
  
      return async function(inputDict) {
        try{
            // Writing to the input cells
            for (const inputName in inputs) {
                if (inputName in inputDict) {
                await googleSheets.spreadsheets.values.update({
                    spreadsheetId: spreadsheetId,
                    range: inputs[inputName],
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                    values: inputDict[inputName]
                    },
                });
                }
            }

            // Reading from the output cells
            const outputDict = {};
            for (const outputName in outputs) {
                const response = await googleSheets.spreadsheets.values.get({
                spreadsheetId: spreadsheetId,
                range: outputs[outputName]
                });
                outputDict[outputName] = response.data.values;
            }

            return outputDict; // The output
            } catch(e){console.log(e)}
        }
       
    }
  }

module.exports = SheetsFunc;

  
  module.exports = SheetsFunc;
  