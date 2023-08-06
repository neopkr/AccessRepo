/**
 * @name Repository
 * @description Read the configuration/repository content from Github
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
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
/**
 * @name Loader
 * @description Read files and workflows from Github repository.
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
declare class Loader {
    private authKey;
    private author;
    private repository;
    private kit;
    constructor(authKey: string, author: string, repository: string);
    /**
    * Read file from Github Repository
    * @returns an object with the follow struct:
    * @example
    * Loader.ReadFile("src/RepositoryLoader.ts")
    * Object {
    *      name: "RepositoryLoader.ts",
    *      description: "",
    *      private: true,
    *      html_url: "https://github.com/neopkr/AccessRepo/blob/main/src/RepositoryLoader.ts",
    *      lang: "typescript",
    *      default_branch: string
    * }
    */
    readFile(pathFile: string): Promise<any | null>;
    /**
     * Retrive Workflow last run information
     * @param workflow Name of your workflow, example: npm-workflow.yml
     * @returns success | failed | pending | not_found
     */
    getWorkflow(workflow: string): Promise<"success" | "failed" | "pending" | "not_found">;
    /**
     * Get the last workflow action run of the repository.
     * @returns [runName, runUrl, runPath, workflowName, workflowStatus]
     * @example
     * Loader.getLastWorkflow() // Get last workflow of AccessRepo
     * ["Node.js Package", ".github/workflows/npm-publish.yml", "https://api.github.com/repos/neopkr/AccessRepo/actions/workflows/63214888", "npm-publish.yml", "success"]
     * @ignore workflowStatus uses getWorkflow() function, returns: success, failed, pending or not_found
     */
    getLastWorkflow(): Promise<any[]>;
}
export { Repository, Loader };
