var fs = require('fs');

let file = fs.readFileSync('test_solrtmp_pluto.log', 'utf8');
//let data = fs.readFileSync('test_solrtmp_samsung.log', 'utf8');

let full_log = [];
full_log = file.split('\n');

let log ={

}

class line{
    constructor(time,video_id){
        this.time =time;
        this.video_id = video_id;
    }
}

let channel_list=[];

for (let i = 0; i < full_log.length; i++) {
    let index = full_log[i].indexOf(' play=');
    if (index != -1) {
        let time = full_log[i].substr(0, 19);
        let channel_id = full_log[i].substr(full_log[i].indexOf('(id=')).split('/')[0].substr(4);
        if(  !(channel_list.includes(channel_id)) )
        {
           channel_list.push(channel_id);
           log[channel_id]=[];
        }      
        let video_id = full_log[i].substr(full_log[i].indexOf('(main:')).split('/')[0].substr(6);

        log[channel_id].push(new line(time, video_id));
    }
}

for (let x in log)
{
    for(let i=0;i<log[x].length;i++)
    {
        console.log(x + ' ' + log[x][i].time + ' ' + log[x][i].video_id);
    }
}