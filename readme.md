# Google Sheets as Function NPM Module

## Overview

This NPM module allows developers to use Google Sheets as a function in their JavaScript/Node.js projects. The module leverages the Google Sheets API to take input in specific cells, perform operations within the sheet, then read and return results from specified output cells.

### When it can be helpful

This module can be particularly useful when you want to leverage the capabilities of Google Sheets within your Node.js application. For example:

- **Complex calculations**: Google Sheets supports a wide range of functions and formulas for performing complex calculations, which you can use without having to implement them in your own code.
- **Data transformation**: Google Sheets has several built-in tools and functions for transforming data, such as parsing dates or manipulating text.
- **Collaborative scenarios**: Google Sheets enables real-time collaboration, so you can use it as a shared platform for inputting or manipulating data.

### Risks

- **API quota**: Google Sheets API has usage limits. Exceeding these limits could lead to service interruptions.
- **Performance**: Network latency and the time required to process data in Google Sheets can impact performance. It's not suitable for scenarios that require real-time response.
- **Security**: The module uses a service account for authentication, and you need to securely manage its credentials.

### Scalability issues

- **Google Sheets limitations**: A single Google Sheet has a maximum limit of 5 million cells. In addition, Google Sheets may not perform well with very large sheets.
- **Rate limiting**: The Google Sheets API has rate limiting. Sending too many requests in a short period can result in some requests being denied.

## Example Usage

```javascript
const SheetsFunc = require('./sheetsfunc');

async function main() {
  const sheetsUrl = 'https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit#gid=0';
  const authFile = '/path/to/your/service-account-json-file.json';
  
  const inputs = {"input_name":"Sheet1!A1","input_other_name":"Sheet1!A2"};
  const outputs = {"output_name":"Sheet1!B1:B2","output_other_name":"Sheet2!B3"};
  
  const myFunction = await SheetsFunc.createSheetsFunction(sheetsUrl, authFile, inputs, outputs);
  
  const inputDict = {"input_name":[['Hello']], "input_other_name":[['World']]};
  const outputDict = await myFunction(inputDict);
  
  console.log(outputDict);
}

main();
```


## Creating a Google Service Account

### 1. Go to the Google Cloud Console

Visit the Google Cloud Console at `https://console.cloud.google.com`.

### 2. Create a new project

Click on the project dropdown and select "New Project". Enter a project name, then click "Create".

### 3. Enable the Google Sheets API

With your new project selected, click "Dashboard" on the left-hand sidebar, then click "+ Enable APIs and Services" at the top of the page. In the API Library, search for "Google Sheets API" and click on it, then click "Enable".

### 4. Create a Service Account

Go back to the dashboard, click "IAM & Admin" in the left-hand sidebar, then click "Service accounts". Click "+ Create Service Account" at the top of the page.

Enter a name and description for your service account, then click "Create".

### 5. Grant Permissions

On the "Service account permissions" page, in the "Select a role" dropdown, select "Project" -> "Editor", then click "Continue".

### 6. Create a JSON Key

Click "+ Create Key" on the "Grant users access to this service account" page. Select "JSON" as the key type, then click "Create". 

This will download a JSON key file to your computer. Keep this file secure, as it contains sensitive information.

### 7. Enable Sheets API Access

Finally, you need to share your Google Sheets with the service account. 

Open the JSON key file and find the "client_email" field. Copy the email address (which should look something like `<name>@<project-id>.iam.gserviceaccount.com`).

Open your Google Sheets in a browser and click the "Share" button. Paste the service account email into the "People" field, then click "Done".

Your service account is now set up and can access the Google Sheets API with the permissions of the Google Sheets you shared with it.
