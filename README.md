# txtgen-tiny-osbjs
A text-to-image generator wrapper for tiny-osbjs.

## Install
```bash
npm i tiny-osbjs txtgen-tiny-osbjs
```

## Usage
Create a text generator context and set it for use.
```js
const { createTxtGenContext, useTxtGenContext } = require('@osbjs/txtgen-tiny-osbjs')

const txtGenContext = createTxtGenContext('sb/lyrics', 'path/to/beatmap/folder', {
	name: 'Arial',
	size: 72,
	color: { r: 0, g: 0, b: 0 }
})
useTxtGenContext(txtGenContext)
```


You can now create text images. `createText` will call `createSprite` under the hood.
```js
const { createText } = require('@osbjs/txtgen-tiny-osbjs')

createText('Hello', 'Background', 'Center', { x: 320, y: 240 }, () => {
	fade(0, 1000, 0, 1)
})
```

You can have multiple text generator context and switch between them if needed.
```ts
const { createTxtGenContext, useTxtGenContext } = require('@osbjs/txtgen-tiny-osbjs')

const txtGenContext = createTxtGenContext()
useTxtGenContext(txtGenContext)
```

If you want to use non-system fonts, specify it.
```js
const { createText, useFont } = require('@osbjs/txtgen-tiny-osbjs')

useFont('./FontName.ttf', 'FontName')
// createText...
```

If you want to apply effects to each letter, you may want to use `getTexturePositionForAlignment`.
```js
const { createText } = require('@osbjs/txtgen-tiny-osbjs')

let text = 'Hello'
let letterX = 0

text.split('').forEach(letter => {
  	createText(letter, 'Background', 'Centre', { x: 320, y: 240 } ,({ width, height }) => {
    	const postion = getTexturePositionForAlignment({ letterX, y: 240 }, 'Center', width, height)
		moveAtTime(1000, postion)
    	letterX += width
  	})
})
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
function createTxtGenContext(osbPath: string, beatmapFolderPath: string, fontProps: FontProps): TextGeneratorContext
type FontProps = {
	name: string
	size: number
	color: Color
	padding: Padding
}
```
Create a new text generator context.
* **osbPath**: Subfolder where the images will be generated into.
* **beatmapFolderPath**: Full path to beatmap folder.
* **fontProps**: Font properties used to generate text.

### useTxtGenContext
```ts
function useTxtGenContext(context: TextGeneratorContext)
```
Specify the text generator context to use.

### createText
```ts
function createText(text: string, layer: Layer, origin: Origin, initialPosition: Vector2, invokeFunction: (textImage: TextImage) => void)
type TextImage = {
	width: number
	height: number
	text: string
	path: string
}
```
Generate image with given text and create a new sprite for that image.

### getTexturePositionForAlignment
```ts
function getTexturePositionForAlignment(position: Vector2, origin: Origin, width: number, height: number): Vector2
```
See [#Usage](#usage) example.

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

