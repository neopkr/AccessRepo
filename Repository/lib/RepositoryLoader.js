"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.Repository = void 0;
const rest_1 = require("@octokit/rest");
class Repository {
    constructor(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
            auth: this.authKey
        });
        this.data = null;
        this.eventHandlers = {};
    }
    init() {
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
    RepoURL() {
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
    License() {
        return {
            license: this.data.license
        };
    }
    /**
     * Retorna los datos del dueño del repositorio.
     * @returns {Array} Un array de elementos que contiene los datos del Owner del repositorio.
     */
    Owner() {
        return {
            owner: this.data.owner,
        };
    }
    on(eventName, handler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }
    triggerEvent(eventName) {
        const handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach(handler => handler());
        }
    }
}
exports.Repository = Repository;
class Loader {
    constructor(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
            auth: this.authKey
        });
        this.data = null;
    }
    ReadFile(pathFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.kit.request(`GET /repos/{owner}/{repo}/contents/{path}`, {
                    owner: this.author,
                    repo: this.repository,
                    path: pathFile,
                });
                const fileData = response.data;
                if (fileData.type === 'file' && fileData.content) {
                    const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
                    const data = {
                        "name": fileData.name,
                        "path": fileData.path,
                        "download_url": fileData.download_url,
                        "html_url": fileData.html_url,
                        "content": decodedContent,
                        "links": fileData._links,
                    };
                    return data;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                console.error("Error occurred while reading file:", error);
                throw error;
            }
        });
    }
}
exports.Loader = Loader;
