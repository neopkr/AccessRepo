import { Octokit } from "@octokit/rest";

class Repository {
    private authKey: string;
    private author: string;
    private repository: string;
    private kit: Octokit;
    private data: any;

    constructor(authKey: string, author: string, repository: string) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new Octokit({
            auth: this.authKey
        });
        this.data = null;
        this.init();
    }

    public async init(): Promise<void> {
        try {
            const response = await this.kit.repos.get({
                owner: this.author,
                repo: this.repository,
            });
            this.data = response.data;
        } catch (error) {
            console.error("Error occurred during initialization:", error);
            throw error;
        }
    }

    /**
     * Returns the repository ID
     * @returns {Array} id: {}
     */
    public async getID(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                id: this.data?.id
            }
        }
    }

    /**
     * Returns the repository name
     * @returns {Array} name: {}
     */
    public async getName(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                name: this.data?.name
            }
        }
    }

    /**
     * Returns the repository description
     * @returns {Array} description: {}
     */
    public async getDescription(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                description: this.data?.description
            }
        }
    }

    /**
     * Returns the repository language
     * @returns {Array} language: {}
     */
    public async getLanguage(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                language: this.data?.language
            }
        }
    }

    /**
     * Returns the repository visibility
     * @returns {Array} visibility: {}
     */
    public async getVisibility(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                visibility: this.data?.visibility
            }
        }
    }

    /**
     * Returns the subscribers of the repository
     * @returns {number}
     */
    public async getSuscribers(): Promise<number> {
        await this.init();
        if (this.data) {
            return this.data?.subscribers_count
        }
    }

    /**
     * Returns the Forks of the repository
     * @returns {number}
     */
    public async getForks(): Promise<number> {
        await this.init();
        if (this.data) {
            return this.data?.forks
        }
    }

    /**
     * Returns the watchers of the repository
     * @returns {number}
     */
    public async getWatchers(): Promise<number> {
        await this.init();
        if (this.data) {
            return this.data?.watchers
        }
    }

    /**
     * Returns the actual topics of the repository
     * @returns {Array} topics: {}
     */
    public async getTopics(): Promise<any> {
        await this.init();
        return {
            topics: this.data?.topics
        };
    }

    /**
     * Returns the repository is private
     * @returns {boolean}
     */
    public async isPrivate(): Promise<boolean> {
        await this.init();
        if (this.data) {
            if (this.data?.private === false) {
                return false
            }
            return true;
        }
    }

    /**
     * Returns the html_url of the repository
     * @returns {Array} url: {}
     */
    public async getURL(): Promise<any> {
        await this.init();
        if (this.data) {
            return {
                url: this.data?.html_url
            }
        }
        throw new Error("Data cannot be loaded: undefined");
    }

    /**
     * Returns the actual license of the repository
     * @returns {Array} license: {}
     */
    public async getLicense(): Promise<any> {
        await this.init();
        return {
            license: this.data?.license
        };
    }

    /**
     * Returns the owner information of the repository
     * @returns {Array} owner: {}
     */
    public async getOwner(): Promise<any> {
        await this.init();
        return {
            owner: this.data?.owner,
        };
    }
}

class Loader {
    private authKey: string;
    private author: string;
    private repository: string;
    private kit: Octokit;

    constructor(authKey: string, author: string, repository: string) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new Octokit({
            auth: this.authKey
        });
    }
    /*
    * @returns an object with the follow struct:
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
    public async ReadFile(pathFile: string): Promise<any | null> {
        try {
            const response = await this.kit.request(`GET /repos/{owner}/{repo}/contents/{path}`, {
                owner: this.author,
                repo: this.repository,
                path: pathFile,
            });

            const fileData = response.data as {
                type: "file" | "dir" | "submodule" | "symlink";
                size: number;
                name: string;
                path: string;
                content?: string | undefined;
                sha: string;
                url: string;
                git_url: string | null;
                html_url: string | null;
                download_url: string | null;
                _links: {
                    self: string;
                    git: string;
                    html: string;
                };
            };

            if (fileData.type === 'file' && fileData.content) {
                const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
                const data = {
                    "name": fileData.name,
                    "path": fileData.path,
                    "download_url": fileData.download_url,
                    "html_url": fileData.html_url,
                    "content": decodedContent,
                    "links": fileData._links,
                }
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error occurred while reading file:", error);
            throw error;
        }
    }
}

export { Repository, Loader }