// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { buildStructure } from './scaffold';
import * as yaml from 'yaml';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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

      await buildStructure(targetRoot, parsed.structure);

      vscode.window.showInformationMessage(`✅ Project '${parsed.project_name}' scaffolded successfully!`);
    } catch (err: any) {
      vscode.window.showErrorMessage(`❌ Failed to scaffold: ${err.message}`);
    }
  });

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
