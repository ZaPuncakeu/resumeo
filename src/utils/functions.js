import { writeArray as write, addArray as add, deleteArray as del } from "../slices/resumeSlice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { renderToStaticMarkup } from 'react-dom/server'
import { configProject } from "../../config";
import axios from 'redaxios';

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

export function deleteArray(array, position, text, lang, id, dispatch) {
    dispatch(del({
        lang,
        position,
        field: array,
        id
    }))
}

export function addArray(array, lang, id, dispatch) {
    console.log(id);
    dispatch(add({
        lang,
        field: array,
        id
    }))
}

const makeTextFile = (text) => {
    const data = new Blob([text], { type: 'application/json' });
    return window.URL.createObjectURL(data);
};

export function save(id, lang) {
    const a = document.createElement('a');
    const data = JSON.parse(window.localStorage.getItem('resumeo-data'))
    a.href = makeTextFile(JSON.stringify(data[id][lang]));
    a.download = data[id].name + " - " + lang;
    a.click();
}

export function downloadPDF(name, lang, setLoading) {
    return new Promise( async (resolve) => {
        const input = document.querySelector("#cv-container > div");
        const result = createPDFDocument(loopThroughRoots(input));
        
        const res = await axios.post(`${configProject.endpoint_url}/pdf/generate`, {
            name: `${name}-${lang}`,
            html: result.outerHTML
        });
        
        const linkSource = `data:application/pdf;base64,${res.data}`;
        const downloadLink = document.createElement("a");
        const fileName = `${name}-${lang}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
        resolve("done");
    })
}

function loopThroughRoots(root) {
    const resultNode = root.cloneNode(false);

    //if text
    if (root.nodeType == 3) {
        return root.cloneNode(true);
    }

    //normal node with children
    if (root.nodeType == 1) {
        const style = window.getComputedStyle(root);
        console.log(style);
        let cssText = "";
        for (var i = 0; i < style.length; i++) {
            cssText += style[i] + ": " + style.getPropertyValue(style[i]) + "; ";
        }

        for(let cl of root.classList)
        {
            resultNode.classList.add(cl);
        }

        resultNode.id = root.id;
        
        resultNode.setAttribute("style", cssText);
        for(let child of root.childNodes) {
            resultNode.appendChild(loopThroughRoots(child));
        }

    }
    return resultNode;
}

function createPDFDocument(rootNode) {
    rootNode.style.zoom = "100%";
    rootNode.style.width = "100%";
    rootNode.style.height = "100%";
    const html = document.createElement('html');
    const head = document.createElement('head');
    head.innerHTML = `<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,800;1,900&display=swap" rel="stylesheet">
    `;

    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,800;1,900&display=swap');
        * {
            font-family: Poppins sans-serif;
        }
        html, body {
            margin: 0;
            padding: 0;
            width: 210mm;
            height: 297mm;
        }
    ` 

    const body = document.createElement('body');
    body.appendChild(rootNode);
    html.appendChild(head);
    html.appendChild(style);
    html.appendChild(body);
    return html
}