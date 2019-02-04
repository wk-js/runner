"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ARGVS = {};
class Argv {
    constructor() {
        this.argv = [];
    }
    get(parameter) {
        const argv = this.argv;
        const index = this.index(parameter);
        if (index > -1) {
            const io = argv[index].split(/=/);
            if (io.length == 2)
                return io[1];
            if (typeof argv[index + 1] == 'string' && !argv[index + 1].match(/^-/)) {
                return argv[index + 1];
            }
            return true;
        }
        return false;
    }
    has(parameter) {
        return this.index(parameter) > -1;
    }
    index(parameter) {
        const argv = this.argv;
        var regex = new RegExp(`${parameter}`);
        for (var i = 0; i < argv.length; i++) {
            if (argv[i].match(regex) != null) {
                return i;
            }
        }
        return -1;
    }
    at(index) {
        return this.argv[index];
    }
    static register(id, argv) {
        const a = new Argv();
        a.argv = argv;
        ARGVS[id] = a;
        return a;
    }
    static get(id) {
        return ARGVS[id];
    }
}
exports.Argv = Argv;
