// TYPE -> STYLE -> FABRIC
import { Side, type DesignData } from '~/types/design';
import { FabricKey, ProductTypeKey } from './variable';
import * as Fabric from 'fabric';
import { CanvasSideId as SideCanvasId } from '@/types/design';
import cloneDeep from 'lodash/cloneDeep';

export interface CanvasData {
    modelSizeWidth?: number;
    modelSizeHeight?: number;
    modelWidth: number;
    modelHeight: number;
    canvasWidth: number;
    canvasHeight: number;
    canvasSizeWidth?: number;
    canvasSizeHeight?: number;
    top?: number;
    left?: number;
}

// START TSHIRT
export enum TshirtStyle {
    TSHIRT = 'tshirt',
    TSHIRT_V = 'tshirtv',
}

export enum TshirtFabric {
    COTTONCOMB = 'cottoncomb',
    COTTON100 = 'cotton100',
    SUPERSOFF = 'supersoff',
    MICROSPORT = 'microsport',
}

export enum TshirtVFabric {
    COTTONCOMB = 'cottoncomb',
    COTTON100 = 'cotton100',
    SUPERSOFF = 'supersoff',
    MICROSPORT = 'microsport',
}

// export type TshirtStyleFabric = Record<TshirtStyleFabric, CanvasData>;

// export type TshirtVStyleFabric = Record<TshirtVStyleFabric, CanvasData>;
// END TSHIRT

// START POLO
export enum PoloStyle {
    DEFAULT = 'default',
}

export enum PoloDefaultFabric {
    TC_LACOSTE = 'tclacoste',
    DRYTECH = 'drytech',
}
// END POLO

// START TOTEBAG
export enum TotebagStyle {
    DEFAULT = 'default',
}

export enum TotebagDefaultFabric {
    CANVAS_12_ONZE = 'canvas12onze',
}
// END TOTEBAG

// START APROM
export enum ApronStyle {
    DEFAULT = 'default',
}

export enum ApronDefaultFabric {
    DEFAULT = 'default',
}

// END APRON

const productCanvasData: Record<ProductTypeKey, DesignData> = {
    tshirt: {
        color: 'ffffff',
        type: ProductTypeKey.TSHIRT,
        style: 'tshirt',
        fabric: FabricKey.COTTONCOMB,
        canvas: [],
        activeCanvas: new Fabric.Canvas(),
        activeSide: Side.FRONT,
        activeSideIndex: 0,
        sideSeq: [
            {
                id: SideCanvasId.FRONT,
                name: Side.FRONT,
            },
            {
                id: SideCanvasId.RIGHT,
                name: Side.RIGHT,
            },
            {
                id: SideCanvasId.BACK,
                name: Side.BACK,
            },
            {
                id: SideCanvasId.LEFT,
                name: Side.LEFT,
            },
        ],
        imageLists: [],
        components: {},
        useGrid: false,
        gridObjects: [],
    },
    polo: {
        color: 'ffffff',
        type: ProductTypeKey.POLO,
        style: 'standard',
        fabric: FabricKey.DRYTECH,
        components: {},
        canvas: [],
        activeCanvas: new Fabric.Canvas(),
        activeSide: Side.FRONT,
        activeSideIndex: 0,
        sideSeq: [
            {
                id: SideCanvasId.FRONT,
                name: Side.FRONT,
            },
            {
                id: SideCanvasId.RIGHT,
                name: Side.RIGHT,
            },
            {
                id: SideCanvasId.BACK,
                name: Side.BACK,
            },
            {
                id: SideCanvasId.LEFT,
                name: Side.LEFT,
            },
        ],
        imageLists: [],
        useGrid: false,
        gridObjects: [],
    },
    totebag: {
        color: 'ffffff',
        type: ProductTypeKey.TOTEBAG,
        style: 'standard',
        fabric: FabricKey.CANVAS_12_ONZE,
        components: {},
        canvas: [],
        activeCanvas: new Fabric.Canvas(),
        activeSide: Side.FRONT,
        activeSideIndex: 0,
        sideSeq: [
            {
                id: SideCanvasId.FRONT,
                name: Side.FRONT,
            },
            {
                id: SideCanvasId.BACK,
                name: Side.BACK,
            },
        ],
        imageLists: [],
        useGrid: false,
        gridObjects: [],
    },
    apron: {
        color: 'ffffff',
        type: ProductTypeKey.APRON,
        style: 'standard',
        fabric: FabricKey.DEFAULT,
        components: {},
        canvas: [],
        activeCanvas: new Fabric.Canvas(),
        activeSide: Side.FRONT,
        activeSideIndex: 0,
        sideSeq: [
            {
                id: SideCanvasId.FRONT,
                name: Side.FRONT,
            },
            {
                id: SideCanvasId.BACK,
                name: Side.BACK,
            },
        ],
        imageLists: [],
        useGrid: false,
        gridObjects: [],
    },
};

export function getCanvasData(type: ProductTypeKey) {
    const data = cloneDeep(productCanvasData[type]);
    return data;
}

export default productCanvasData;
