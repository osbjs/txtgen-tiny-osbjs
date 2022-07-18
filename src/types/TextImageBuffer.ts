import { FontProps } from './FontProps'

export type TextImageBuffer = {
	path: string
	osbFolderPath: string
	text: string
	fontProps: FontProps
	isOutline: boolean
	buffer: Buffer
}
