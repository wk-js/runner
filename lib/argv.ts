const ARGVS: Record<string, Argv> = {}

export class Argv {

  private argv: string[] = []

  get(parameter: string) {
    const argv = this.argv
    const index = this.index(parameter)

    if (index > -1) {
      const io = argv[index].split(/=/)
      if (io.length == 2) return io[1]

      if (typeof argv[index+1] == 'string' && !argv[index+1].match(/^-/)) {
        return argv[index+1]
      }

      return true
    }

    return false
  }

  has(parameter: string) {
    return this.index(parameter) > -1
  }

  index(parameter: string) {
    const argv = this.argv
    var regex = new RegExp(`${parameter}`)

    for (var i = 0; i < argv.length; i++) {
      if (argv[i].match(regex) != null) {
        return i
      }
    }

    return -1
  }

  at(index: number) {
    return this.argv[index]
  }

  static register(id: string, argv: string[]) {
    const a = new Argv()
    a.argv = argv
    ARGVS[id] = a
    return a
  }

  static get(id: string) {
    return ARGVS[id]
  }

}