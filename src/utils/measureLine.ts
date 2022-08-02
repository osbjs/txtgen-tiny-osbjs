import { measureText } from 'measureText'

/**
 * Get total line width by calling reducer on each character/word in the line of text.
 *
 * @param line Line of text to measure.
 * @param reducer How the calculation should process.
 * @param mode Whether you want to measure character or word.
 */
export function measureLineWidth(
	line: string,
	reducer: (prevWidth: number, currentWidth: number) => number = (prevWidth, currentWidth) => prevWidth + currentWidth,
	mode: 'char' | 'word' = 'char'
) {
	const textWidthArr = line.split(mode == 'word' ? ' ' : '').map((text) => measureText(text).width)

	return textWidthArr.reduce(reducer, 0)
}

/**
 * Get total line height by calling reducer on each letter in the line of text.
 *
 * @param line Line of text to measure.
 * @param reducer How the calculation should process.
 * @param mode Whether you want to measure character or word.
 */
export function measureLineHeight(
	line: string,
	reducer: (prevHeight: number, currentHeight: number) => number = (prevHeight, currentHeight) => prevHeight + currentHeight,
	mode: 'char' | 'word' = 'char'
) {
	const textHeightArr = line.split(mode == 'word' ? ' ' : '').map((text) => measureText(text).height)

	return textHeightArr.reduce(reducer, 0)
}

/**
 * Get the maximum width of each character/word of the line of text.
 * @param line Line of text to measure
 * @param mode Whether you want to measure character or word.
 */
export function maxLineWidth(line: string, mode: 'char' | 'word' = 'char') {
	return measureLineWidth(line, (pr, cr) => Math.max(pr, cr), mode)
}

/**
 * Get the maximum height of each character/word of the line of text.
 * @param line Line of text to measure
 * @param mode Whether you want to measure character or word.
 */
export function maxLineHeight(line: string, mode: 'char' | 'word' = 'char') {
	return measureLineHeight(line, (pr, cr) => Math.max(pr, cr), mode)
}
