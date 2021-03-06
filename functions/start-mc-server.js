/**
 * Start the Minecraft server, return the external IP, and create a FW rule
 */

//user const, please edit these

const ZONE_NAME = 'us-west2-a';
const VM_NAME = 'mc-server-gcp-test';
const TAG = 'mc-server-gcp-test'; //i just want this to be the same as the vm name
const OWNER_NAME = "@goodraboy";
const MC_PORT = 25565;

//end of user const

const http = require('http');
const Compute = require('@google-cloud/compute');
const compute = Compute();
const zone = compute.zone(ZONE_NAME);
const vm = zone.vm(VM_NAME);
const fwname = 'minecraft-fw-rule-' + Math.floor(new Date() / 1000);

async function get_server_ip() {
    return new Promise(function (resolve, reject) {
        vm.getMetadata(function (err, metadata, apiResponse) {
            resolve(metadata.networkInterfaces[0].accessConfigs[0].natIP);
        });
    });
}

async function check_if_server_is_ready() {
    const server_ip = await get_server_ip();
    const ready = !!server_ip;
    return ready
}

async function sleep(milliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, milliseconds);
    });
}

exports.startInstance = async function startInstance(req, res) {
    // Start the VM
    const zone = compute.zone(ZONE_NAME);
    const vm = zone.vm(VM_NAME);
    console.log('about to start a VM');
    vm.start(function (err, operation, apiResponse) {
        console.log('instance start successfully');
    });
    console.log('the server is starting');
    while (!(await check_if_server_is_ready())) {
        console.log('Server is not ready, waiting 1 second...');
        await sleep(1000);
        console.log('Checking server readiness again...');
    }
    console.log('the server is ready');
    const server_ip = await get_server_ip();

    // Record the function caller's IPv4 address
    console.log(JSON.stringify(req.headers));
    sourceIp = req.get('X-Forwarded-For');
    let callerip = req.query.message || req.body.message || sourceIp;

    // Set the Firewall configs
    const config = {
        protocols: {tcp: [MC_PORT]},
        ranges: [callerip + '/32'],
        tags: [TAG]
    };

    function callback(err, firewall, operation, apiResponse) {
    }

    // Create the Firewall
    compute.createFirewall(fwname, config, callback);

    res.status(200).send(
        `Minecraft Server Started! You are now spending [${OWNER_NAME}]'s hard earned cash! <br />
        The IP address of the Minecraft server is: [${server_ip}:${MC_PORT}]<br />
        Your IP address is [${callerip}]<br />
        A Firewall rule named [${fwname}] has been created for you.`);
};