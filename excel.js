const xlsx = require( "xlsx" );
var fs = require('fs');

const excel = xlsx.readFile( "pluto.xlsx" );
const sheet_name = excel.SheetNames[0];          
const sheet_data = excel.Sheets[sheet_name];     

// let json = xlsx.utils.sheet_to_json( sheet_data, { defval : "" } );
let json = xlsx.utils.sheet_to_json( sheet_data );

let duplication_eliminate = (json) =>
{
    let id_set=[];
    for (let i =1;i<json.length;i++)
    {
        id_set.push(json[i].id);  
    }
    let set= new Set(id_set);
    id_set = [...set];

    let json_unique=[];
    for (let i=0;i<id_set.length;i++)
    {
        let j=1;
        while (true)
        {   
            if(id_set[i] == json[j].id )
            {
                json_unique.push(json[j]);
                j=1;
                break;
            }
            j++;
        }
    }
    return json_unique;
}

json = duplication_eliminate(json);
json = JSON.stringify(json);

fs.writeFile("test.json", json , function(err) {
    if (err) {
        console.log(err);
    }
});

