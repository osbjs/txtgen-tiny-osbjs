import { createSprite, Layer, Origin, Vector2 } from '@osbjs/tiny-osbjs'
import { outputFileSync } from 'fs-extra'
import { measureText } from 'measureText'
import { join } from 'path'
import { rgbToHex } from 'utils/colorConverters'
import { getCanvasContext, getCanvasInstance, getTxtGenContext, resizeCanvas } from 'txtGenContext'
import { TextImage } from 'types/TextImage'

/**
 * Generate image with given text and create a new sprite for that image.
 *
 * @param text Text to generate
 * @param layer The layer the object appears on.
 * @param origin The sprite's origin
 * @param initialPosition Where the sprite should be by default.
 * @param invokeFunction The commands that should be run when the sprite is created.
 */
export function createText(text: string, layer: Layer, origin: Origin, initialPosition: Vector2, invokeFunction: (textImage: TextImage) => void) {
	const { createdTextImages, osbPath } = getTxtGenContext()

	let textImage = createdTextImages.find((textImage) => textImage.text === text) || generateTextImage(text)

	createSprite(osbPath, layer, origin, initialPosition, () => invokeFunction(textImage))
}

export function generateTextImage(text: string): TextImage {
	const { fontProps, osbPath, beatmapFolderPath, createdTextImages } = getTxtGenContext()
	const { name, size, color, padding } = fontProps
	const { top, left } = padding

	const { width, height } = measureText(text)

	const canvas = getCanvasInstance()
	const ctx = getCanvasContext()
	resizeCanvas(width, height)

	ctx.font = `${size}px "${name}"`
	ctx.textBaseline = 'top'
	ctx.fillStyle = rgbToHex(color)
	ctx.fillText(text, left, top)

	// eject
	const path = join(beatmapFolderPath, osbPath, `_${createdTextImages.length}.png`)
	const buffer = Buffer.from(canvas.toDataURL('image/png').replace('data:image/png;base64,', ''), 'base64')
	outputFileSync(path, buffer)

	const textImage: TextImage = { width, height, text, path }
	createdTextImages.push(textImage)

	return textImage
}
