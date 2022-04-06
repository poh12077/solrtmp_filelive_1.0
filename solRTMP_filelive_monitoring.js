var fs = require('fs');

let data = fs.readFileSync('test_solrtmp_pluto.log', 'utf8');
//let data = fs.readFileSync('test_solrtmp_samsung.log', 'utf8');

let full_log =[];
full_log = data.split('\n');

class log
{
    constructor(time, channel_id, video_id)
    {
        this.time = time;
        this.channel_id = channel_id;
        this.video_id = video_id;
    }
} 

let log_list = [];

for (let i=0;i<full_log.length;i++)
{
    let index = full_log[i].indexOf('play');
    if(index!=-1)
    {
        let time = full_log[i].substr(0,19);
        let channel_id =  full_log[i].substr( full_log[i].indexOf('(id=') ).split('/')[0].substr(4);
        let video_id = full_log[i].substr( full_log[i].indexOf('(main:') ).split('/')[0].substr(6);
        log_list.push( new log(time, channel_id, video_id) );
    }
}






