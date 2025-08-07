import * as vscode from 'vscode';
import * as path from 'path';
import { promises as fs } from 'fs';

export async function createFile(filePath: vscode.Uri, content = '') {
  const dir = vscode.Uri.joinPath(filePath, '..');
  await vscode.workspace.fs.createDirectory(dir);
  const enc = new TextEncoder();
  await vscode.workspace.fs.writeFile(filePath, enc.encode(content));
}

export async function buildStructure(basePath: vscode.Uri, structure: any) {
  for (const [key, value] of Object.entries(structure)) {
    const targetUri = vscode.Uri.joinPath(basePath, key);

    if (Array.isArray(value)) {
      await vscode.workspace.fs.createDirectory(targetUri);
      for (const entry of value) {
        if (typeof entry === 'string') {
          await createFile(vscode.Uri.joinPath(targetUri, entry));
        } else if (typeof entry === 'object') {
          for (const [fileName, content] of Object.entries(entry)) {
            await createFile(vscode.Uri.joinPath(targetUri, fileName), content as string);
          }
        }
      }
    } else if (typeof value === 'object') {
      await vscode.workspace.fs.createDirectory(targetUri);
      await buildStructure(targetUri, value);
    } else if (typeof value === 'string') {
      await createFile(targetUri, value);
    }
  }
}
