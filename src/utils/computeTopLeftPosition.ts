import { Origin, Vector2 } from '@osbjs/tiny-osbjs'

/**
 * Get top left position of the image.
 *
 * @param position Texture position.
 * @param origin Texture's origin.
 * @param width Text image's width.
 * @param height Text image's height.
 */
export function computeTopLeftPosition(position: Vector2, origin: Origin, width: number, height: number, scale: number = 1): Vector2 {
	const { x, y } = position

	switch (origin) {
		case 'TopLeft':
			return { x, y }
		case 'TopCentre':
			return { x: x + width * 0.5 * scale, y }
		case 'TopRight':
			return { x: x + width * scale, y }
		case 'CentreLeft':
			return { x, y: y + height * 0.5 * scale }
		case 'Centre':
			return { x: x + width * 0.5 * scale, y: y + height * 0.5 * scale }
		case 'CentreRight':
			return { x: x + width * scale, y: y + height * 0.5 * scale }
		case 'BottomLeft':
			return { x, y: y + height * scale }
		case 'BottomCentre':
			return { x: x + width * 0.5 * scale, y: y + height * scale }
		case 'BottomRight':
			return { x: x + width * scale, y: y + height * scale }

		default:
			throw new Error(origin + ' is not a valid origin.')
	}
}
