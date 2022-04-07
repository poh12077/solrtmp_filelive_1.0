const xlsx = require("xlsx");
var fs = require('fs');
const { fileURLToPath } = require("url");

let read_conf = (file_name) => {
    try {
        let conf_file = fs.readFileSync(file_name, 'utf8');
        conf_file = JSON.parse(conf_file);

        let conf = {
            file_name: '',
            option: 0
        }

        conf.file_name = conf_file.file_name;
        conf.option = conf_file.option;
        return conf;
    } catch (err) {
        console.log('[error] configure.conf read');
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

let duplication_eliminate = (json) => {
    try {
        let id_set = [];
        for (let i = 0; i < json.length; i++) {
            if (json[i].id !== undefined) {
                id_set.push(json[i].id);
            }
        }
        let set = new Set(id_set);
        id_set = [...set];

        let json_unique = [];
        for (let i = 0; i < id_set.length; i++) {
            let j = 1;
            while (true) {
                if (id_set[i] == json[j].id) {
                    json_unique.push(json[j]);
                    j = 1;
                    break;
                }
                j++;
            }
        }
        return json_unique;
    } catch (err) {
        console.log('[error] duplication eliminate');
        console.log(err);
        process.exit(1);
    }
}

//read every resolution from the excel file
let read_resolution = (json) => {
    try {
        let resolution = [];
        for (let j in json[0]) {
            if (!isNaN(parseInt(j.slice(0, -1))) && (j.slice(-1) === 'p')) {
                resolution.push(j);
            }
        }
        return resolution;
    } catch (err) {
        console.log('[error] resolution read');
        console.log(err);
        process.exit(1);
    }
}

//test function
let duplication_check = (array) => {
    x = array;
    n = 0;

    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < x.length; j++) {
            if (x[i] == x[j]) {
                n++;
                if (n > 1) {
                    console.log(x[i] + ' ' + x[j]);
                }
            }
        }
        n = 0;
    }
}

let write_json = (json, option) => {
    try {
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

        let templete_pluto_1080p =
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
                                "adaptive_id": '1080p',
                                "urls": [
                                    ""
                                ]
                            }
                        ]
                }
            }
        }

        let templete_caption_pluto_1080p =
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
                                "adaptive_id": '1080p',
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

        let base_url = "http://Y2pjb2Nvc3N0Z0BjamVubXN0b3I6MjU1MmM1MjVhOWRkMTUzNTcwNjFiZTIzMTcyMzRlNjU=@cjcocosstg.x-cdn.com/dav";

        if (option != 4) {
            for (let i = 0; i < json.length; i++) {
                if (json[i]['Caption Path'] === undefined) // no caption
                {
                    templete.channel.id = "cocos_program_" + json[i].id;

                    for (let j = 0; j < resolution.length; j++) {
                        templete.channel.input.streams[j].urls = [base_url + json[i][resolution[j]]];
                    }

                    let file_name = json[i].id + '.json';
                    let file_json = JSON.stringify(templete, null, "\t");
                    fs.writeFileSync('./json/' + file_name, file_json, 'utf8');
                } else //caption
                {
                    templete_caption.channel.id = "cocos_program_" + json[i].id;

                    for (let j = 0; j < resolution.length; j++) {
                        templete_caption.channel.input.streams[j].urls = [base_url + json[i][resolution[j]]];
                    }
                    templete_caption.channel.input.streams[5].urls = [base_url + json[i]['Caption Path']];

                    let file_name = json[i].id + '.json';
                    let file_json = JSON.stringify(templete_caption, null, "\t");
                    fs.writeFileSync('./json/' + file_name, file_json, 'utf8');
                }
            }
        }
        else //pluto_1080p
        {
            for (let i = 0; i < json.length; i++) {
                if (json[i]['Caption Path'] === undefined) //no caption
                {
                    templete_pluto_1080p.channel.id = "cocos_program_" + json[i].id;
                    templete_pluto_1080p.channel.input.streams[0].urls = [base_url + json[i]['1080p']];

                    let file_name = json[i].id + '.json';
                    let file_json = JSON.stringify(templete_pluto_1080p, null, "\t");
                    fs.writeFileSync('./json/' + file_name, file_json, 'utf8');
                } else //caption
                {
                    templete_caption_pluto_1080p.channel.id = "cocos_program_" + json[i].id;
                    templete_caption_pluto_1080p.channel.input.streams[0].urls = [base_url + json[i]['1080p']];
                    templete_caption_pluto_1080p.channel.input.streams[1].urls = [base_url + json[i]['Caption Path']];

                    let file_name = json[i].id + '.json';
                    let file_json = JSON.stringify(templete_caption_pluto_1080p, null, "\t");
                    fs.writeFileSync('./json/' + file_name, file_json, 'utf8');
                }
            }
        }
    } catch (err) {
        console.log('[error] json write');
        console.log(err);
        process.exit(1);
    }
}

let samsung_smartTV = (json) => {
    try {
        for (let i = 0; i < json.length; i++) {
            if (json[i].id !== undefined) {
                let a = json[i].id.split('_');
                json[i].id = json[i].id.slice(0, -(a[a.length - 1].length + 1));
            }
        }
        return json;
    } catch (err) {
        console.log('[error] samsungTV name parse');
        console.log(err);
        process.exit(1);
    }
}

let main = () => {
    let conf = read_conf('configure.conf');
    let excel = xlsx.readFile(conf.file_name);
    let json;
    for (let i = 0; i < excel.SheetNames.length; i++) {
        json = read_excel(excel, i);
        json = duplication_eliminate(json);
        if (conf.option == 1 || conf.option == 2) {
            json = samsung_smartTV(json);
        }
        write_json(json, conf.option);
    }
}

main();
