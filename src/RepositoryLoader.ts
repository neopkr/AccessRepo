import { Octokit } from "@octokit/rest";

class Repository {
    private authKey: string;
    private author: string;
    private repository: string;
    private kit: Octokit;
    private data: any;
    private eventHandlers: { [eventName: string]: (() => void)[] };

    constructor(authKey: string, author: string, repository: string) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new Octokit({
            auth: this.authKey
        });
        this.data = null;
        this.eventHandlers = {};
    }

    public init(): void {
        this.kit.repos.get({
            owner: this.author,
            repo: this.repository,
        })
            .then(response => {
                this.data = response.data;
                this.triggerEvent("initialized"); // Dispara el evento "initialized"
            })
            .catch(error => {
                console.error("Error occurred during initialization:", error);
            });
    }

    public RepoURL(): string {
        if (this.data) {
            return this.data.html_url;
        }
        return "Data cannot be loaded: undefined";
    }

    public on(eventName: string, handler: () => void): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    private triggerEvent(eventName: string): void {
        const handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(handler => handler());
        }
    }
}

class RepositoryDirectory {
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
    }

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

module.exports = { Repository, RepositoryDirectory };