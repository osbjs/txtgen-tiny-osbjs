import { measureText } from 'measureText'

/**
 * Get total line width by calling reducer on each letter in the line of text.
 *
 * @param line Line of text to measure.
 * @param reducer How the calculation should process.
 */
export function measureLineWidth(
	line: string,
	reducer: (prevWidth: number, currentWidth: number) => number = (prevWidth, currentWidth) => prevWidth + currentWidth
) {
	const textWidthArr = line.split('').map((text) => measureText(text).width)

	return textWidthArr.reduce(reducer, 0)
}

/**
 * Get total line height by calling reducer on each letter in the line of text.
 *
 * @param line Line of text to measure.
 * @param reducer How the calculation should process.
 */
export function measureLineHeight(
	line: string,
	reducer: (prevHeight: number, currentHeight: number) => number = (prevHeight, currentHeight) => prevHeight + currentHeight
) {
	const textHeightArr = line.split('').map((text) => measureText(text).width)

	return textHeightArr.reduce(reducer, 0)
}
