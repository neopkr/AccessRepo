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
    }
  
    public async init(): Promise<void> {
      try {
        const response = await this.kit.repos.get({
          owner: this.author,
          repo: this.repository,
        });
        this.data = response.data;
        this.triggerEvent("initialized"); // Dispara el evento "initialized"
      } catch (error) {
        console.error("Error occurred during initialization:", error);
        throw error;
      }
    }
  
    public RepoURL(): string {
      if (this.data) {
        return this.data.html_url;
      }
      return "Data cannot be loaded: undefined";
    }
  
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
    public License(): any {
      return {
        license: this.data?.license
      };
    }
  
    /**
     * Retorna los datos del dueño del repositorio.
     * @returns {Array} Un array de elementos que contiene los datos del Owner del repositorio.
     */
    public Owner(): any {
      return {
        owner: this.data?.owner,
      };
    }
  
    private triggerEvent(eventName: string): void {
      // Lógica de eventos aquí (opcional)
    }
  }

class Loader {
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

export { Repository, Loader }