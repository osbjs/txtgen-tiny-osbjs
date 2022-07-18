import { createHash } from 'crypto'
import { copy, existsSync, outputFile } from 'fs-extra'
import path from 'path'
import { TextImageBuffer } from 'types/TextImageBuffer'

const TO_BE_EJECTED: TextImageBuffer[] = []
const CACHE_DIR = path.join(process.cwd(), 'node_modules', '.cache')

export function setToBeEjected(textImageBuffer: TextImageBuffer) {
	TO_BE_EJECTED.push(textImageBuffer)
}

/**
 * Eject all text images into osu storyboard folder.
 */
export function ejectAllTextImages(){
	const ejectPromises = TO_BE_EJECTED.map((textImageBuffer) => {
		const cachedPath = path.join(CACHE_DIR, textImageBuffer.osbFolderPath, getCacheKey(textImageBuffer))
		if (existsSync(cachedPath)) {
			return copy(cachedPath, textImageBuffer.path)
		} else {
			return Promise.all([outputFile(textImageBuffer.path, textImageBuffer.buffer), outputFile(cachedPath, textImageBuffer.buffer)])
		}
	})

	return Promise.all(ejectPromises)
}

function getCacheKey(textImageBuffer: TextImageBuffer) {
	const sha = (x: string) => createHash('sha256').update(x).digest('hex')

	const { text, fontProps, isOutline } = textImageBuffer

	const key = sha(text + JSON.stringify(fontProps) + isOutline.toString())

	return key + '.png'
}
