import { Octokit } from "@octokit/rest";
import axios, { all } from "axios"

/**
 * @name Repository
 * @description Read the configuration/repository content from Github
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
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

    /**
     * Get current published release versions available of the repository
     * @returns {Array} [...versions]
     */
    public async getPublishedVersions() {
        const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/releases`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${this.authKey}`
                }
            });

            const publishedVersions = response.data
                .filter(release => !release.prerelease)
                .map(release => release.tag_name);

            return publishedVersions;
        } catch (error) {
            console.error('Error trying to get releases versions:', error.message);
            return [];
        }
    }

    /**
     * Get current published pre-release versions available of the repository
     * @returns {Array} [...versions]
     */
    public async getPreReleaseVersions() {
        const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/releases`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${this.authKey}`
                }
            });

            const preReleaseVersions = response.data
                .filter(release => release.prerelease)
                .map(release => release.tag_name);

            return preReleaseVersions;
        } catch (error) {
            console.error('Error trying to get pre-release versions:', error.message);
            return [];
        }
    }

    /**
     * Get all published versions (pre-release and release)
     * @returns {Array} [...versions]
     */
    public async getAllVersions() {
        const releaseVersions = await this.getPublishedVersions();
        const preReleaseVersions = await this.getPreReleaseVersions();

        let allVersions = releaseVersions.concat(preReleaseVersions);
        const uniqueVer = new Set(allVersions);
        allVersions = [...uniqueVer];
        return allVersions;
    }
}

/**
 * @name Loader
 * @description Read files and workflows from Github repository.
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
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
    public async readFile(pathFile: string): Promise<any | null> {
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

    /**
     * Retrieves the content of a file from a specific tree or version.
     * @param tree Tree tag or version from your repository.
     * @param pathFile Path to the file.
     * @returns An object with data such as name, path, content, and URL.
     * @experimental This function may contain bugs.
     */
    public async readFileFromTree(tree: string, pathFile: string): Promise<any | null> {
        try {
            const item = await this.findItemRecursive(tree, pathFile);

            if (item && item.type === 'blob') {
                const fileResponse = await this.kit.request(`GET /repos/{owner}/{repo}/git/blobs/{sha}`, {
                    owner: this.author,
                    repo: this.repository,
                    sha: item.sha,
                });

                const fileData = fileResponse.data as {
                    content: string;
                    encoding: "base64";
                    url: string;
                };

                const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
                const data = {
                    "name": item.path,
                    "path": pathFile,
                    "content": decodedContent,
                    "url": fileData.url,
                };

                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error occurred while reading file from tree:", error);
            throw error;
        }
    }

    private async findItemRecursive(tree: string, filePath: string): Promise<any | null> {
        try {
            const response = await this.kit.request(`GET /repos/{owner}/{repo}/git/trees/{tree_sha}`, {
                owner: this.author,
                repo: this.repository,
                tree_sha: tree,
            });

            const treeData = response.data.tree as Array<{
                type: "blob" | "tree" | "commit";
                path: string;
                mode: string;
                sha: string;
                size?: number;
                url: string;
            }>;

            const parts = filePath.split('/');
            const currentPart = parts.shift();

            if (currentPart) {
                const currentItem = treeData.find(item => item.path === currentPart);

                if (currentItem) {
                    if (parts.length === 0) {
                        return currentItem;
                    } else if (currentItem.type === 'tree') {
                        return this.findItemRecursive(currentItem.sha, parts.join('/'));
                    }
                }
            }

            return null;
        } catch (error) {
            console.error("Error occurred while searching for item:", error);
            throw error;
        }
    }

    /**
     * Retrive Workflow last run information
     * @param workflow Name of your workflow, example: npm-workflow.yml
     * @returns success | failed | pending | not_found
     */
    public async getWorkflow(workflow: string): Promise<"success" | "failed" | "pending" | "not_found"> {
        const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/actions/workflows/${workflow}/runs`;
        try {
            const response = await axios.get(apiUrl, {
                "headers": {
                    Authorization: `token ${this.authKey}`
                }
            });

            if (response.data.workflow_runs && response.data.workflow_runs.length > 0) {
                const latestRun = response.data.workflow_runs[0];
                if (latestRun.status === 'completed') {
                    return latestRun.conclusion === 'success' ? 'success' : 'failed';
                } else {
                    return 'pending';
                }
            } else {
                return 'not_found'
            }
        } catch (error) {
            console.error("Error fetching workflow status: ", error.message);
        }
    }
    /**
     * Get the last workflow action run of the repository.
     * @returns [runName, runUrl, runPath, workflowName, workflowStatus]
     * @example
     * Loader.getLastWorkflow() // Get last workflow of AccessRepo
     * ["Node.js Package", ".github/workflows/npm-publish.yml", "https://api.github.com/repos/neopkr/AccessRepo/actions/workflows/63214888", "npm-publish.yml", "success"]
     * @ignore workflowStatus uses getWorkflow() function, returns: success, failed, pending or not_found
     */
    public async getLastWorkflow(): Promise<any[]> {
        const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/actions/workflows`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `token ${this.authKey}`,
                },
            });

            const workflows = response.data.workflows;
            const lastRuns = []; // Store last run on array

            for (const workflow of workflows) {
                const runsUrl = workflow.url;
                const runName = workflow.name;
                const path = workflow.path;
                const workflowName = String(path).split('/').slice(-1)[0]
                const workflowStatus = await this.getWorkflow(workflowName)

                lastRuns.push(
                    runName,
                    runsUrl,
                    path,
                    workflowName,
                    workflowStatus
                )
            }

            return lastRuns;
        } catch (error) {
            console.error('Error trying to get last workflow status:', error.message);
            return [];
        }
    }
}

export { Repository, Loader }