interface IRunnerPackage {
    scripts: Record<string, string>;
    runner: {
        scripts: Record<string, string>;
        environments: Record<string, string>;
        bins: string[];
    };
}
export declare function exists(path: string): boolean;
export declare function exec(cmd: string, bin_paths?: string[]): Promise<void>;
export declare function environment(environment: Record<string, string>): void;
export declare function get_path(p: string): string;
export declare function load_path(p: string): any;
export declare function get_package(): IRunnerPackage;
export {};
