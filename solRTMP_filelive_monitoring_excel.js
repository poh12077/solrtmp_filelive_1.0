const xlsx = require("xlsx");
var fs = require('fs');

class video_info_pluto {
    constructor(id, end_time, ad_list) {
        this.id = id;
        this.end_time = end_time;
        this.ad_list = ad_list;    
    }
}

//time =　'2012-05-17 10:20:30'　
let fetch_unix_timestamp = (time) => {
    return Math.floor(new Date(time).getTime() / 1000);
}

let time_converter = (x) => {
    try {
      if (typeof (x) === 'string') {
        if (isNaN(Number(x))) {
          y = x.split(':');
          if (y.length != 3) {
           throw new Error();
          }
          time = (parseInt(y[0]) * 3600 + parseInt(y[1]) * 60 + parseInt(y[2])) * 1000;
          return time;
        }
        else {
          return x;
        }
      }
      else if (typeof (x) == 'number') {
        return x;
      }
      else {
       throw new Error();
      }
    }
    catch (err) {
      console.log('[error] time parse');
      console.log(err);
      process.exit(1);
    }
  }
  

let read_conf = (file_name) => {
    try {
        let conf_file = fs.readFileSync(file_name, 'utf8');
        conf_file = JSON.parse(conf_file);

        let conf = {
            file_name: '',
            option: 0,
            start_date: '',
            ad_duration:{
                pluto:'',
                samsung_korea:'',
                samsung_northern_america:''
            }
        }

        conf.file_name = conf_file.file_name;
        conf.option = conf_file.option;
        conf.start_date = fetch_unix_timestamp(conf_file.start_date);
        conf.ad_duration.pluto = conf_file.ad_duration.pluto;

        if (conf.option < 1 || conf.option > 4) {
            throw new Error("[error] configure value");
        }

        return conf;
    } catch (err) {
        console.log('[error] configure.conf ');
        console.log(err);
        process.exit(1);
    }
}

let read_excel = (excel, i) => {
    try {
        const sheet_name = excel.SheetNames[i];
        const sheet_data = excel.Sheets[sheet_name];
        if( (sheet_data.E1.v != 'Ad Point 1') || (sheet_data.F1.v != 'Ad Point 2') 
        || (sheet_data.G1.v != 'Ad Point 3') || (sheet_data.H1.v != 'Ad Point 4') 
        || (sheet_data.I1.v != 'Ad Point 5') )
        {
            throw new Error('[error] excel Ad Point title');
        }
        let json = xlsx.utils.sheet_to_json(sheet_data);
        return json;
    } catch (err) {
        console.log('[error] excel');
        console.log(err);
        process.exit(1);
    }
}


let parser_pluto = (json, conf) => {
    let schedule = [];
    let end_time = conf.start_date;
    let ad_list = [];

    for (let i = 0; i < json.length; i++) {
        if (json[i].id !== undefined) {
            //playtime
            end_time += json[i]['__EMPTY'];
            
            //advertisement 
            for(let k=1;k<6;k++)
            {
                if ( json[i]['Ad Point ' + k.toString()] !=undefined )
                {
                    let ad ={
                        start:'',
                        end:''
                    }
                    end_time += conf.ad_duration.pluto;
                    ad.start = time_converter( json[i]['Ad Point ' + k.toString()] );
                    ad.end = ad.start + conf.ad_duration.pluto;
                    ad_list.push(ad);
                }
            }
            schedule.push( new video_info_pluto(json[i]['id'], end_time, ad_list) ); 
            ad_list=[];
        }
    }
    return schedule;
}


let parser_pluto_ = (json, conf) => {
    let schedule = [];
    let end_time = conf.start_date;
    let ad_list = [];

    for (let i = 0; i < json.length; i++) {
        if (json[i].id !== undefined) {
            //playtime
            end_time += json[i]['__EMPTY'];
            
            //advertisement 
            for(let k=1;k<6;k++)
            {
                if ( json[i]['Ad Point ' + k.toString()] !=undefined )
                {
                    end_time += conf.ad_duration.pluto;
                    let start = time_converter( json[i]['Ad Point ' + k.toString()] );
                    let end = start + conf.ad_duration.pluto;
                    ad_list.push(start);
                    ad_list.push(end);
                }
            }
            schedule.push( new video_info_pluto(json[i]['id'], end_time, ad_list) ); 
            ad_list=[];
        }
    }
    return schedule;
}



let id_finder = (schedule) => {
    try {
        let current_time = Math.floor(new Date().getTime() / 1000);

        if (current_time <= schedule[0].end_time) {
           // the first video is streaming now
            console.log(schedule[0].id);
            return schedule[0].id;
        }
        if(schedule[schedule.length-1].end_time < current_time)
        {
            // the end_time of the last content in the schedule is smaller than the current time
            throw new Error('[error] the end_time of the last content in the schedule is smaller than the current time');
        }
        for (let i = 0; i < schedule.length - 1; i++) {
            if ((schedule[i].end_time < current_time) && (current_time <= schedule[i + 1].end_time)) {
                console.log(schedule[i + 1].id);
                return schedule[i + 1].id;
            }
        }
    } catch (err) {
        console.log(err);
    }
}



let main = () => {
    let conf = read_conf('configure.conf');
    let excel;
    let schedule;

    try {
        excel = xlsx.readFile(conf.file_name);
    } catch (err) {
        console.log('[error] configure.conf file_name');
        console.log(err);
        process.exit(1);
    }
    let json;
    for (let i = 0; i < excel.SheetNames.length; i++) {
        json = read_excel(excel, i);
        schedule = parser_pluto_(json, conf);
        id_finder(schedule);
    }
}

main();
