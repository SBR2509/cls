const fs = require("fs");

//read sync write sync
//read sync write async
//read async write sync
//read async write async

function readWriteSync() {
    console.log('read sync write sync');
    let data = fs.readFileSync('./AFM-source/input.txt', { encoding: 'utf-8', flag: 'r' });
    console.log(`reading and writing the file is completed ${data}`);
    fs.writeFileSync('./AFM-destination/output.txt', data, { encoding: 'utf-8', flag: 'w' });
    console.log("writing the data is completed sync...");

}

function readSyncWriteAsync() {
    console.log('read sync write async');
    let data = fs.readFileSync('./AFM-source/input.txt', { encoding: 'utf-8', flag: 'r' });
    console.log(`reading and writing the file is completed ${data}`);
    fs.writeFile('./AFM-destination/output.txt', data, { encoding: 'utf-8', flag: 'w' }, function(err, data) {
        if (err) {
            console.log("writing the file as failed");
        } else {
            console.log("writing the file is success");
        }
    });
    console.log("writing the data is completed Async...");
}

function readAsynWriteSync() {
    console.log('read Async write sync');
    fs.readFile('./AFM-source/input.txt', { encoding: "utf-8", flag: "r" }, function(err, data) {
        if (err) {
            console.log("Reading the async file is failed");
        } else {
            fs.writeFileSync('./AFM-destination/output.txt', data, { encoding: "utf-8", flag: "w" });
        }
    });
    console.log("Reading async and writing the file sync is completed");
}

function readAsyncWriteAsync() {
    console.log('read the file async');
    fs.readFile('./AFM-source/input.txt', { encoding: 'utf-8', flag: 'r' }, function(err, data) {
        console.log(`${data}`);
        if (err) {
            console.log("Reading the file async is failed");
        } else {
            fs.writeFile('.AFM-destination/output.txt', data, { encoding: 'utf-8', flag: 'w' }, function(err, data) {
                console.log('writing the file async is finished');
            })
        }
    });
    console.log("r and w Async is completed");
}

//readWriteSync();
//readSyncWriteAsync();
//readAsynWriteSync();
readAsyncWriteAsync();