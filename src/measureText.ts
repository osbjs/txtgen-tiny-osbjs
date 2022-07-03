import { getCanvasContext, getCanvasInstance, getTxtGenContext } from 'txtGenContext'

export function measureText(text: string): { width: number; height: number } {
	const { memoizedMetrics } = getTxtGenContext()

	const memoizedMetricIndex = memoizedMetrics.findIndex(({ text: _text }) => _text == text)
	if (memoizedMetricIndex != -1) {
		const { width, height } = memoizedMetrics[memoizedMetricIndex]
		return { width, height }
	}

	const { name, size, padding } = getTxtGenContext().fontProps
	const { top, bottom, left, right } = padding
	const canvas = getCanvasInstance()
	const context = getCanvasContext()

	// 2000 is big enough
	canvas.width = 2000
	canvas.height = 2000
	context.font = `${size}px "${name}"`
	context.textBaseline = 'top'

	const measure = context.measureText(text)
	const height = Math.abs(measure.actualBoundingBoxAscent) + measure.actualBoundingBoxDescent + top + bottom
	const width = Math.abs(measure.actualBoundingBoxLeft) + measure.actualBoundingBoxRight + left + right

	memoizedMetrics.push({ text, width, height })

	return { width, height }
}
