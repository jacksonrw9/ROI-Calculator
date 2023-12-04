const express = require("express");
const {google} = require("googleapis"); 

const app = express();

app.get("/",async (req,res)=>{
    const auth= new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

   // Create client instance of auth
    const client= await auth.getClient();

    // Instance of Google Sheets API 
    const googleSheets= google.sheets({version: "v4", auth: client });

   const spreadsheetId= "1ZWe1IR_wiDe6L0FtLn5nBO6LyYajAzXbchef1JXJh3g";
   
    //Get meta about spreadsheet
    const metaData= await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });

    //Read rows from spreadsheet 
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    })

    //Write row(s) to spreadsheet
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:G",
        valueInputOption: "USER_ENTERED", 
        resource: {
            values:[
                ["Climet 1070","Clean Room Application", 9, 2, 40000, 2, 7000]
            ]
        },
    });





    res.send(getRows.data);
});

app.listen(1337, (req,res) =>console.log("running on 1337"));
