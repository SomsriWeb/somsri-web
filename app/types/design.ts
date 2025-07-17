import type { FabricKey, ProductTypeKey } from "~/lib/design/variable"
import type * as Fabric from "fabric"

export interface ImageList {
	id: string
	name: string
	file: File
	url: string
}

export interface DesignData {
	color: string
	type: ProductTypeKey
	style: string
	fabric: FabricKey
	components: Record<string, unknown>
	canvas: (Fabric.Canvas | Record<string, unknown>)[]
	activeCanvas: Fabric.Canvas | Record<string, unknown>
	activeSide: Side
	activeSideIndex: number
	sideSeq: {
		id: CanvasSideId
		name: Side
	}[]
	imageLists: ImageList[]
	useGrid: boolean
	gridObjects: (Fabric.Line | Record<string, unknown>)[][]
}

export enum CanvasSideId {
	FRONT = "fcanvas",
	BACK = "bcanvas",
	LEFT = "lcanvas",
	RIGHT = "rcanvas",
}

export enum Side {
	FRONT = "front",
	BACK = "back",
	LEFT = "left",
	RIGHT = "right",
}

export interface ProductStyle {
	label: string
	value: string
	imgUrl: string
}

export interface TextPayload {
	id: string
	text: string
	fontWeight: number
	fill: string
	fontSize: number
}
