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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.Repository = void 0;
var rest_1 = require("@octokit/rest");
var axios_1 = __importDefault(require("axios"));
var Repository = /** @class */ (function () {
    function Repository(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
            auth: this.authKey
        });
        this.data = null;
        this.init();
    }
    Repository.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.kit.repos.get({
                                owner: this.author,
                                repo: this.repository,
                            })];
                    case 1:
                        response = _a.sent();
                        this.data = response.data;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error occurred during initialization:", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the repository ID
     * @returns {Array} id: {}
     */
    Repository.prototype.getID = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    id: (_a = this.data) === null || _a === void 0 ? void 0 : _a.id
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the repository name
     * @returns {Array} name: {}
     */
    Repository.prototype.getName = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    name: (_a = this.data) === null || _a === void 0 ? void 0 : _a.name
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the repository description
     * @returns {Array} description: {}
     */
    Repository.prototype.getDescription = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    description: (_a = this.data) === null || _a === void 0 ? void 0 : _a.description
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the repository language
     * @returns {Array} language: {}
     */
    Repository.prototype.getLanguage = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    language: (_a = this.data) === null || _a === void 0 ? void 0 : _a.language
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the repository visibility
     * @returns {Array} visibility: {}
     */
    Repository.prototype.getVisibility = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    visibility: (_a = this.data) === null || _a === void 0 ? void 0 : _a.visibility
                                }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the subscribers of the repository
     * @returns {number}
     */
    Repository.prototype.getSuscribers = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, (_a = this.data) === null || _a === void 0 ? void 0 : _a.subscribers_count];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the Forks of the repository
     * @returns {number}
     */
    Repository.prototype.getForks = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, (_a = this.data) === null || _a === void 0 ? void 0 : _a.forks];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the watchers of the repository
     * @returns {number}
     */
    Repository.prototype.getWatchers = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, (_a = this.data) === null || _a === void 0 ? void 0 : _a.watchers];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the actual topics of the repository
     * @returns {Array} topics: {}
     */
    Repository.prototype.getTopics = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, {
                                topics: (_a = this.data) === null || _a === void 0 ? void 0 : _a.topics
                            }];
                }
            });
        });
    };
    /**
     * Returns the repository is private
     * @returns {boolean}
     */
    Repository.prototype.isPrivate = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            if (((_a = this.data) === null || _a === void 0 ? void 0 : _a.private) === false) {
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the html_url of the repository
     * @returns {Array} url: {}
     */
    Repository.prototype.getURL = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        if (this.data) {
                            return [2 /*return*/, {
                                    url: (_a = this.data) === null || _a === void 0 ? void 0 : _a.html_url
                                }];
                        }
                        throw new Error("Data cannot be loaded: undefined");
                }
            });
        });
    };
    /**
     * Returns the actual license of the repository
     * @returns {Array} license: {}
     */
    Repository.prototype.getLicense = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, {
                                license: (_a = this.data) === null || _a === void 0 ? void 0 : _a.license
                            }];
                }
            });
        });
    };
    /**
     * Returns the owner information of the repository
     * @returns {Array} owner: {}
     */
    Repository.prototype.getOwner = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.init()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, {
                                owner: (_a = this.data) === null || _a === void 0 ? void 0 : _a.owner,
                            }];
                }
            });
        });
    };
    return Repository;
}());
exports.Repository = Repository;
var Loader = /** @class */ (function () {
    function Loader(authKey, author, repository) {
        this.authKey = authKey;
        this.author = author;
        this.repository = repository;
        this.kit = new rest_1.Octokit({
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
    Loader.prototype.ReadFile = function (pathFile) {
        return __awaiter(this, void 0, void 0, function () {
            var response, fileData, decodedContent, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.kit.request("GET /repos/{owner}/{repo}/contents/{path}", {
                                owner: this.author,
                                repo: this.repository,
                                path: pathFile,
                            })];
                    case 1:
                        response = _a.sent();
                        fileData = response.data;
                        if (fileData.type === 'file' && fileData.content) {
                            decodedContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
                            data = {
                                "name": fileData.name,
                                "path": fileData.path,
                                "download_url": fileData.download_url,
                                "html_url": fileData.html_url,
                                "content": decodedContent,
                                "links": fileData._links,
                            };
                            return [2 /*return*/, data];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error occurred while reading file:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Loader.prototype.getWorkflow = function (workflow) {
        return __awaiter(this, void 0, void 0, function () {
            var apiUrl, response, latestRun, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        apiUrl = "https://api.github.com/repos/".concat(this.author, "/").concat(this.repository, "/actions/workflows/").concat(workflow, "/runs");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(apiUrl, {
                                "headers": {
                                    Authorization: "token ".concat(this.authKey)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        if (response.data.workflow_runs && response.data.workflow_runs.length > 0) {
                            latestRun = response.data.workflow_runs[0];
                            if (latestRun.status === 'completed') {
                                return [2 /*return*/, latestRun.conclusion === 'success' ? 'success' : 'failed'];
                            }
                            else {
                                return [2 /*return*/, 'pending'];
                            }
                        }
                        else {
                            return [2 /*return*/, 'not_found'];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("Error fetching workflow status: ", error_3.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Loader;
}());
exports.Loader = Loader;
