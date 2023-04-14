# CommentsAI

**Générez automatiquement des commentaires pour votre code directement dans Visual Studio Code.**

CommentsAI est une extension pour Visual Studio Code qui utilise l'intelligence artificielle pour générer des commentaires sur votre code. Elle s'appuie sur les modèles de langage avancés d'OpenAI, tels que "text-davinci-003" et "gpt-3.5-turbo", pour fournir des commentaires pertinents et utiles qui expliquent le fonctionnement de votre code.

## Fonctionnalités

- Génération automatique de commentaires pour vos fonctions en un seul clic
- Configuration personnalisable pour ajuster les paramètres de l'IA selon vos préférences
- Utilise les modèles de langage avancés d'OpenAI pour une meilleure compréhension du code
- Fonctionne avec plusieurs langages de programmation

## Comment utiliser CommentsAI

1. Installez l'extension CommentsAI depuis le Marketplace de Visual Studio Code
2. Entrez votre clé API OpenAI dans les paramètres de l'extension
3. Configurez les paramètres de l'extension selon vos préférences, tels que le modèle IA et les paramètres de génération
4. Ouvrez un fichier de code dans Visual Studio Code
5. Cliquez sur le bouton "Comment Code" situé dans la barre d'outils en haut à droite de l'éditeur
6. Les commentaires générés par l'IA seront automatiquement insérés au-dessus de chaque fonction détectée dans votre code

## Configuration

Les paramètres suivants peuvent être ajustés dans les paramètres de l'extension :

- `commentsai.apiKey` : Votre clé API OpenAI
- `commentsai.model` : Le modèle IA à utiliser pour générer des commentaires (options disponibles : "text-davinci-003" et "gpt-3.5-turbo")
- `commentsai.maxTokens` : Le nombre maximum de tokens à générer pour chaque commentaire (défaut : 100)
- `commentsai.temperature` : La température de génération, contrôlant la créativité du modèle (défaut : 0.5)

## Support

Si vous rencontrez des problèmes ou avez des suggestions, n'hésitez pas à nous contacter à [support@email.com](mailto:support@email.com).