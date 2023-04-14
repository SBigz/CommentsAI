const { commentCode } = require("../../extension.js");
const assert = require('assert');

suite("Comment Generation Test Suite", () => {
  test("Generate a comment for a sample JavaScript function", async () => {
    const code = "function sum(a, b) { return a + b; }";
    const language = "javascript";
    const comment = await commentCode(code, language);

    // Vérifie que le commentaire généré n'est pas vide
    assert.notStrictEqual(comment, "");

    // Vérifie que le commentaire généré contient des mots clés attendus (cette vérification peut être adaptée en fonction de vos attentes)
    assert(comment.includes("//"));
  });
});
