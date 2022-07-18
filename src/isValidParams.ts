import { isValidColor } from '@osbjs/tiny-osbjs'
import { TextGeneratorContext } from 'txtGenContext'
import { FontProps } from 'types/FontProps'
import { Padding } from 'types/Padding'

export function isValidPadding(padding: Padding): padding is Padding {
	return (
		typeof padding === 'object' &&
		typeof padding.top === 'number' &&
		typeof padding.bottom === 'number' &&
		typeof padding.left === 'number' &&
		typeof padding.right === 'number'
	)
}

export function isValidFontProps(fontProps: FontProps): fontProps is FontProps {
	return (
		typeof fontProps == 'object' &&
		typeof fontProps.size == 'number' &&
		typeof fontProps.name == 'string' &&
		typeof fontProps.isItalic == 'boolean' &&
		isValidColor(fontProps.color) &&
		isValidPadding(fontProps.padding)
	)
}

export function isValidTxtGenContext(context: TextGeneratorContext): context is TextGeneratorContext {
	return (
		isValidFontProps(context.fontProps) &&
		typeof context.beatmapFolderPath === 'string' &&
		typeof context.osbFolderPath === 'string' &&
		Array.isArray(context.createdTextImages) &&
		Array.isArray(context.memoizedMetrics)
	)
}
