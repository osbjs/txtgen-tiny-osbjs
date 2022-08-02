import { measureText } from 'measureText'

/**
 * Get total line width by calling reducer on each character/word in the line of text.
 *
 * @param line Line of text to measure.
 * @param mode Whether you want to measure character or word.
 * Will default to character mode if specified anything but 'char' or 'word'.
 * @param reducer How the calculation should process.
 */
export function measureLineWidth(
	line: string,
	mode: 'char' | 'word' | any = 'char',
	reducer: (prevWidth: number, currentWidth: number) => number = (prevWidth, currentWidth) => prevWidth + currentWidth
) {
	const textArr = line.split(mode === 'word' ? ' ' : '')
	const textWidthArr = textArr.map((text) => measureText(text).width)

	return textWidthArr.reduce(reducer, 0) + (mode === 'word' ? (textArr.length - 1) * measureText(' ').width : 0)
}

/**
 * Get total line height by calling reducer on each letter in the line of text.
 *
 * @param line Line of text to measure.
 * @param mode Whether you want to measure character or word.
 * Will default to character mode if specified anything but 'char' or 'word'.
 * @param reducer How the calculation should process.
 */
export function measureLineHeight(
	line: string,
	mode: 'char' | 'word' | any = 'char',
	reducer: (prevHeight: number, currentHeight: number) => number = (prevHeight, currentHeight) => prevHeight + currentHeight
) {
	const textArr = line.split(mode === 'word' ? ' ' : '')
	const textHeightArr = textArr.map((text) => measureText(text).height)

	return textHeightArr.reduce(reducer, 0) + (mode === 'word' ? (textArr.length - 1) * measureText(' ').width : 0)
}

/**
 * Get the maximum width of each character/word of the line of text.
 * @param line Line of text to measure
 * @param mode Whether you want to measure character or word.
 * Will default to character mode if specified anything but 'char' or 'word'.
 */
export function maxLineWidth(line: string, mode: 'char' | 'word' | any = 'char') {
	return measureLineWidth(line, mode, (pr, cr) => Math.max(pr, cr))
}

/**
 * Get the maximum height of each character/word of the line of text.
 * @param line Line of text to measure
 * @param mode Whether you want to measure character or word.
 * Will default to character mode if specified anything but 'char' or 'word'.
 */
export function maxLineHeight(line: string, mode: 'char' | 'word' | any = 'char') {
	return measureLineHeight(line, mode, (pr, cr) => Math.max(pr, cr))
}
