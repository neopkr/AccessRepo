declare class Repository {
    private authKey;
    private author;
    private repository;
    private kit;
    private data;
    constructor(authKey: string, author: string, repository: string);
    init(): Promise<void>;
    RepoURL(): string;
    /**
     * Retorna la información básica del repositorio.
     * @returns {Object} Un objeto con la siguiente estructura:
     * @example
     * Object {
     *      name: string,
     *      description: string,
     *      private: boolean,
     *      html_url: string,
     *      lang: string,
     *      default_branch: string
     * }
     */
    License(): any;
    /**
     * Retorna los datos del dueño del repositorio.
     * @returns {Array} Un array de elementos que contiene los datos del Owner del repositorio.
     */
    Owner(): any;
    private triggerEvent;
}
declare class Loader {
    private authKey;
    private author;
    private repository;
    private kit;
    private data;
    constructor(authKey: string, author: string, repository: string);
    ReadFile(pathFile: string): Promise<any | null>;
}
export { Repository, Loader };
