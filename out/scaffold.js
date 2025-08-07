"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = createFile;
exports.buildStructure = buildStructure;
const vscode = __importStar(require("vscode"));
async function createFile(filePath, content = '') {
    const dir = vscode.Uri.joinPath(filePath, '..');
    await vscode.workspace.fs.createDirectory(dir);
    const enc = new TextEncoder();
    await vscode.workspace.fs.writeFile(filePath, enc.encode(content));
}
async function buildStructure(basePath, structure) {
    for (const [key, value] of Object.entries(structure)) {
        const targetUri = vscode.Uri.joinPath(basePath, key);
        if (Array.isArray(value)) {
            await vscode.workspace.fs.createDirectory(targetUri);
            for (const entry of value) {
                if (typeof entry === 'string') {
                    await createFile(vscode.Uri.joinPath(targetUri, entry));
                }
                else if (typeof entry === 'object') {
                    for (const [fileName, content] of Object.entries(entry)) {
                        await createFile(vscode.Uri.joinPath(targetUri, fileName), content);
                    }
                }
            }
        }
        else if (typeof value === 'object') {
            await vscode.workspace.fs.createDirectory(targetUri);
            await buildStructure(targetUri, value);
        }
        else if (typeof value === 'string') {
            await createFile(targetUri, value);
        }
    }
}
//# sourceMappingURL=scaffold.js.map