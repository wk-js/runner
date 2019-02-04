import { statSync, readFileSync } from "fs";
import { spawn } from "child_process";
import { join, extname } from "path";

interface IRunnerPackage {
  scripts: Record<string, string>
  runner: {
    scripts: Record<string, string>
    environments: Record<string, string>
    bins: string[]
  }
}

export function exists(path: string) {
  try {
    statSync( path )
  } catch(e) {
    return false
  }
  return true
}

function _exec(cmd: string, bin_path: string) {
  return new Promise((resolve, reject) => {
    const args = cmd.split(' ')
    let command = join(bin_path, args.shift() as string)
    const ps = spawn(command, args)
    ps.stdout.pipe(process.stdout)
    ps.stderr.pipe(process.stderr)
    ps.stdin.pipe(process.stdin)
    ps.on('close', function(code: number, signal: string) {
      resolve(code == 0)
    })
  })
}

export async function exec(cmd: string, bin_paths: string[] = []) {
  let i = 0
  while (i < bin_paths.length) {
    const success = await _exec(cmd, bin_paths[i])
    if (success) break;
    i++
  }
}

export function environment(environment: Record<string, string>) {
  Object.keys(environment).forEach((key) => {
    process.env[key] = environment[key]
  })
}

export function get_path(p: string) {
  return join(process.cwd(), p)
}

export function load_path(p: string) {
  p = get_path(p)

  if (exists(p)) {
    const content = readFileSync(p, { encoding: 'utf-8' })
    if (extname(p) == '.json') {
      return JSON.parse(content)
    }
    return content
  }

  return null
}

export function get_package() {
  const pkg = load_path('package.json')

  let defaults: IRunnerPackage = {
    scripts: {},
    runner: {
      scripts: {},
      environments: {},
      bins: [
        '',
        join(process.cwd(), 'node_modules', '.bin')
      ]
    }
  }

  if (pkg) defaults = Object.assign(defaults, pkg)

  return defaults
}
