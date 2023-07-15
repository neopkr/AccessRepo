declare class Repository {
    private authKey;
    private author;
    private repository;
    private kit;
    private data;
    constructor(authKey: string, author: string, repository: string);
    init(): Promise<void>;
    getURL(): any;
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
    getLicense(): any;
    /**
     * Retorna los datos del dueño del repositorio.
     * @returns {Array} Un array de elementos que contiene los datos del Owner del repositorio.
     */
    getOwner(): any;
}
declare class Loader {
    private authKey;
    private author;
    private repository;
    private kit;
    constructor(authKey: string, author: string, repository: string);
    ReadFile(pathFile: string): Promise<any | null>;
}
export { Repository, Loader };
