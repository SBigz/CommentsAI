# SmartCommentAI

![SmartCommentAI Banner](/AI.png)

**Intelligent Comment Generation for Your Code in Visual Studio Code**

SmartCommentAI is a revolutionary extension for Visual Studio Code that leverages artificial intelligence to automatically generate insightful, useful comments for your code. Using advanced language models from OpenAI, such as "text-davinci-003" and "gpt-3.5-turbo", this tool offers a new level of understanding for your code.

## Key Features

- Single-click automatic comment generation: Simply click a button and have AI produce comments for your functions.
- Personalized AI settings: Configure the AI generation settings to suit your needs.
- Advanced OpenAI language models: Benefit from the power of cutting-edge AI for superior code understanding.
- Multi-language support: Works with several programming languages and generates comments in multiple languages.
- Compatibility: Successfully tested with JavaScript, HTML, CSS, and Python. Supports React, and TypeScript (with minor bugs).

## How to Use Comments-AI

1. Download and install the SmartCommentAI extension from the Visual Studio Code Marketplace.
2. Enter your OpenAI API key in the extension settings.
3. Customize the extension settings to your preference, such as the AI model, generation parameters, and comment language.
4. Open a code file in Visual Studio Code.
5. Click the "Generate Comment" button in the toolbar at the top right of the editor.
6. Watch as AI-generated comments are automatically inserted above each detected function in your code.
![Comments-AI Preview](/preview1.png)

## Configuration

The following settings can be adjusted in the extension settings:

- `commentsai.apiKey`: Your OpenAI API key
- `commentsai.model`: The AI model to use for generating comments (available options: "text-davinci-003" and "gpt-3.5-turbo")
- `commentsai.language`: The language to use for generating comments (default: "english")
- `commentsai.maxTokens`: The maximum number of tokens to generate for each comment (default: 200)
- `commentsai.temperature`: The generation temperature, controlling the model's creativity (default: 0.5)
- `commentsai.commentColor`: The color of the generated comments (default: "#00FF00", scope: "resource")

## Disclaimer

SmartCommentAI is more than a proof of concept; it is a testament to the power and potential of AI in the world of coding. While it uses your API key, it offers a more affordable alternative to similar tools like Copilot. SmartCommentAI is here to simplify your coding experience and to help you understand long, uncommented, or sparsely commented code sections better.

## Enjoy !

If you like the extension, don't forget to give a ⭐️, fork it, and check out my theme for VS Code, [Synthwave '77](https://github.com/SBigz/Synthwave-2077) !
