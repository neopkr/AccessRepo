declare module 'Repository' {
    export class Repository {
        constructor(authKey: string, author: string, repository: string);

        public init(): void;
        public RepoURL(): string;
        public License(): any;
        public Owner(): any;
        public on(eventName: string, handler: () => void): void;
    }

    export class Loader {
        constructor(authKey: string, author: string, repository: string);

        public ReadFile(pathFile: string): Promise<any | null>;
    }
}
