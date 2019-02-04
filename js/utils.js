"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const path_1 = require("path");
function exists(path) {
    try {
        fs_1.statSync(path);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.exists = exists;
function _exec(cmd, bin_path) {
    return new Promise((resolve, reject) => {
        const args = cmd.split(' ');
        let command = path_1.join(bin_path, args.shift());
        const ps = child_process_1.spawn(command, args);
        ps.on('close', function (code, signal) {
            resolve(code == 0);
        });
    });
}
function exec(cmd, bin_paths = []) {
    return __awaiter(this, void 0, void 0, function* () {
        let i = 0;
        while (i < bin_paths.length) {
            const success = yield _exec(cmd, bin_paths[i]);
            if (success)
                break;
            i++;
        }
    });
}
exports.exec = exec;
function environment(environment) {
    Object.keys(environment).forEach((key) => {
        process.env[key] = environment[key];
    });
}
exports.environment = environment;
function get_path(p) {
    return path_1.join(process.cwd(), p);
}
exports.get_path = get_path;
function load_path(p) {
    p = get_path(p);
    if (exists(p)) {
        const content = fs_1.readFileSync(p, { encoding: 'utf-8' });
        if (path_1.extname(p) == '.json') {
            return JSON.parse(content);
        }
        return content;
    }
    return null;
}
exports.load_path = load_path;
function get_package() {
    const pkg = load_path('package.json');
    let defaults = {
        scripts: {},
        runner: {
            scripts: {},
            environments: {},
            bins: [
                '',
                path_1.join(process.cwd(), 'node_modules', '.bin')
            ]
        }
    };
    if (pkg)
        defaults = Object.assign(defaults, pkg);
    return defaults;
}
exports.get_package = get_package;
