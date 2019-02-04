import { get_package, exec, environment } from "./utils";
import { Argv } from "./argv";

class Main {
  static main() {

    Argv.register('process', process.argv.slice(2))
    const argv = Argv.get('process')

    const pkg = get_package()
    const scripts = Object.assign({}, pkg.runner.scripts, pkg.scripts)

    if (argv.has('--help') || argv.has('-h')) {
      console.log('--list, --tasks, -T           List available tasks');
      console.log('--help, -h                Display help');
      return;
    }

    if (argv.has('--list') || argv.has('--tasks') || argv.has('-T')) {
      console.log(scripts)
      return;
    }

    const command_name = argv.at(0)
    const command = scripts[command_name]

    if (command == null) {
      console.log(`[!!] Command "${command_name}" does not exist`);
      return;
    }

    environment(pkg.runner.environments)
    exec(command)

  }
}

Main.main()