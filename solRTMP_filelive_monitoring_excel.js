const xlsx = require("xlsx");
var fs = require('fs');

// class video_info {
//     constructor(id, end_time, ad_point_1, ad_point_2, ad_point_3, ad_point_4, ad_point_5) {
//         this.id = id;
//         this.end_time = end_time;
//         this.ad_point_1 = ad_point_1;
//         this.ad_point_2 = ad_point_2;
//         this.ad_point_3 = ad_point_3;
//         this.ad_point_4 = ad_point_4;
//         this.ad_point_5 = ad_point_5;
//     }
// }

class video_info {
    constructor(id, end_time) {
        this.id = id;
        this.end_time = end_time;
    }
}


let advertisement={
    start:'',
    end:''
}

//time =　'2012-05-17 10:20:30'　
let fetch_unix_timestamp = (time) =>
{
	return Math.floor(new Date(time).getTime() / 1000);
}


let read_conf = (file_name) => {
    try {
        let conf_file = fs.readFileSync(file_name, 'utf8');
        conf_file = JSON.parse(conf_file);

        let conf = {
            file_name: '',
            option: 0,
            start_date: '',
        }

        conf.file_name = conf_file.file_name;
        conf.option = conf_file.option;
        conf.start_date = fetch_unix_timestamp(conf_file.start_date);

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
        let json = xlsx.utils.sheet_to_json(sheet_data);
        return json;
    } catch (err) {
        console.log('[error] excel read');
        console.log(err);
        process.exit(1);
    }
}


let parser = (json, conf) => {
    let schedule = [];
    let video;
    let end_time = conf.start_date ;
    for (let i = 0; i < json.length; i++) {
        if (json[i].id !== undefined) {
            end_time += json[i]['__EMPTY']; 
            video = new video_info(json[i]['id'], end_time );
            schedule.push(video);
        }
    }
    return schedule;
}


let id_finder =(current_time) =>
{
    
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
        schedule = parser(json, conf);
    }
}

main();
