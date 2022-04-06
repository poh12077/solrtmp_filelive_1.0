const xlsx = require( "xlsx" );
var fs = require('fs');

let data = fs.readFileSync('configure.conf', 'utf8');
data = JSON.parse(data);
let file_name = data.file_name;

let excel = xlsx.readFile( file_name );

let read_excel = (i) =>
{
    const sheet_name = excel.SheetNames[i];          
    const sheet_data = excel.Sheets[sheet_name];     
    let json = xlsx.utils.sheet_to_json( sheet_data );
    return json;
}

let json;
for(let i=0;i<excel.SheetNames.length;i++)
{
    json = read_excel(i);
   
}