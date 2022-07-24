import { Color } from '@osbjs/tiny-osbjs'

export function rgbToHex(color: Color): string {
	const [r, g, b] = color
	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
		throw new TypeError('Color range can only go from 0 to 255')
	}

	return '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)
}
