const xlsx = require( "xlsx" );
var fs = require('fs');
const { fileURLToPath } = require("url");

let file_name = '솔박스_202204.xlsx';
 
// samsung smartTV ==1
// PlutoTV ==2
let n=3;

let read_excel = (file_name) =>
{
    const excel = xlsx.readFile( file_name );
    const sheet_name = excel.SheetNames[0];          
    const sheet_data = excel.Sheets[sheet_name];     
    
    // let json = xlsx.utils.sheet_to_json( sheet_data, { defval : "" } );
    let json = xlsx.utils.sheet_to_json( sheet_data );
    return json;
}

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

//read every resolution from the excel file
let read_resolution = (json) =>
{
    let resolution=[];
    for(j in json[0])
    {   
        if( !isNaN(parseInt(j.slice(0,-1))) && (j.slice(-1)==='p') )    
        {
            resolution.push(j);
        }            
    }
    return resolution;
}

let write_json = (json) =>
{
    let resolution = read_resolution(json);

   let templete =
    {
        "server_id": "manager_1234",
        "command": "ch_add",
        "channel": 
        {
            "id": "",
            "version": "v1",
            "input": 
            {
                "type": "file",
                "socket_timeout": 3,
                "reconnect_timeout": 60,
                "options": 
                {
                    "retry_period": 3,
                    "max_retry_count": 0
                },
                "streams": 
                [
                    {
                        "adaptive_id": resolution[0] ,
                        "urls": [
                        ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[1],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[2],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[3],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[4],
                        "urls": [
                            ""
                        ]
                    }
                ]
            }
        }
    }
    
    let templete_caption =
    {
        "server_id": "manager_1234",
        "command": "ch_add",
        "channel": 
        {
            "id": "",
            "version": "v1",
            "input": 
            {
                "type": "file",
                "socket_timeout": 3,
                "reconnect_timeout": 60,
                "options": 
                {
                    "retry_period": 3,
                    "max_retry_count": 0
                },
                "streams": 
                [
                    {
                        "adaptive_id": resolution[0],
                        "urls": [
                        ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[1],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[2],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[3],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "adaptive_id": resolution[4],
                        "urls": [
                            ""
                        ]
                    },
                    {
                        "name": "english",
                        "type": "subtitle",
                        "lang": "eng",
                        "variant": true,
                        "urls": [
                          ""
                        ]
                      }
                ]
            }
        }
    }

    let base_url="http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav";
    for (let i=0;i<json.length;i++)
    {
        if (json[i]['Caption Path'] === undefined)
        {
            templete.channel.id = "cocos_program_" + json[i].id;
          
            for(let j=0;j<resolution.length;j++)
            {
                templete.channel.input.streams[j].urls = [base_url + json[i][resolution[j]] ];
            }

            let file_name = json[i].id + '.json';  
            let file_json = JSON.stringify(templete, null, "\t");
            fs.writeFile( './json/' + file_name, file_json , function(err) 
            {
                if (err) 
                {
                    console.log(err);
                }
            });
        }else
        {
            templete_caption.channel.id = "cocos_program_" + json[i].id;

            for(let j=0;j<resolution.length;j++)
            {
                templete_caption.channel.input.streams[j].urls = [base_url + json[i][resolution[j]] ];
            }
             templete_caption.channel.input.streams[5].urls = [base_url + json[i]['Caption Path'] ];

            let file_name = json[i].id + '.json';  
            let file_json = JSON.stringify(templete_caption, null, "\t");
            fs.writeFile( './json/' + file_name, file_json , function(err) 
            {
                if (err) 
                {
                    console.log(err);
                }
            });
        }
    }
}

let samsung_smartTV = (json)=>
{
    for (let i=0;i<json.length;i++)
    {
             let a = json[i].id.split('_');
             json[i].id = json[i].id.slice(0, -( a[a.length-1].length +1) );
    }
    return json;
}

let json = read_excel(file_name);
json = duplication_eliminate(json);
if(n==1)
{
   json = samsung_smartTV(json);
}
write_json(json);
