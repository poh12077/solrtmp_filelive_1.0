const xlsx = require( "xlsx" );
var fs = require('fs');
const { fileURLToPath } = require("url");

let file_name = 'pluto.xlsx';

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

let write_json = (json) =>
{
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
                        "adaptive_id": "1080p",
                        "urls": [
                        "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/B120214099_994300_g60_t35.mp4"
                        ]
                    },
                    {
                        "adaptive_id": "720p",
                        "urls": [
                        "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/B120214099_994300_g60_t34.mp4"
                        ]
                    },
                    {
                        "adaptive_id": "480p",
                        "urls": [
                        "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav//CLIP/COCOS/SST/B120214099/994300/B120214099_994300_g60_t33.mp4"
                        ]
                    },
                    {
                        "adaptive_id": "360p",
                        "urls": [
                        "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/B120214099_994300_g60_t32.mp4"
                        ]
                    },
                    {
                        "adaptive_id": "270p",
                        "urls": [
                        "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/B120214099_994300_g60_t31.mp4"
                        ]
                    }
                ]
            }
        }
    }

    for (let i=0;i<json.length;i++)
    {
        templete.channel.id = json[i].id;
        
        templete.channel.input.streams[0].urls = ["http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/" + json[i]['1080p'] ];
        templete.channel.input.streams[1].urls = ["http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/" + json[i]['720p'] ];
        templete.channel.input.streams[2].urls = ["http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav//CLIP/COCOS/SST/B120214099/994300/" + json[i]['480p'] ];
        templete.channel.input.streams[3].urls = ["http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/" + json[i]['360p'] ];
        templete.channel.input.streams[4].urls = ["http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav/CLIP/COCOS/SST/B120214099/994300/" + json[i]['240p'] ];

        let file_name = templete.channel.id;  
        let file_json = JSON.stringify(templete);
            fs.writeFile( './json/' + file_name, file_json , function(err) {
                if (err) {
                    console.log(err);
                }
            });
    }
}


let json = read_excel(file_name);
json = duplication_eliminate(json);
write_json(json);
