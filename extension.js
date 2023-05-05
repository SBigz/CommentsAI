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
  // Récupère la langue sélectionnée dans les paramètres
  const commentLanguage = vscode.workspace
    .getConfiguration("commentsai")
    .get("language");

  try {
    // Crée une requête d'achèvement avec le modèle, le code, la langue et la langue des commentaires
    const completion = await openai.createCompletion({
      model: vscode.workspace.getConfiguration("commentsai").get("model"),
      prompt: `Analyze the following ${language} code:\n\n${code}, and add a short ${commentLanguage} description to it. Don't produce any code, just explain.`,
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

const languageRegexes = {
  javascript: {
    class: /class\s+\w+\s*(?:extends\s+\w+\s*)?\{[^}]*\}/g,
    function: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/g,
    let: /let\s+\w+\s*(?:=\s*[^;]*)?;/g,
    const: /const\s+\w+\s*(?:=\s*[^;]*)?;/g,
    var: /var\s+\w+\s*(?:=\s*[^;]*)?;/g,
  },
  jsx: {
    classComponent: /class\s+\w+\s*extends\s+React\.Component\s*\{[^}]*\}/g,
    functionComponent:
      /(?:const|function)\s+\w+\s*=\s*\((?:[^)]*\))?\)\s*=>\s*\{[^}]*\}/g,
    exportDefault:
      /export\s+default\s+(?:class|function|const)\s+\w+\s*(?:\([^)]*\))?\s*(?:{[^}]*})?(?!>)/g,
  },
  typescript: {
    class:
      /class\s+\w+\s*(?:extends\s+\w+\s*)?(?:implements\s+[\w\s,]+)?\{[^}]*\}/g,
    function: /function\s+\w+\s*\([^)]*\)\s*(?::\s*[^{]*)?\{[^}]*\}/g,
    let: /let\s+\w+\s*(?::\s*[^=]*)?\s*(?:=\s*[^;]*)?;/g,
    const: /const\s+\w+\s*(?::\s*[^=]*)?\s*(?:=\s*[^;]*)?;/g,
    var: /var\s+\w+\s*(?::\s*[^=]*)?\s*(?:=\s*[^;]*)?;/g,
    interface: /interface\s+\w+\s*(?:extends\s+[\w\s,]+)?\{[^}]*\}/g,
    typeAlias: /type\s+\w+\s*=\s*[^;]*;/g,
  },
  tsx: {
    classComponent:
      /class\s+\w+\s*extends\s+React\.Component\s*<[^>]*>\s*\{[^}]*\}/g,
    functionComponent:
      /(?:const|function)\s+\w+\s*=\s*\((?:[^)]*\))?\)\s*:\s*React\.FC\s*<[^>]*>\s*=>\s*\{[^}]*\}/g,
    exportDefault:
      /export\s+default\s+(?:class|function|const)\s+\w+\s*(?:\([^)]*\))?\s*(?:{[^}]*})?(?!>)/g,
  },
};

// Fonction pour traiter le code et ajouter des commentaires aux fonctions et aux classes
/**
 * @param {string} code
 * @param {string} language
 */
async function processCode(code, language) {
  if (!languageRegexes[language]) {
    console.log("Unsupported language:", language);
    return code;
  }

  let commentedCode = code;
  const insertions = [];

  // Boucle pour chaque type de regex dans le langage spécifique
  for (const regexType in languageRegexes[language]) {
    const regex = languageRegexes[language][regexType];
    let match;

    // Boucle pour trouver les éléments correspondants et générer des commentaires pour eux
    while ((match = regex.exec(code)) !== null) {
      const codeBlock = match[0];
      const codeBlockStartIndex = match.index;

      // Ajoute des commentaires pour les éléments correspondants
      const comment = await commentCode(codeBlock, language);

      // Stocke l'index et le commentaire pour une insertion ultérieure
      if (comment) {
        insertions.push({ index: codeBlockStartIndex, comment });
      }
    }
  }

  // Insère les commentaires au-dessus des éléments correspondants
  for (let i = insertions.length - 1; i >= 0; i--) {
    const { index, comment } = insertions[i];

    // Vérifie si "export default" précède la fonction
    const exportDefaultIndex = code.lastIndexOf("export default", index);

    if (exportDefaultIndex !== -1 && exportDefaultIndex > index - 20) {
      // Si "export default" précède la fonction, insère le commentaire avant "export default"
      commentedCode =
        commentedCode.slice(0, exportDefaultIndex) +
        comment +
        "\n" +
        commentedCode.slice(exportDefaultIndex);
    } else {
      // Sinon, insère le commentaire au-dessus de la fonction ou de la classe
      commentedCode =
        commentedCode.slice(0, index) +
        comment +
        "\n" +
        commentedCode.slice(index);
    }
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

      // Affiche la fenêtre de progression avec le texte "processing..."
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Notification,
          title: "Processing... └[∵┌]└[ ∵ ]┘[┐∵]┘",
          cancellable: false,
        },
        async () => {
          // Traite le code et ajoute des commentaires aux fonctions et aux classes
          const commentedCode = await processCode(code, language);

          // Si le code commenté est généré avec succès, remplace le code d'origine par le code commenté
          if (commentedCode) {
            editor.edit((editBuilder) => {
              const startPosition = new vscode.Position(0, 0);
              const endPosition = document.lineAt(document.lineCount - 1).range
                .end;
              const fullRange = new vscode.Range(startPosition, endPosition);
              editBuilder.replace(fullRange, commentedCode);
            });
          } else {
            // Affiche un message d'erreur si la génération de commentaires échoue
            vscode.window.showErrorMessage("Unable to generate comments.");
          }
        }
      );
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
