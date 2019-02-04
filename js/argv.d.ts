export declare class Argv {
    private argv;
    get(parameter: string): string | boolean;
    has(parameter: string): boolean;
    index(parameter: string): number;
    at(index: number): string;
    static register(id: string, argv: string[]): Argv;
    static get(id: string): Argv;
}
