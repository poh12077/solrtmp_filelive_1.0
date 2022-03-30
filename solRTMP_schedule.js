const xlsx = require( "xlsx" );
var fs = require('fs');

let file_name = '삼성_국내_202204.xlsx';

//samsungTV_domestic =1
//samsungTV_northern_america =2
//plutoTV =3
//plutoTV_1080p =4

let num=1;
excel = xlsx.readFile( file_name );

let read_excel = (i) =>
{
    const sheet_name = excel.SheetNames[i];          
    const sheet_data = excel.Sheets[sheet_name];     
    
    let json = xlsx.utils.sheet_to_json( sheet_data );
    return json;
}

class templete 
{
    constructor(x)
    {
      let schedule_samsung =
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
            "reconnect_timeout": 300,
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
          "schedule": {
            "loop": true,
            "sync_timeout": 2,
            "range_start_by": "front",
            "auto_adaptive_mapping": "media",
            "list": [
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
      
      let schedule_pluto =
      {
        "server_id": "manager_1234",
        "command": "ch_add",
        "channel": {
          "id": "2c56c2b9_aa3a_409e_a99b_37b01a746233",
          "version": "v1",
          "category": "live",
          "input": {
            "type": "schedule",
            "socket_timeout": 3,
            "reconnect_timeout": 300,
            "streams": [
              {
                "adaptive_id": "1080p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_1080p.mp4"
                ]
              },
              {
                "adaptive_id": "720p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_720p.mp4"
                ]
              },
              {
                "adaptive_id": "480p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_480p.mp4"
                ]
              },
              {
                "adaptive_id": "360p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_360p.mp4"
                ]
              },
              {
                "adaptive_id": "270p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_270p.mp4"
                ]
              }
            ],
            "subs": [
              {
                "name": "english",
                "lang": "eng",
                "default": true
              }
            ]
          },
          "schedule": {
            "loop": true,
            "sync_timeout": 2,
            "range_start_by": "front",
            "auto_adaptive_mapping": "media",
            "list": []
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
              "ad_marker": "scte35all",
              "subtitle": "cea708",
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
              ],
              "cmaf": {
                "enable": false,
                "support_relay": false,
                "chunk_interval": 500
              },
              "drm": {
                "encryption_type": "none",
                "key_info": [
                  {
                    "name": "key",
                    "value": "31323334353637383930616263646566"
                  }
                ],
                "ro_server": [
                  {
                    "ro_type": "normal",
                    "version": "1",
                    "url": "http://localhost:8080/test.key",
                    "provider": "SolBox Inc."
                  }
                ]
              }
            }
          }
        }
      }

      let schedule_pluto_1080p=
      {
        "server_id": "manager_1234",
        "command": "ch_add",
        "channel": {
          "id": "2c56c2b9_aa3a_409e_a99b_37b01a746233",
          "version": "v1",
          "category": "live",
          "input": {
            "type": "schedule",
            "socket_timeout": 3,
            "reconnect_timeout": 300,
            "streams": [
              {
                "adaptive_id": "1080p",
                "variant": true,
                "urls": [
                  "file:///usr/service/stg/solrtmp/file/default_1080p.mp4"
                ]
              },
            ],
            "subs": [
              {
                "name": "english",
                "lang": "eng",
                "default": true
              }
            ]
          },
          "schedule": {
            "loop": true,
            "sync_timeout": 2,
            "range_start_by": "front",
            "auto_adaptive_mapping": "media",
            "list": []
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
              "ad_marker": "scte35all",
              "subtitle": "cea708",
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
              ],
              "cmaf": {
                "enable": false,
                "support_relay": false,
                "chunk_interval": 500
              },
              "drm": {
                "encryption_type": "none",
                "key_info": [
                  {
                    "name": "key",
                    "value": "31323334353637383930616263646566"
                  }
                ],
                "ro_server": [
                  {
                    "ro_type": "normal",
                    "version": "1",
                    "url": "http://localhost:8080/test.key",
                    "provider": "SolBox Inc."
                  }
                ]
              }
            }
          }
        }
      }
  
      if (x=='samsung')
      {
        return schedule_samsung;
      }
      else if(x=='pluto')
      {
        return schedule_pluto;
      }
      else if (x=='pluto_1080p')
      {
        return schedule_pluto_1080p;
      }
    }
}

let time_converter = (x) =>
{
  if(typeof(x)=='string')
  {
    y=x.split(':');
    time = ( parseInt(y[0])*3600 + parseInt(y[1])*60 + parseInt(y[2]) ) *1000 ;
    return time;
  }
  else if (typeof(x)=='number')
  {
    return x;
  }
  else
  {
    console.log('time is wierd');
    return x;
  }
}

let samsung_smartTV = (json)=>
{
    for (let i=0;i<json.length;i++)
    {
        if(json[i].id !== undefined)
        {
             let a = json[i].id.split('_');
             json[i].id = json[i].id.slice(0, -( a[a.length-1].length +1) );
        }
    }
    return json;
}

