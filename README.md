# CommentsAI

**Automatically generate insightful comments for your code directly in Visual Studio Code.**

CommentsAI is an extension for Visual Studio Code that uses artificial intelligence to generate comments on your code. It leverages advanced language models from OpenAI, such as "text-davinci-003" and "gpt-3.5-turbo", to provide relevant and useful comments that explain how your code works.

## Features

- Automatically generate comments for your functions with a single click
- Customizable configuration to fine-tune the AI generation settings according to your preferences
- Uses advanced OpenAI language models for better code understanding
- Works with multiple programming languages

## How to Use CommentsAI

1. Install the CommentsAI extension from the Visual Studio Code Marketplace
2. Enter your OpenAI API key in the extension settings
3. Configure the extension settings according to your preferences, such as the AI model and generation parameters
4. Open a code file in Visual Studio Code
5. Click the "Comment Code" button in the toolbar at the top right of the editor
6. AI-generated comments will be automatically inserted above each detected function in your code

## Configuration

The following settings can be adjusted in the extension settings:

- `commentsai.apiKey`: Your OpenAI API key
- `commentsai.model`: The AI model to use for generating comments (available options: "text-davinci-003" and "gpt-3.5-turbo")
- `commentsai.maxTokens`: The maximum number of tokens to generate for each comment (default: 100)
- `commentsai.temperature`: The generation temperature, controlling the model's creativity (default: 0.5)

## Support

If you encounter any issues or have suggestions, please feel free to contact us at [support@email.com](mailto:support@email.com).