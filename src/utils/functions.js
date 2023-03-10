import { writeArray as write, addArray as add, deleteArray as del } from "../slices/resumeSlice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';
import htmlToSvg from "htmlsvg";

export function updateArrayData(array, value, field, position, lang, id, dispatch) {
    dispatch(write({
        lang,
        position,
        field: array,
        key: field,
        value,
        id
    }))
}

export function deleteArray(array, position, text, lang, id, dispatch)
{
    dispatch(del({
        lang,
        position,
        field: array,
        id
    }))
}

export function addArray(array, lang, id, dispatch)
{
    console.log(id);
    dispatch(add({
        lang,
        field: array,
        id
    }))
}

const makeTextFile = (text) => {
    const data = new Blob([text], {type: 'application/json'});
    return window.URL.createObjectURL(data);
};

export function save(id, lang)
{
    const a = document.createElement('a');
    const data = JSON.parse(window.localStorage.getItem('resumeo-data'))
    a.href = makeTextFile(JSON.stringify(data[id][lang]));
    a.download = data[id].name + " - " + lang;
    a.click();
}

const svgConfig = {
    downloadSvg: true,
    downloadPng: true,
    convertDataUrl: true, // you need to convert images to dataurl if you wanna download png image
    filename: "htmltosvg",
};

export async function downloadPDF(name, lang) 
{
    const input = document.querySelector("#cv-container > div");

    /*let pdf = new jsPDF('p', 'mm', 'a4');
    let pWidth = pdf.internal.pageSize.width; 
    let srcWidth = input.scrollWidth;
    let margin = 0; 
    let scale = (pWidth - margin * 2) / srcWidth;
    pdf.html(input, {
        x: margin,
        y: margin,
        html2canvas: {
            scale: scale,
        },
        callback: function () {
            pdf.save(name+"-"+lang)
        }
    });*/

    /*const svg = await htmlToSvg(input, svgConfig);
    console.log(svg);
    */

    input.style.zoom = "100%";
    console.log(input);
    domtoimage.toSvg(input, { quality: 0.95, width: 800, height: 1120 })
    .then(function (dataUrl) {
        const link = document.createElement('a');
        link.download = 'my-image-name.svg';
        link.href = dataUrl;
        link.click();
        console.log(dataUrl);
    })
    
    /*html2canvas(input).then((canvas) => {
        console.log(canvas);
        //document.body.innerHTML = "";
        //document.body.appendChild(canvas);
        var imgData = canvas.toDataURL(
            'image/png');              
        var doc = new jsPDF('p', 'mm');
        doc.addImage(imgData, 'PNG', 0, 0);
        doc.save('sample-file.pdf');
    });*/
}

