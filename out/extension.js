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
exports.activate = activate;
exports.deactivate = deactivate;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
const scaffold_1 = require("./scaffold");
const yaml = __importStar(require("yaml"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('scaffold.run', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('❌ No workspace open.');
            return;
        }
        const root = workspaceFolders[0].uri;
        const setupPath = vscode.Uri.joinPath(root, 'setup.yaml');
        try {
            const content = await vscode.workspace.fs.readFile(setupPath);
            const yamlText = Buffer.from(content).toString('utf8');
            const parsed = yaml.parse(yamlText);
            if (!parsed?.project_name || !parsed?.structure) {
                vscode.window.showErrorMessage('❌ Invalid setup.yaml: Missing `project_name` or `structure`.');
                return;
            }
            const targetRoot = vscode.Uri.joinPath(root, parsed.project_name);
            await vscode.workspace.fs.createDirectory(targetRoot);
            await (0, scaffold_1.buildStructure)(targetRoot, parsed.structure);
            vscode.window.showInformationMessage(`✅ Project '${parsed.project_name}' scaffolded successfully!`);
        }
        catch (err) {
            vscode.window.showErrorMessage(`❌ Failed to scaffold: ${err.message}`);
        }
    });
    context.subscriptions.push(disposable);
}
// This method is called when your extension is deactivated
function deactivate() { }
//# sourceMappingURL=extension.js.map