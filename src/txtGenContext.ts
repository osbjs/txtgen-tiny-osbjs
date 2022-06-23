import { createCanvas } from 'canvas'
import { isValidTxtGenContext } from 'isValidParams'
import { FontProps } from 'types/FontProps'
import { TextImage } from 'types/TextImage'

const CANVAS_INSTANCE = createCanvas(1, 1)
const CANVAS_CONTEXT = CANVAS_INSTANCE.getContext('2d')

let TEXT_GENERATOR_CONTEXT: TextGeneratorContext | null = null

export type TextGeneratorContext = {
	fontProps: FontProps
	osbPath: string
	beatmapFolderPath: string
	createdTextImages: TextImage[]
}

export function createTxtGenContext(osbPath: string, beatmapFolderPath: string, fontProps: FontProps): TextGeneratorContext {
	return {
		fontProps,
		osbPath,
		beatmapFolderPath,
		createdTextImages: [],
	}
}

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
