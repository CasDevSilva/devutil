// Node Modules
const {Command} = require("commander");
const os = require("os")
const path = require("path");
const fs = require("fs");

const program = new Command();
const BASE_PATH = path.join(os.homedir(), 'devutil');

// Creacion de Directorio General
fs.mkdirSync(BASE_PATH, { recursive: true });

module.exports = {
    Command,
    os,
    path,
    fs,

    program,
    BASE_PATH
}