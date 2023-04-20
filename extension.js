// Importe les modules openai et vscode
const { Configuration, OpenAIApi } = require("openai");
const vscode = require("vscode");

// Configure l'API OpenAI avec la clé API
const configuration = new Configuration({
  apiKey: vscode.workspace.getConfiguration("commentsai").get("apiKey"),
});
const openai = new OpenAIApi(configuration);

// Fonction pour générer un commentaire concis pour le code donné
/**
 * @param {string} code
 * @param {string} language
 */
async function commentCode(code, language) {
  try {
    // Crée une requête d'achèvement avec le modèle, le code et la langue
    const completion = await openai.createCompletion({
      model: vscode.workspace.getConfiguration("commentsai").get("model"),
      prompt: `Analyze the following ${language} code:\n\n${code}, and add concise description to it.`,
      max_tokens: vscode.workspace
        .getConfiguration("commentsai")
        .get("maxTokens"),
      temperature: vscode.workspace
        .getConfiguration("commentsai")
        .get("temperature"),
    });
    // Récupère le commentaire généré et le retourne
    const rawComment = completion.data.choices[0].text.trim();
    return `/* ${rawComment} */`;
  } catch (error) {
    // Gère les erreurs et affiche le type d'erreur ainsi que le message d'erreur
    if (error.response) {
      console.log("HTTP error:", error.response.status);
      console.log(error.response.data);
    } else {
      console.log("Error:", error.message);
    }
    return null;
  }
}

// Fonction pour traiter le code et ajouter des commentaires aux fonctions et aux classes
/**
 * @param {string} code
 * @param {string} language
 */
async function processCode(code, language) {
  if (
    language !== "javascript" &&
    language !== "typescriptreact" &&
    language !== "javascriptreact"
  ) {
    console.log("Unsupported language:", language);
    return code;
  }

  // Regex pour identifier les fonctions, les classes, les 'const' et les 'let' dans le code
  const regex =
    /(?<!<)(const|let|function|class)\s+\w+\s*(?:\([^)]*\))?\s*(?:{[^}]*})?(?!>)/g;
  let match;
  let commentedCode = code;
  const insertions = [];

  // Boucle pour trouver les fonctions, classes, const et let, et générer des commentaires pour eux
  while ((match = regex.exec(code)) !== null) {
    const codeBlock = match[0];
    const codeBlockStartIndex = match.index;

    // Ajoute des commentaires pour les fonctions, classes, const et let
    const comment = await commentCode(codeBlock, language);

    // Stocke l'index et le commentaire pour une insertion ultérieure
    if (comment) {
      insertions.push({ index: codeBlockStartIndex, comment });
    }
  }

  // Insère les commentaires au-dessus des fonctions, const, let, etc. correspondants
  for (let i = insertions.length - 1; i >= 0; i--) {
    const { index, comment } = insertions[i];

    commentedCode =
      commentedCode.slice(0, index) +
      comment +
      "\n" +
      commentedCode.slice(index);
  }

  // Retourne le code commenté
  return commentedCode;
}


// Fonction pour activer l'extension vscode
/**
 * @param {{ subscriptions: vscode.Disposable[]; }} context
 */
function activate(context) {
  console.log("I feel good honey !");
  // Enregistre la commande "commentsai.commentCode" et sa fonction de rappel
  let disposable = vscode.commands.registerCommand(
    "commentsai.commentCode",
    async () => {
      // Récupère l'éditeur actif et vérifie s'il est disponible
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      // Récupère le document, le code et la langue de l'éditeur actif
      const document = editor.document;
      const code = document.getText();
      const language = document.languageId;

      // Traite le code et ajoute des commentaires aux fonctions et aux classes
      const commentedCode = await processCode(code, language);

      // Si le code commenté est généré avec succès, remplace le code d'origine par le code commenté
      if (commentedCode) {
        editor.edit((editBuilder) => {
          const startPosition = new vscode.Position(0, 0);
          const endPosition = document.lineAt(document.lineCount - 1).range.end;
          const fullRange = new vscode.Range(startPosition, endPosition);
          editBuilder.replace(fullRange, commentedCode);
        });
      } else {
        // Affiche un message d'erreur si la génération de commentaires échoue
        vscode.window.showErrorMessage("Unable to generate comments.");
      }
    }
  );

  // Ajoute la commande à la liste des abonnements de l'extension
  context.subscriptions.push(disposable);
}

// Fonction pour désactiver l'extension
function deactivate() {}

// Exporte les fonctions activate et deactivate
module.exports = {
  commentCode,
  processCode,
  activate,
  deactivate,
};
