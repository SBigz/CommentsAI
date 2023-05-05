# Comments-AI

![Comments-AI Banner](./banner.png)

**Automatically generate insightful comments for your code directly in Visual Studio Code.**

Comments-AI is an extension for Visual Studio Code that uses artificial intelligence to generate comments on your code. It leverages advanced language models from OpenAI, such as "text-davinci-003" and "gpt-3.5-turbo", to provide relevant and useful comments that explain how your code works.

## Features

- Automatically generate comments for your functions with a single click
- Customizable configuration to fine-tune the AI generation settings according to your preferences
- Uses advanced OpenAI language models for better code understanding
- Works with multiple programming languages
- Supports comment generation in multiple languages

Tested with JavaScript, HTML, CSS, and Python. Supports React, sometimes buggy with TypeScript.
Don't hesitate to report your bugs in the issues, I would be happy to resolve them with you!

## How to Use Comments-AI

1. Install the Comments-AI extension from the Visual Studio Code Marketplace
2. Enter your OpenAI API key in the extension settings
3. Configure the extension settings according to your preferences, such as the AI model, generation parameters, and comment language
4. Open a code file in Visual Studio Code
5. Click the "Comment Code" button in the toolbar at the top right of the editor
6. AI-generated comments will be automatically inserted above each detected function in your code

## Configuration

The following settings can be adjusted in the extension settings:

- `commentsai.apiKey`: Your OpenAI API key
- `commentsai.model`: The AI model to use for generating comments (available options: "text-davinci-003" and "gpt-3.5-turbo")
- `commentsai.language`: The language to use for generating comments (default: "english")
- `commentsai.maxTokens`: The maximum number of tokens to generate for each comment (default: 200)
- `commentsai.temperature`: The generation temperature, controlling the model's creativity (default: 0.5)
- `commentsai.commentColor`: The color of the generated comments (default: "#00FF00", scope: "resource")

## Disclaimer

This extension serves as a proof of concept, demonstrating my passion for AI and exploring new ideas. I enjoy having fun while discovering new things, learning how things work, and in this case, developing an extension. My curiosity drives me to experiment, but this extension is not revolutionary. It uses your API key, offering a more affordable alternative to Copilot, for example. However, it can prove to be quite useful for commenting and gaining a better understanding of long, uncommented, or sparsely commented code sections.

## Enjoy !

Give a ⭐️ if you like the extension, fork it, and check out my theme for VS Code, [Synthwave '77](https://github.com/SBigz/Synthwave-2077) !
