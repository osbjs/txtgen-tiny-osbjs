import { Origin, Vector2 } from '@osbjs/tiny-osbjs'

export function getCorrectTexturePosition(position: Vector2, width: number, height: number, origin: Origin): Vector2 {
	const { x, y } = position

	switch (origin) {
		case 'TopLeft':
			return { x, y }
		case 'TopCentre':
			return { x: x + width * 0.5, y }
		case 'TopRight':
			return { x: x + width, y }
		case 'CentreLeft':
			return { x, y: y + height * 0.5 }
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
			throw new Error('Invalid origin.')
	}
}