let write_json_samsungTV_domestic = (json,k,file_name) =>
{

  let n=1;
  let schedule = new templete('samsung');

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
                  "end":  600000*(j+1) 
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
  file_name = file_name.split('.')[0];
  file_name = '202204_' + file_name + '_' + k.toString() + '.json';  
  let file_json = JSON.stringify(schedule, null, "\t");
  fs.writeFile( './json/' + file_name, file_json , function(err) 
  {
      if (err) 
      {
          console.log(err);
      }
  });
}

let write_json_samsungTV_northern_america = (json,file_name) =>
{

  let n=1;
  let schedule = new templete('samsung');
  
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
              "end": 900000
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
              "end": 900000
              }
          }
          schedule.channel.schedule.list.push(video);
      }

      let advertisement =
      {
          "id": "schid_ad_" + n.toString() + "_1" ,
          "ch_id": "cocos_ad_60s_us",
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
          if(json[i]['__EMPTY'] < 900000*(j+1) )
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
                  "start":  900000*j,
                  "end":  900000*(j+1) 
                  }
              }
          let advertisement =
              {
                  "id": "schid_ad_" + n.toString() + "_" + (j+1).toString(),
                  "ch_id": "cocos_ad_60s_us", 
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
                  "start": 900000*m,
                  "end": json[i]['__EMPTY'],
              }
          }
      
          schedule.channel.schedule.list.push(video);
          n++;
      }
  }

  n=1;
  file_name = file_name.split('.')[0];
  file_name = '202204_' + file_name + '.json';  
  let file_json = JSON.stringify(schedule, null, "\t");
  fs.writeFile( './json/' + file_name, file_json , function(err) 
  {
      if (err) 
      {
          console.log(err);
      }
  });
}

let write_json_plutoTV = (json,file_name) =>
{
    n=1;
    let schedule = new templete('pluto');

      for (let i=0;i<json.length;i++)
      {
          if(json[i]['id']!=undefined)
          {
            if(json[i]['__EMPTY']<10000)
            {
              if(n==1)
                {
                    let video =
                    {
                        "start_date": "20220323T15:00:00",
                        "id": "schid_" + n.toString() + "_1" ,
                        "ch_id": "cocos_program_" + json[i].id,
                        "range": 
                        {
                          "start": 0,
                          "end": time_converter(json[i]['__EMPTY']),
                        }
                    }
                    schedule.channel.schedule.list.push(video);
                    n++;
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
                          "end": time_converter(json[i]['__EMPTY']),
                        }
                    }
                    schedule.channel.schedule.list.push(video);
                    n++;
                }
            }
            else
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
                    "ch_id": "cocos_ad_120s_us",
                    "range": 
                    {
                            "start": 0,
                            "end": 120000
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
                          "ch_id": "cocos_ad_120s_us",
                          "range": 
                          {
                                  "start": 0,
                                  "end": 120000
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
      }
      n=1;
      file_name = file_name.split('.')[0];
      file_name = '202204_' + file_name + '.json';  
      let file_json = JSON.stringify(schedule, null, "\t");
      fs.writeFile( './json/' + file_name, file_json , function(err) 
      {
          if (err) 
          {
              console.log(err);
          }
      });
}

let write_json_plutoTV_1080p = (json,file_name) =>
{
    n=1;
    let schedule = new templete('pluto_1080p');

    for (let i=0;i<json.length;i++)
      {
          if(json[i]['id']!=undefined)
          {
            if(json[i]['__EMPTY']<10000)
            {
                if(n==1)
                {
                  let video =
                  {
                      "start_date": "20220323T15:00:00",
                      "id": "schid_" + n.toString() + "_1" ,
                      "ch_id": "cocos_program_" + json[i].id,
                      "range": 
                      {
                        "start": 0,
                        "end": time_converter(json[i]['__EMPTY']),
                      }
                  }
                  schedule.channel.schedule.list.push(video);
                  n++;
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
                        "end": time_converter(json[i]['__EMPTY']),
                      }
                  }
                  schedule.channel.schedule.list.push(video);
                  n++;
                }
            }
            else
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
                    "ch_id": "cocos_ad_120s_us",
                    "range": 
                    {
                            "start": 0,
                            "end": 120000
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
                          "ch_id": "cocos_ad_120s_us",
                          "range": 
                          {
                                  "start": 0,
                                  "end": 120000
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
      }
      n=1;
      file_name = file_name.split('.')[0];
      file_name = '202204_' + file_name + '_1080p' + '.json';  
      let file_json = JSON.stringify(schedule, null, "\t");
      fs.writeFile( './json/' + file_name, file_json , function(err) 
      {
          if (err) 
          {
              console.log(err);
          }
      });
}

let json;

for(let k=0;k<excel.SheetNames.length;k++)
{
    json = read_excel(k);
    
    if(num==1)
    {
      json = samsung_smartTV(json);
      write_json_samsungTV_domestic(json,k,file_name);
    }
    else if(num==2)
    {
      json = samsung_smartTV(json);
      write_json_samsungTV_northern_america(json,file_name);
    }
    else if (num==3)
    {
      write_json_plutoTV(json,file_name);
    }
    else if (num==4)
    {
      write_json_plutoTV_1080p(json,file_name);
    }
}
