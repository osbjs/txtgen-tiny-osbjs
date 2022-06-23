import { Origin, Vector2 } from '@osbjs/tiny-osbjs'

/**
 * Useful if you want to apply effects to each letter. See example.
 * @example
 * let text = 'Hello'
 * let letterX = 0
 *
 * text.split('').forEach(letter => {
 *   createText(letter, 'Background', 'Center', { x: 320, y: 240 } ({ width, height }) => {
 *     const postion = getTexturePositionForAlignment({ letterX, y: 240 }, 'Center', width, height)
 * 	   moveAtTime(1000, postion)
 *     letterX += width
 *   })
 * })
 *
 * @param position Texture position.
 * @param origin Texture's origin.
 * @param width Text image's width.
 * @param height Text image's height.
 */
export function getTexturePositionForAlignment(position: Vector2, origin: Origin, width: number, height: number): Vector2 {
	const { x, y } = position

	switch (origin) {
		case 'TopLeft':
			return { x: x, y: y }
		case 'TopCentre':
			return { x: x + width * 0.5, y }
		case 'TopRight':
			return { x: x + width, y }
		case 'CentreLeft':
			return { x: x, y: y + height * 0.5 }
		case 'Centre':
			return { x: x + width * 0.5, y: y + height * 0.5 }
		case 'CentreRight':
			return { x: x + width, y: y + height * 0.5 }
		case 'BottomLeft':
			return { x, y: y + height }
		case 'BottomCentre':
			return { x: x + width * 0.5, y: y + height }
		case 'BottomRight':
			return { x: x + width, y: y + height }

		default:
			throw new Error(origin + ' is not a valid origin.')
	}
}
