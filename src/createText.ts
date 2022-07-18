import { createSprite, Layer, Origin, Vector2 } from '@osbjs/tiny-osbjs'
import { setToBeEjected } from 'eject'
import { measureText } from 'measureText'
import { join } from 'path'
import { getCanvasContext, getCanvasInstance, getTxtGenContext, resizeCanvas } from 'txtGenContext'
import { TextImage } from 'types/TextImage'
import { rgbToHex } from 'utils/colorConverters'
import { getTopLeftPosition as _getTopLeftPosition } from 'utils/getTopLeftPosition'

/**
 * Create a new sprite for a given text.
 * Note that this won't generate the image and you need to call `ejectAllTextImages` after you have created all the sprites,
 * usually after `generateOsbString`.
 *
 * @param text Text to generate
 * @param layer The layer the object appears on.
 * @param origin The sprite's origin
 * @param initialPosition Where the sprite should be by default.
 * @param invokeFunction The commands that should be run when the sprite is created.
 */
export function createText(
	text: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	invokeFunction: (textImage: TextImage, getTopLeftPosition: (position: Vector2, scale?: number) => Vector2) => void
) {
	const { createdTextImages } = getTxtGenContext()

	let textImage = createdTextImages.find((textImage) => textImage.text === text && !textImage.isOutline) || generateTextImage(text, false)

	const getTopLeftPosition = (position: Vector2, scale: number = 1) =>
		_getTopLeftPosition(position, origin, textImage.width, textImage.height, scale)

	createSprite(textImage.osbPath, layer, origin, initialPosition, () => invokeFunction(textImage, getTopLeftPosition))
}

/**
 * Create a new sprite for a given text but with only outline.
 * It's recommended to use a seperate context for this.
 * Note that this won't generate the image and you need to call `ejectAllTextImages` after you have created all the sprites,
 * usually after `generateOsbString`.
 *
 * @param text Text to generate
 * @param layer The layer the object appears on.
 * @param origin The sprite's origin
 * @param initialPosition Where the sprite should be by default.
 * @param invokeFunction The commands that should be run when the sprite is created.
 */
export function createOutlineText(
	text: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	invokeFunction: (textImage: TextImage, getTopLeftPosition: (position: Vector2, scale?: number) => Vector2) => void
) {
	const { createdTextImages } = getTxtGenContext()

	let textImage = createdTextImages.find((textImage) => textImage.text === text && textImage.isOutline) || generateTextImage(text, true)

	const getTopLeftPosition = (position: Vector2, scale: number = 1) =>
		_getTopLeftPosition(position, origin, textImage.width, textImage.height, scale)

	createSprite(textImage.osbPath, layer, origin, initialPosition, () => invokeFunction(textImage, getTopLeftPosition))
}

function generateTextImage(text: string, isOutline: boolean): TextImage {
	const { fontProps, osbFolderPath, beatmapFolderPath, createdTextImages } = getTxtGenContext()
	const { name, size, padding, isItalic } = fontProps
	const { top, left } = padding

	const { width, height } = measureText(text)

	const canvas = getCanvasInstance()
	const ctx = getCanvasContext()
	resizeCanvas(width, height)

	ctx.font = `${isItalic ? 'italic' : ''} ${size}px "${name}"`
	ctx.textBaseline = 'top'
	// generate white text and then set color through command is better
	if (!isOutline) {
		ctx.fillStyle = rgbToHex({ r: 255, g: 255, b: 255 })
		ctx.fillText(text, left, top)
	} else {
		ctx.strokeStyle = rgbToHex({ r: 255, g: 255, b: 255 })
		ctx.strokeText(text, left, top)
	}

	// eject
	const osbPath = join(osbFolderPath, `_${createdTextImages.length}.png`)
	const path = join(beatmapFolderPath, osbPath)
	const buffer = Buffer.from(canvas.toDataURL('image/png').replace('data:image/png;base64,', ''), 'base64')
	setToBeEjected({ path, osbFolderPath, text, fontProps, isOutline, buffer })

	const textImage: TextImage = { width, height, text, path, osbPath, isOutline }
	createdTextImages.push(textImage)

	return textImage
}
