import { getCanvasContext, getCanvasInstance, getTxtGenContext } from 'txtGenContext'

export function measureText(text: string): TextMetrics {
	const { name, size } = getTxtGenContext().fontProps
	const canvas = getCanvasInstance()
	const context = getCanvasContext()

	// 2000 is big enough
	canvas.width = 2000
	canvas.height = 2000
	context.font = `${size}px "${name}"`
	context.textBaseline = 'top'

	return context.measureText(text)
}
