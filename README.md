# ascii-themes CLI for Node.js
CLI Interface to Generate Themed ASCII Art

Supports 287 fonts from [Figlet](http://www.figlet.org/) and 18 themes from [VS Code](https://code.visualstudio.com/). To see supported fonts and themes run `npx ascii-themes support`.

## Usage

```
npx ascii-themes generate text
```

![ASCII Themes Text](https://raw.githubusercontent.com/AlexLakatos/ascii-themes/master/ascii-themes-text.png)

- Optional flags:
  - `--font` The Figlet Font to use. Defaults to 'Slant Relief'.
  - `--themeName` The VS Code theme to use. Defaults to 'Monokai Dimmed'.
  - `--horizontalLayout` The horizontal layout to use for the Figlet Font. Defaults to 'default'.
  - `--verticalLayout` The vertical layout to use for the Figlet Font. Defaults to 'default'.

## Interactive Mode

The CLI has 2 interactive modes:

```
npx ascii-themes -i
```

Will allow you to select from the available commands (generate, support, interactive) and input the flags for them via text prompts.

```
npx ascii-themes interactive
```

Will allow you to input the text and select from a list the available fonts, themes and layouts.