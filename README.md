# txtgen-tiny-osbjs
A text-to-image generator wrapper for tiny-osbjs.

## Install
```bash
npm i @osbjs/tiny-osbjs @osbjs/txtgen-tiny-osbjs
```

## Usage
Create a text generator context and set it for use. Make sure to clear the output folder after you create the context.
```js
const { createTxtGenContext, useTxtGenContext } = require('@osbjs/txtgen-tiny-osbjs')

const txtGenContext = createTxtGenContext('sb/lyrics', 'path/to/beatmap/folder', {
	name: 'Arial',
	size: 72,
	isItalic: false,
	padding: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
})
clearOutputFolder(txtGenContext)
useTxtGenContext(txtGenContext)
```


You can now create text images. `createText` will call `createSprite` under the hood.
```js
const { createText } = require('@osbjs/txtgen-tiny-osbjs')

createText('Hello', 'Background', 'Centre', { x: 320, y: 240 }, () => {
	fade(0, 1000, 0, 1)
})
```

You can have multiple text generator context and switch between them if needed.
```ts
const { createTxtGenContext, useTxtGenContext } = require('@osbjs/txtgen-tiny-osbjs')

const font1Context = createTxtGenContext()
const font2Context = createTxtGenContext()

useTxtGenContext(font1Context)
// createText with font1...

useTxtGenContext(font2Context)
// createText with font2...

useTxtGenContext(font1Context)
// createText with font1...
// etc...
```

If you want to use non-system fonts, specify it before creating and using context.
```js
const { createText, useFont } = require('@osbjs/txtgen-tiny-osbjs')

useFont('FontName.ttf', 'FontName')
const txtGenContext = createTxtGenContext('sb/lyrics', 'path/to/beatmap/folder', {
	name: 'Arial',
	size: 72,
	isItalic: false,
	padding: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	}
})
clearOutputFolder(txtGenContext)
useTxtGenContext(txtGenContext)
// createText...
```

If you need to calculate line width/height of a straight line of text, we've got you covered.
```js
const { measureLineWidth, measureLineHeight, createText } = require('@osbjs/txtgen-tiny-osbjs')

let text = 'Hello'
const lineWidth = measureLineWidth(text),
	lineHeight = measureLineHeight(text, (prevHeight, currentHeight) => Math.max(prevHeight, currentHeight))

let letterX = 320 - lineWidth / 2
// createText...
```

## API documentation
### createTxtGenContext
```ts
function createTxtGenContext(osbFolderPath: string, beatmapFolderPath: string, fontProps: FontProps): TextGeneratorContext
type FontProps = {
	name: string
	size: number
	padding: Padding
	isItalic: boolean
}
```
Create a new text generator context.
* **osbFolderPath**: Subfolder where the images will be generated into.
* **beatmapFolderPath**: Full path to beatmap folder.
* **fontProps**: Font properties used to generate text.

### useTxtGenContext
```ts
function useTxtGenContext(context: TextGeneratorContext)
```
Specify the text generator context to use.

### createText && createOutlineText
```ts
function createText(
	text: string, 
	layer: Layer, 
	origin: Origin, 
	initialPosition: Vector2, 
	invokeFunction: (
		textImage: TextImage, 
		getTopLeftPosition: (position: Vector2, scale?: number) => Vector2
	) => void
)
function createOutlineText(
	text: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	invokeFunction: (
		textImage: TextImage, 
		getTopLeftPosition: (position: Vector2, scale?: number) => Vector2
	) => void
)
type TextImage = {
	width: number
	height: number
	text: string
	path: string
	osbPath: string
	isOutline: boolean
}
```
Create a new sprite for a given text. It's recommended to use seperate contexts if you are using both `createText` and `createOutlineText`.

### ejectAllTextImages
```ts
function ejectAllTextImages()
```
Eject all text images into osu storyboard folder. This returns a promise which will be fulfilled once every text image is ejected.

### useFont
```ts
function useFont(path: string, family: string)
```
Specify a non-system font to use.

### clearOutputFolder
```ts
function clearOutputFolder(context: TextGeneratorContext)
```
Clear output folder of this current context. This should be called once for each text generator context right after it is created.

### Measure line
```ts
function measureLineWidth(
	line: string,
	reducer: (prevWidth: number, currentWidth: number) => number = (prevWidth, currentWidth) => prevWidth + currentWidth
)
function measureLineHeight(
	line: string,
	reducer: (prevHeight: number, currentHeight: number) => number = (prevHeight, currentHeight) => prevHeight + currentHeight
)
```
Get total line width/height by calling reducer on each letter in the line of text.

### Convert color
```ts
function rgbToHex(color: Color): string 
```
Convert RGB color to hex color code.

```ts
function hexToRgb(hex: string): Color
```
Convert hex color code to RGB color.

