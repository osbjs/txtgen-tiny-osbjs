import { outputFile } from 'fs-extra'
import { TextImageBuffer } from 'types/TextImageBuffer'

const TO_BE_EJECTED: TextImageBuffer[] = []

export function setToBeEjected(textImageBuffer: TextImageBuffer) {
	TO_BE_EJECTED.push(textImageBuffer)
}

/**
 * Eject all text images into osu storyboard folder.
 */
export function ejectAllTextImages() {
	const ejectPromises = TO_BE_EJECTED.map((textImageBuffer) => outputFile(textImageBuffer.path, textImageBuffer.buffer))

	return Promise.all(ejectPromises)
}
