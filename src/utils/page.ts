import readXlsxFile from 'read-excel-file'
import { By, WebElement } from 'selenium-webdriver'; // Import necessary WebDriver modules

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

type Obj = {[key: string] : string | Object}
const page: Obj = {};
const _ComponentLis: Obj = {};
const TableWithBlueHeading_0_2: Obj = {};

TableWithBlueHeading_0_2.heading1 = "Ano";
_ComponentLis.TableWithBlueHeading_0_2 = TableWithBlueHeading_0_2;
page._ComponentLis = _ComponentLis;



const workingDirectory: string = process.env.HOME || process.env.USERPROFILE || '';
const site = "888poker";
const damBase = "/content/dam/holdings888/888poker/";
const lang = "com/es/";


function findWebElement(element: WebElement, findBy: By): WebElement | null {
    const elem = element.findElements(findBy);
    return elem.length > 0 ? elem[0] : null;
}



function getLastBitFromUrl(url: string): string {
    return url.replace(/.*\/([^/?]+).*/, "$1");
}


function getAltFromUrl(url: string): string {
    let alt: string = getLastBitFromUrl(url);
    alt = alt.substring(0, alt.lastIndexOf("."));
    return alt;
}


function CreateFolder(dirName: string): string {
    try {
        if (!fs.existsSync(dirName)){
            fs.mkdirSync(dirName, { recursive: true });
        }
        return dirName;
    } catch (error) {
        console.log(error.toString());
        return '';
    }
}

function DownloadMediaByURL(imagepath: string, fileUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            const mediaUrl = new URL(fileUrl.startsWith('https:') ? fileUrl : `https:${fileUrl}`);
            const fileName = imagepath.replace(/%20/g, '_').replace(/%/g, '_');
            const pathToSave = path.join(workingDirectory, site, imagepath, fileName);

            // Create folder if not exists
            CreateFolder(path.join(workingDirectory, site, imagepath));

            const fileStream = fs.createWriteStream(pathToSave);

            https.get(mediaUrl, (response) => {
                response.pipe(fileStream);

                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(path.join(damBase, lang, imagepath, fileName));
                });
            }).on('error', (error) => {
                fs.unlink(pathToSave, () => {}); // Delete the file if an error occurs
                reject(error);
            });
        } catch (error) {
            console.log(error.toString());
            reject(error);
        }
    });
}


function getImageUrlFromDom(element: WebElement): string | null {
    let imageElement: string | null;
    imageElement = element.getAttribute("src") !== null ? element.getAttribute("src") : element.getAttribute("href");
    if (imageElement !== null && imageElement.includes("data:image")) {
        imageElement = element.getAttribute("data-original");
    }
    return imageElement;
}


async function map(path: string, _pageElement): Promise<Obj | null> {
    const image : Obj = {}

    try {

        let imageElement = await _pageElement.getCssValue("background-image");

        if (imageElement.includes("none")) {
            const imageElements: WebElement[] = await _pageElement.findElements(By.tagName("img"));
            if (imageElements.length === 0) {
                imageElement = getImageUrlFromDom(_pageElement);
            }
            for (const webElement of imageElements) {
                if (imageElement.length === 0 || imageElement.includes("none")) {
                    imageElement = getImageUrlFromDom(webElement);
                }
            }
        } else {
            imageElement = imageElement.split("\"")[1];
        }

        image.imageSize = "100%";
        image.fileReference = await DownloadMediaByURL(path, imageElement);
        image.altValueFromDAM = false;
        image.enableCaption = true;
        image.enableModal = true;
        image.paddingBottom = "None";
        image.paddingTop = "None";
        image.alt = (_pageElement.getAttribute("alt") === null || _pageElement.getAttribute("alt") === "")
            ? getAltFromUrl(image.fileReference.toString())
            : await _pageElement.getAttribute("alt");
        image.caption = await findWebElement(_pageElement, By.className("image-teaser")) === null
            ? ""
            : await _pageElement.findElement(By.className("image-teaser")).getText();


        return image;
    } catch (e) {
       console.log(`[ImageMapper] - ${e.toString()}`);
    }
    return null;
}
