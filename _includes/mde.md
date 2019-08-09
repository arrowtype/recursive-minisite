


## A single, flexible file. Vary nice. 

Recursive is a variable font, providing a continuous range of design control across five axes: **Proportion, Expression, Weight, Italic, and Cursive**. On the web, you can use serve the full variable font, for extreme typographic flexibility &#38; control with just a single font file. You can also serve exactly the axes you need, for all the range you need with an even smaller file size.

```css
font-size: 144px;
/* style axes */
font-weight: 400;
--prop: "PROP" 0;
--xprn: "XPRN" 0;
--ital: "ital" 0;	   
--crsv: "CRSV" 0;
/* use CSS custom properties */   
font-variation-settings: var(--prop), var(--xprn), var(--ital), var(--crsv);  
```

## Do more with typography

Recursive is a type family that maximizes fun & utility  for code & design. It takes its initial inspiration from single-stroke casual signpainting, a style of brush writing that is highly efficient, easy to learn, stylistically flexible, and warmly energetic. The brush strokes of this style have been translated into simplified forms for use in text, primarily on screen in code editors & web browsers. It gives you a wide range of typographic possibility, making it perfect for everything from programming to mobile games to complex hierarchies in technical docs.

![alt text][/assets/img/test.png]


## Mono && Sans - `PROP`

Recursive contains two subfamilies in its **Proportion** axis (`PROP`) – Mono and Sans. A simple benefit of this that both subfamilies have compatible vertical metrics to make them fit perfectly together at the same font sizes. Even better, serving them in a single variable font makes Recursive extremely performant for rich typography in websites focused on technical information, like docs and blogs.

**Mono** is designed for code. It’s fixed-width: each character gets the same width as every other character, across styles, allowing syntax to have clear legibility and perfect alignment.

**Sans** is designed for text & UI. It’s proportional: Characters are drawn at natural, proportional widths for comfortable readability. Normal-width characters share outlines with monospaced styles to enable even better compression.