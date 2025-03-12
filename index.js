#!/usr/bin/env node

// General Modules
const modules = require("./modules/modules.js");

// User Modules
const tasks = require("./modules/tasks.js");

// Acciones de CLI
tasks.initTask();

modules.program.parse()