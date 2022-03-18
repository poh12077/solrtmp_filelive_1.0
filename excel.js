const xlsx = require( "xlsx" );
var fs = require('fs');


// @files 엑셀 파일을 가져온다.

const excel = xlsx.readFile( "pluto.xlsx" );



// @breif 엑셀 파일의 첫번째 시트의 정보를 추출

const sheet_name = excel.SheetNames[0];          
const sheet_data = excel.Sheets[sheet_name];     

// let json = xlsx.utils.sheet_to_json( sheet_data, { defval : "" } );

let json = xlsx.utils.sheet_to_json( sheet_data );

let id_set=[];
for (let i =1;i<json.length;i++)
{
    id_set.push(json[i].id);  
}
let set= new Set(id_set);
id_set = [...set];

let duplication_check=[];
for (let i=0;i<id_set.length;i++)
{
    let j=1;
   while (true)
   {   
       if(id_set[i] == json[j].id )
       {
         duplication_check.push(json[j]);
         j=1;
         break;
       }
       j++;
   }
}

json = duplication_check;


json = JSON.stringify(json);
fs.writeFile("test.json", json , function(err) {
    if (err) {
        console.log(err);
    }
});