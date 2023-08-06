declare class Repository {
    private authKey;
    private author;
    private repository;
    private kit;
    private data;
    constructor(authKey: string, author: string, repository: string);
    init(): Promise<void>;
    /**
     * Returns the repository ID
     * @returns {Array} id: {}
     */
    getID(): Promise<any>;
    /**
     * Returns the repository name
     * @returns {Array} name: {}
     */
    getName(): Promise<any>;
    /**
     * Returns the repository description
     * @returns {Array} description: {}
     */
    getDescription(): Promise<any>;
    /**
     * Returns the repository language
     * @returns {Array} language: {}
     */
    getLanguage(): Promise<any>;
    /**
     * Returns the repository visibility
     * @returns {Array} visibility: {}
     */
    getVisibility(): Promise<any>;
    /**
     * Returns the subscribers of the repository
     * @returns {number}
     */
    getSuscribers(): Promise<number>;
    /**
     * Returns the Forks of the repository
     * @returns {number}
     */
    getForks(): Promise<number>;
    /**
     * Returns the watchers of the repository
     * @returns {number}
     */
    getWatchers(): Promise<number>;
    /**
     * Returns the actual topics of the repository
     * @returns {Array} topics: {}
     */
    getTopics(): Promise<any>;
    /**
     * Returns the repository is private
     * @returns {boolean}
     */
    isPrivate(): Promise<boolean>;
    /**
     * Returns the html_url of the repository
     * @returns {Array} url: {}
     */
    getURL(): Promise<any>;
    /**
     * Returns the actual license of the repository
     * @returns {Array} license: {}
     */
    getLicense(): Promise<any>;
    /**
     * Returns the owner information of the repository
     * @returns {Array} owner: {}
     */
    getOwner(): Promise<any>;
}
declare class Loader {
    private authKey;
    private author;
    private repository;
    private kit;
    constructor(authKey: string, author: string, repository: string);
    ReadFile(pathFile: string): Promise<any | null>;
    getWorkflow(workflow: any): Promise<"failed" | "pending" | "success" | "not_found">;
}
export { Repository, Loader };
