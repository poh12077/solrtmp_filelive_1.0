const xlsx = require( "xlsx" );
let fs = require('fs');

let file_name = 'PlutoTV_4월편성_CC_220322.xlsx';
excel = xlsx.readFile( file_name );

let read_excel = (i) =>
{
    const sheet_name = excel.SheetNames[i];          
    const sheet_data = excel.Sheets[sheet_name];     
    
    // let json = xlsx.utils.sheet_to_json( sheet_data, { defval : "" } );
    let json = xlsx.utils.sheet_to_json( sheet_data );
    return json;
}

let duplication_eliminate = (json) =>
{
    let id_set=[];
    for (let i=0;i<json.length;i++)
    {
        if(json[i].id !== undefined)
        {
            id_set.push(json[i].id);  
        }
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


let json;

for(let k=0;k<excel.SheetNames.length;k++)
{
    json = read_excel(k);
   json = duplication_eliminate(json);

   for(let i=0;i<json.length;i++)
   {
        file_name = json[i].id;
        file_name ='./json/' + file_name + '.json';
        fs.readFile(file_name, 'utf8', 
        function(err, data) 
        { 
            console.log(data); 
        });
        
   }

}

