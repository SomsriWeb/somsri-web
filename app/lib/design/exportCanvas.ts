import { CanvasSideId, Side, type DesignData } from '~/types/design';
import { mediaUrl } from '~/utils/mediaUrl';

const MOCKUP_HEIGHT = 900;

function getMockupImage(designData: DesignData, side: Side) {
    return mediaUrl(`/image/mockup/${designData.type}/${designData.style}/${designData.fabric}/${side}/${designData.color}.png`);
}

function drawFrontImage(designData: DesignData, bgContext: CanvasRenderingContext2D) {
    return new Promise<boolean>((resolve) => {
        const frontShirt = new Image();
        const fcanvas = document.getElementById(CanvasSideId.FRONT);
        frontShirt.crossOrigin = 'anonymous';

        if (!fcanvas) resolve(true);

        frontShirt.onload = function () {
            const ratio = frontShirt.width / frontShirt.height;
            const width = ratio * MOCKUP_HEIGHT;

            // วาดเสื้อด้านหน้า
            bgContext.drawImage(frontShirt, 80, 320, width, MOCKUP_HEIGHT);

            // วาด canvas ด้านหน้าเสื้อ
            bgContext.drawImage(fcanvas as CanvasImageSource, 80, 320, width, MOCKUP_HEIGHT);

            resolve(true);
        };
        frontShirt.src = getMockupImage(designData, Side.FRONT);
    });
}

function drawBackImage(designData: DesignData, bgContext: CanvasRenderingContext2D) {
    return new Promise<boolean>((resolve) => {
        const backShirt = new Image();
        const bcanvas = document.getElementById(CanvasSideId.BACK);
        backShirt.crossOrigin = 'anonymous';

        if (!bcanvas) resolve(true);

        backShirt.onload = function () {
            const ratio = backShirt.width / backShirt.height;
            const width = ratio * MOCKUP_HEIGHT;

            // วาดเสื้อด้านหลัง
            bgContext.drawImage(backShirt, 1030, 320, width, MOCKUP_HEIGHT);
            // วาด canvas ด้านหลังเสื้อ
            bgContext.drawImage(bcanvas as CanvasImageSource, 1030, 320, width, MOCKUP_HEIGHT);

            resolve(true);
        };
        backShirt.src = getMockupImage(designData, Side.BACK);
    });
}

function drawLeftImage(designData: DesignData, bgContext: CanvasRenderingContext2D) {
    return new Promise<boolean>((resolve) => {
        const leftShirt = new Image();
        const lcanvas = document.getElementById(CanvasSideId.LEFT);
        leftShirt.crossOrigin = 'anonymous';

        if (!lcanvas) resolve(true);

        leftShirt.onload = function () {
            const ratio = leftShirt.width / leftShirt.height;
            const width = ratio * MOCKUP_HEIGHT;

            // วาดเสื้อด้านซ้าย
            bgContext.drawImage(leftShirt, 300, 1400, width, MOCKUP_HEIGHT);
            // วาด canvas เสื้อด้านซ้าย
            bgContext.drawImage(lcanvas as CanvasImageSource, 300, 1400, width, MOCKUP_HEIGHT);

            resolve(true);
        };
        leftShirt.src = getMockupImage(designData, Side.LEFT);
    });
}

function drawRightImage(designData: DesignData, bgContext: CanvasRenderingContext2D) {
    return new Promise<boolean>((resolve) => {
        const rightShirt = new Image();
        const rcanvas = document.getElementById(CanvasSideId.RIGHT);
        rightShirt.crossOrigin = 'anonymous';

        if (!rcanvas) resolve(true);

        rightShirt.onload = function () {
            const ratio = rightShirt.width / rightShirt.height;
            const width = ratio * MOCKUP_HEIGHT;

            // วาดเสื้อด้านขวา
            bgContext.drawImage(rightShirt, 1250, 1400, width, MOCKUP_HEIGHT);
            // วาด canvas เสื้อด้านขวา
            bgContext.drawImage(rcanvas as CanvasImageSource, 1250, 1400, width, MOCKUP_HEIGHT);

            resolve(true);
        };
        rightShirt.src = getMockupImage(designData, Side.RIGHT);
    });
}

function drawText(designData: DesignData, bgContext: CanvasRenderingContext2D, imgMetadata: { width: number; height: number }) {
    let str = '';
    str += 'ชนิดสินค้า: ';

    switch (designData.type) {
        case 'tshirt':
            str += 'เสื้อยืด';
            break;
        case 'polo':
            str += 'เสื้อโปโล';
            break;
        case 'totebag':
            str += 'ถุงผ้า';
            break;
        case 'apron':
            str += 'ผ้ากันเปื้อน';
            break;
    }

    switch (designData.style) {
        case 'tshirt':
            str += 'คอกลม ';
            break;
        case 'tshirtv':
            str += 'คอวี ';
            break;
        default:
            str += 'มาตรฐาน';
            break;
    }

    str += `, เนื้อผ้า: ${designData.fabric}`;

    str += `, Color code: #${designData.color}`;

    bgContext.font = '50px Arial';
    bgContext.fillStyle = 'red';
    bgContext.textAlign = 'center';
    bgContext.fillText(str, imgMetadata.width / 2, imgMetadata.height - 70);
}

export default (designData: DesignData) => {
    const background = new Image();
    background.crossOrigin = 'anonymous';

    background.onload = async function () {
        const bgCanvas = document.createElement('canvas');
        const bgContext = bgCanvas.getContext('2d') as CanvasRenderingContext2D;

        // กำหนดขนาดของ bgCanvas
        bgCanvas.width = background.width;
        bgCanvas.height = background.height;

        // วาดเฟรมพื้นหลัง
        bgContext?.drawImage(background, 0, 0);

        await drawFrontImage(designData, bgContext);
        await drawBackImage(designData, bgContext);
        await drawLeftImage(designData, bgContext);
        await drawRightImage(designData, bgContext);

        // สร้างลิงก์การดาวน์โหลด
        drawText(designData, bgContext, { width: bgCanvas.width, height: bgCanvas.height });
        const link = document.createElement('a');
        link.href = bgCanvas.toDataURL();
        link.download = 'design-somsritshirt.png';
        link.click();
    };
    background.src = mediaUrl('/image/renderbg.jpg');
};
