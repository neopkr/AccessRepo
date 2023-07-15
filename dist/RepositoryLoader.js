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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = exports.Repository = void 0;
var rest_1 = require("@octokit/rest");
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
    Repository.prototype.getURL = function () {
        var _a;
        return {
            url: (_a = this.data) === null || _a === void 0 ? void 0 : _a.html_url
        };
    };
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
    Repository.prototype.getLicense = function () {
        var _a;
        return {
            license: (_a = this.data) === null || _a === void 0 ? void 0 : _a.license
        };
    };
    /**
     * Retorna los datos del dueño del repositorio.
     * @returns {Array} Un array de elementos que contiene los datos del Owner del repositorio.
     */
    Repository.prototype.getOwner = function () {
        var _a;
        return {
            owner: (_a = this.data) === null || _a === void 0 ? void 0 : _a.owner,
        };
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
    return Loader;
}());
exports.Loader = Loader;
