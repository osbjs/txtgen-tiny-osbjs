import { createCanvas, registerFont } from 'canvas'
import { emptyDirSync } from 'fs-extra'
import { isValidTxtGenContext } from 'isValidParams'
import path from 'path'
import { FontProps } from 'types/FontProps'
import { TextImage } from 'types/TextImage'

let CANVAS_INSTANCE = createCanvas(1, 1)
let CANVAS_CONTEXT = CANVAS_INSTANCE.getContext('2d')

let TEXT_GENERATOR_CONTEXT: TextGeneratorContext | null = null

export type TextGeneratorContext = {
	fontProps: FontProps
	osbFolderPath: string
	beatmapFolderPath: string
	createdTextImages: TextImage[]
}

/**
 * Create a new text generator context.
 *
 * @param osbFolderPath Subfolder where the images will be generated into.
 * @param beatmapFolderPath Full path to beatmap folder.
 * @param fontProps Font properties used to generate text.
 */
export function createTxtGenContext(osbFolderPath: string, beatmapFolderPath: string, fontProps: FontProps): TextGeneratorContext {
	return {
		fontProps,
		osbFolderPath,
		beatmapFolderPath,
		createdTextImages: [],
	}
}

/**
 * Specify the text generator context to use.
 *
 * @param context Text generator context.
 */
export function useTxtGenContext(context: TextGeneratorContext) {
	if (!context || !isValidTxtGenContext(context)) throw new TypeError('You must use the context returned from `createTxtGenContext()`.')

	TEXT_GENERATOR_CONTEXT = context
}

export function getTxtGenContext(): TextGeneratorContext {
	if (!TEXT_GENERATOR_CONTEXT) throw new Error('Text generator context is not set.')

	return TEXT_GENERATOR_CONTEXT
}

export function getCanvasInstance() {
	return CANVAS_INSTANCE
}

export function getCanvasContext() {
	return CANVAS_CONTEXT
}

export function resizeCanvas(width: number, height: number) {
	getCanvasInstance().width = width
	getCanvasInstance().height = height
}

/**
 * Specify a non-system font to use.
 *
 * @param path Full path to the font file. Relative path will not work as intended.
 * @param family Font family name.
 */
export function useFont(path: string, family: string) {
	registerFont(path, { family })
	CANVAS_INSTANCE = createCanvas(1, 1)
	CANVAS_CONTEXT = CANVAS_INSTANCE.getContext('2d')
}

/**
 * Clear output folder of this current context. This should be called once for each text generator context right after it is created.
 * @param context Context to be selected.
 */
export function clearOutputFolder(context: TextGeneratorContext) {
	const { beatmapFolderPath, osbFolderPath } = context
	const outputFolder = path.join(beatmapFolderPath, osbFolderPath)
	emptyDirSync(outputFolder)

	console.log(`Output folder "${outputFolder}" is cleared.`)
}
