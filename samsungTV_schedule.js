const xlsx = require( "xlsx" );
var fs = require('fs');

let file_name = '삼성스마트TV_국내_4월_202204.xlsx';

excel = xlsx.readFile( file_name );

let read_excel = (i) =>
{
    const sheet_name = excel.SheetNames[i];          
    const sheet_data = excel.Sheets[sheet_name];     
    
    // let json = xlsx.utils.sheet_to_json( sheet_data, { defval : "" } );
    let json = xlsx.utils.sheet_to_json( sheet_data );
    return json;
}
let time_converter = (x) =>
{
  try
  {
    y=x.split(':');
    time = ( parseInt(y[0])*3600 + parseInt(y[1])*60 + parseInt(y[2]) ) *1000 ;
    return time;
  }
  catch(err)
  {
    console.log(err);
    return x;
  }
}


let json;

for(let k=0;k<excel.SheetNames.length;k++)
{
    let schedule =
    {
        "server_id": "manager_1234",
        "command": "ch_add",
        "channel": {
          "id": "ch_id",
          "version": "v1",
          "category": "live",
          "input": {
            "type": "schedule",
            "socket_timeout": 3,
            "reconnect_timeout": 60,
            "streams": [
              {
                "adaptive_id": "1080p",
                "variant": true,
                "urls": [
                  "file:///stg/solrtmp/file/default_1080p.mp4"
                ]
              },
              {
                "adaptive_id": "720p",
                "variant": true,
                "urls": [
                  "file:///stg/solrtmp/file/default_720p.mp4"
                ]
              },
              {
                "adaptive_id": "480p",
                "variant": true,
                "urls": [
                  "file:///stg/solrtmp/file/default_480p.mp4"
                ]
              },
              {
                "adaptive_id": "360p",
                "variant": true,
                "urls": [
                  "file:///stg/solrtmp/file/default_360p.mp4"
                ]
              },
              {
                "adaptive_id": "270p",
                "variant": true,
                "urls": [
                  "file:///stg/solrtmp/file/default_270p.mp4"
                ]
              }
            ]
          },
          "schedule": 
          {
            "loop": true,
            "sync_timeout": 2,
            "range_start_by": "front",
            "auto_adaptive_mapping": "media",
            "list": 
            [
            
            ]
          },
          "output": {
            "base_dir": "%r/%s",
            "clear_when_finish": true,
            "segment_opt": {
              "playlist_chunk_count": 10,
              "max_chunk_count": 30,
              "duration_time": 6,
              "align_by_src": true
            },
            "variant": {
              "memory_caching": false,
              "sort_order": "bandwidth",
              "item": {
                "codec": true,
                "bandwidth": true,
                "resolution": true,
                "framerate": true,
                "sar": false,
                "samplerate": false,
                "channel": false,
                "lang": true
              },
              "output_path": [
                {
                  "o_type": "gateway_m3u8",
                  "combine": "%f/playlist.m3u8"
                },
                {
                  "o_type": "mpd",
                  "combine": "%f/manifest.mpd"
                }
              ]
            },
            "hls": {
              "ad_marker": "scte35enh",
              "memory_caching": false,
              "start_sequence_num": 0,
              "hls_version": 3,
              "output_path": [
                {
                  "o_type": "m3u8",
                  "combine": "%f/%a/chunklist.m3u8"
                },
                {
                  "o_type": "gateway_m3u8",
                  "combine": "%f/%a/playlist.m3u8"
                },
                {
                  "o_type": "ts_segment",
                  "combine": "%f/%a/segment_%n.ts"
                }
              ]
            }
          }
        }
    }

    json = read_excel(k);
    let n = 1;

    for (let i=0;i<json.length;i++)
    {
        if(json[i]['id']!=undefined)
        {

        if (n==1)
        {
            let video =
            {
            "start_date": "20220323T15:00:00",
                "id": "schid_" + n.toString() + "_1" ,
                "ch_id": "cocos_program_" + json[i].id,
                "range": 
                {
                "start": 0,
                "end": 600000
                }
            }
            schedule.channel.schedule.list.push(video);
        }
        else
        {
            let video =
            {
                "id": "schid_" + n.toString() + "_1" ,
                "ch_id": "cocos_program_" + json[i].id,
                "range": 
                {
                "start": 0,
                "end": 600000
                }
            }
            schedule.channel.schedule.list.push(video);
        }

        let advertisement =
        {
            "id": "schid_ad_" + n.toString() + "_1" ,
            "ch_id": "cocos_ad_60s_20210528_2mbps",
            "range": 
            {
                    "start": 0,
                    "end": 60000
            }
        }
        schedule.channel.schedule.list.push(advertisement);

        let m;
        for (let j=1;j>0;j++)
        {
            if(json[i]['__EMPTY'] < 600000*(j+1) )
            { 
                m=j;
                break;
            }

            let video =
                {
                    "id": "schid_" + n.toString() + "_" + (j+1).toString(),
                    "ch_id": "cocos_program_" + json[i].id,
                    "range": 
                    {
                    "start":  600000*j,
                    "end":  6000000*(j+1) 
                    }
                }
            let advertisement =
                {
                    "id": "schid_ad_" + n.toString() + "_" + (j+1).toString(),
                    "ch_id": "cocos_ad_60s_20210528_2mbps",
                    "range": 
                    {
                            "start": 0,
                            "end": 60000
                    }
                }
                schedule.channel.schedule.list.push(video);
                schedule.channel.schedule.list.push(advertisement);
            }

            video =
            {
                "id": "schid_" + n.toString() + "_" + (m+1).toString() ,
                "ch_id": "cocos_program_" + json[i].id,
                "range": 
                {
                    "start": 600000*m,
                    "end": json[i]['__EMPTY'],
                }
            }
        
            schedule.channel.schedule.list.push(video);
            n++;
        }
    }

    n=1;
    file_name = '202204_' +'삼성스마트TV_국내_4월_202204_' + k.toString() + '.json';  
    let file_json = JSON.stringify(schedule, null, "\t");
    fs.writeFile( './json/' + file_name, file_json , function(err) 
    {
        if (err) 
        {
            console.log(err);
        }
    });

}
