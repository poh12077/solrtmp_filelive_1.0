const xlsx = require( "xlsx" );
var fs = require('fs');

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

let json;

json = read_excel(0);
let n = 1;
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


schedule =
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

      
      

for (let i=0;i<json.length;i++)
{
    if(json[i]['Ad Point 1']!=undefined)
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
              "end": time_converter(json[i]['Ad Point 1']),
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
              "end": time_converter(json[i]['Ad Point 1']),
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

      for (let j=1;j<5;j++)
      {
          let video =
            {
                "id": "schid_" + n.toString() + "_" + (j+1).toString(),
                "ch_id": "cocos_program_" + json[i].id,
                "range": 
                {
                  "start": time_converter(json[i]['Ad Point '+ j.toString()]) ,
                  "end": time_converter(json[i]['Ad Point ' + (j+1).toString()]),
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
              "id": "schid_" + n.toString() + "_6" ,
              "ch_id": "cocos_program_" + json[i].id,
              "range": 
              {
                "start": time_converter(json[i]['Ad Point 5']),
                "end": json[i]['__EMPTY'],
              }
          }
    
          schedule.channel.schedule.list.push(video);
          n++;
    }
}

file_name = '202204_' +'PlutoTV_4월편성_CC_220322' + '.json';  
let file_json = JSON.stringify(schedule, null, "\t");
fs.writeFile( './json/' + file_name, file_json , function(err) 
{
    if (err) 
    {
        console.log(err);
    }
});

