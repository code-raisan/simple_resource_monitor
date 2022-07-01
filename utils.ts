import fs from "fs"
import express from "express";
import osu from "node-os-utils";


const getResource = async () =>{
    const cpuUsage = await osu.cpu.usage();
    const cpuTemp: string = fs.readFileSync("/sys/class/thermal/thermal_zone0/temp").toString();
    const memoryInfo = await osu.mem.info();
    const uptime = osu.os.uptime();
    //const driveInfo = await osu.drive.info();
    //const netStatus = await osu.netstat.stats();
    return {
        cpu_used: cpuUsage,
        cpu_temp: Number(cpuTemp)/100,
        memory_info: memoryInfo,
        uptime: uptime,
        //drive_info: driveInfo,
        //net_info: netStatus,
        timestamp: (new Date()).getTime()
    };
};

const sendResource = (Response: express.Response, RefreshRate: number) =>{
    setInterval(async () =>{
        const resources = await getResource();
        const json = JSON.stringify(resources);
        Response.write(`data: ${json}\n\n`);
    }, RefreshRate);
};

export { sendResource };