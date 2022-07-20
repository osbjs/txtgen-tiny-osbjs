import { Color } from '@osbjs/tiny-osbjs'

/**
 * Convert RGB color to hex color code.
 * @param color RGB color.
 */
export function rgbToHex(color: Color): string {
	const [r, g, b] = color
	if (typeof r !== 'number' || typeof g !== 'number' || typeof b !== 'number' || r > 255 || g > 255 || b > 255) {
		throw new TypeError('Expected three numbers below 256')
	}

	return '#' + (b | (g << 8) | (r << 16) | (1 << 24)).toString(16).slice(1)
}

/**
 * Convert hex color code to RGB color.
 * @param hex Hex represents a color.
 */
export function hexToRgb(hex: string): Color {
	const trimmed = hex.replace('#', '')
	const r = parseInt('0x' + trimmed[0] + trimmed[1]) | 0,
		g = parseInt('0x' + trimmed[2] + trimmed[3]) | 0,
		b = parseInt('0x' + trimmed[4] + trimmed[5]) | 0

	return [r, g, b]
}
