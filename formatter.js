const vscode = require("vscode");

function activate(context) {
    context.subscriptions.push(
        vscode.languages.registerDocumentFormattingEditProvider("cyn", {
            provideDocumentFormattingEdits(document) {
                const text = document.getText();
                const lines = text.split("\n");

                let indent = 0;

                const formatted = lines.map(line => {
                    let t = line.trim();

                    if (t === "selesai") indent--;

                    const result = "    ".repeat(Math.max(indent, 0)) + t;

                    if (/^(jika|fungsi|ulang|selama|coba|untuk)\b/.test(t)) {
                        indent++;
                    }

                    return result;
                });

                return [
                    vscode.TextEdit.replace(
                        new vscode.Range(
                            document.positionAt(0),
                            document.positionAt(text.length)
                        ),
                        formatted.join("\n")
                    )
                ];
            }
        })
    );
}

function deactivate() {}

module.exports = { activate, deactivate };