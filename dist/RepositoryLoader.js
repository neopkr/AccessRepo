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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.Repository = void 0;
const rest_1 = require("@octokit/rest");
const axios_1 = __importDefault(require("axios"));
/**
 * @name Repository
 * @description Read the configuration/repository content from Github
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
class Repository {
    constructor(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
            auth: this.authKey
        });
        this.data = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.kit.repos.get({
                    owner: this.author,
                    repo: this.repository,
                });
                this.data = response.data;
            }
            catch (error) {
                console.error("Error occurred during initialization:", error);
                throw error;
            }
        });
    }
    /**
     * Returns the repository ID
     * @returns {Array} id: {}
     */
    getID() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    id: (_a = this.data) === null || _a === void 0 ? void 0 : _a.id
                };
            }
        });
    }
    /**
     * Returns the repository name
     * @returns {Array} name: {}
     */
    getName() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    name: (_a = this.data) === null || _a === void 0 ? void 0 : _a.name
                };
            }
        });
    }
    /**
     * Returns the repository description
     * @returns {Array} description: {}
     */
    getDescription() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    description: (_a = this.data) === null || _a === void 0 ? void 0 : _a.description
                };
            }
        });
    }
    /**
     * Returns the repository language
     * @returns {Array} language: {}
     */
    getLanguage() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    language: (_a = this.data) === null || _a === void 0 ? void 0 : _a.language
                };
            }
        });
    }
    /**
     * Returns the repository visibility
     * @returns {Array} visibility: {}
     */
    getVisibility() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    visibility: (_a = this.data) === null || _a === void 0 ? void 0 : _a.visibility
                };
            }
        });
    }
    /**
     * Returns the subscribers of the repository
     * @returns {number}
     */
    getSuscribers() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return (_a = this.data) === null || _a === void 0 ? void 0 : _a.subscribers_count;
            }
        });
    }
    /**
     * Returns the Forks of the repository
     * @returns {number}
     */
    getForks() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return (_a = this.data) === null || _a === void 0 ? void 0 : _a.forks;
            }
        });
    }
    /**
     * Returns the watchers of the repository
     * @returns {number}
     */
    getWatchers() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return (_a = this.data) === null || _a === void 0 ? void 0 : _a.watchers;
            }
        });
    }
    /**
     * Returns the actual topics of the repository
     * @returns {Array} topics: {}
     */
    getTopics() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return {
                topics: (_a = this.data) === null || _a === void 0 ? void 0 : _a.topics
            };
        });
    }
    /**
     * Returns the repository is private
     * @returns {boolean}
     */
    isPrivate() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                if (((_a = this.data) === null || _a === void 0 ? void 0 : _a.private) === false) {
                    return false;
                }
                return true;
            }
        });
    }
    /**
     * Returns the html_url of the repository
     * @returns {Array} url: {}
     */
    getURL() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            if (this.data) {
                return {
                    url: (_a = this.data) === null || _a === void 0 ? void 0 : _a.html_url
                };
            }
            throw new Error("Data cannot be loaded: undefined");
        });
    }
    /**
     * Returns the actual license of the repository
     * @returns {Array} license: {}
     */
    getLicense() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return {
                license: (_a = this.data) === null || _a === void 0 ? void 0 : _a.license
            };
        });
    }
    /**
     * Returns the owner information of the repository
     * @returns {Array} owner: {}
     */
    getOwner() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return {
                owner: (_a = this.data) === null || _a === void 0 ? void 0 : _a.owner,
            };
        });
    }
    /**
     * Get current published release versions available of the repository
     * @returns {Array} [...versions]
     */
    getPublishedVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/releases`;
            try {
                const response = yield axios_1.default.get(apiUrl, {
                    headers: {
                        Authorization: `token ${this.authKey}`
                    }
                });
                const publishedVersions = response.data
                    .filter(release => !release.prerelease)
                    .map(release => release.tag_name);
                return publishedVersions;
            }
            catch (error) {
                console.error('Error trying to get releases versions:', error.message);
                return [];
            }
        });
    }
    /**
     * Get current published pre-release versions available of the repository
     * @returns {Array} [...versions]
     */
    getPreReleaseVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/releases`;
            try {
                const response = yield axios_1.default.get(apiUrl, {
                    headers: {
                        Authorization: `token ${this.authKey}`
                    }
                });
                const preReleaseVersions = response.data
                    .filter(release => release.prerelease)
                    .map(release => release.tag_name);
                return preReleaseVersions;
            }
            catch (error) {
                console.error('Error trying to get pre-release versions:', error.message);
                return [];
            }
        });
    }
    /**
     * Get all published versions (pre-release and release)
     * @returns {Array} [...versions]
     */
    getAllVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            const releaseVersions = yield this.getPublishedVersions();
            const preReleaseVersions = yield this.getPreReleaseVersions();
            let allVersions = releaseVersions.concat(preReleaseVersions);
            const uniqueVer = new Set(allVersions);
            allVersions = [...uniqueVer];
            return allVersions;
        });
    }
}
exports.Repository = Repository;
/**
 * @name Loader
 * @description Read files and workflows from Github repository.
 * @param authKey Access Token from Github. Get yours at: ```https://github.com/settings/apps``` on Personal access token.
 * @param author Repository author, owner
 * @param repository Repository name
 */
class Loader {
    constructor(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
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
    readFile(pathFile) {
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
    /**
     * Retrive Workflow last run information
     * @param workflow Name of your workflow, example: npm-workflow.yml
     * @returns success | failed | pending | not_found
     */
    getWorkflow(workflow) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/actions/workflows/${workflow}/runs`;
            try {
                const response = yield axios_1.default.get(apiUrl, {
                    "headers": {
                        Authorization: `token ${this.authKey}`
                    }
                });
                if (response.data.workflow_runs && response.data.workflow_runs.length > 0) {
                    const latestRun = response.data.workflow_runs[0];
                    if (latestRun.status === 'completed') {
                        return latestRun.conclusion === 'success' ? 'success' : 'failed';
                    }
                    else {
                        return 'pending';
                    }
                }
                else {
                    return 'not_found';
                }
            }
            catch (error) {
                console.error("Error fetching workflow status: ", error.message);
            }
        });
    }
    /**
     * Get the last workflow action run of the repository.
     * @returns [runName, runUrl, runPath, workflowName, workflowStatus]
     * @example
     * Loader.getLastWorkflow() // Get last workflow of AccessRepo
     * ["Node.js Package", ".github/workflows/npm-publish.yml", "https://api.github.com/repos/neopkr/AccessRepo/actions/workflows/63214888", "npm-publish.yml", "success"]
     * @ignore workflowStatus uses getWorkflow() function, returns: success, failed, pending or not_found
     */
    getLastWorkflow() {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = `https://api.github.com/repos/${this.author}/${this.repository}/actions/workflows`;
            try {
                const response = yield axios_1.default.get(apiUrl, {
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
                    const workflowName = String(path).split('/').slice(-1)[0];
                    const workflowStatus = yield this.getWorkflow(workflowName);
                    lastRuns.push(runName, runsUrl, path, workflowName, workflowStatus);
                }
                return lastRuns;
            }
            catch (error) {
                console.error('Error trying to get last workflow status:', error.message);
                return [];
            }
        });
    }
}
exports.Loader = Loader;
