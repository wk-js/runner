#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const argv_1 = require("./argv");
class Main {
    static main() {
        argv_1.Argv.register('process', process.argv.slice(2));
        const argv = argv_1.Argv.get('process');
        const pkg = utils_1.get_package();
        const scripts = Object.assign({}, pkg.runner.scripts, pkg.scripts);
        if (argv.has('--help') || argv.has('-h')) {
            console.log('--list, --tasks, -T           List available tasks');
            console.log('--help, -h                Display help');
            return;
        }
        if (argv.has('--list') || argv.has('--tasks') || argv.has('-T')) {
            console.log(scripts);
            return;
        }
        const command_name = argv.at(0);
        const command = scripts[command_name];
        if (command == null) {
            console.log(`[!!] Command "${command_name}" does not exist`);
            return;
        }
        utils_1.environment(pkg.runner.environments);
        utils_1.exec(command);
    }
}
Main.main();
