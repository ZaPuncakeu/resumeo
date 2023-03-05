import { writeArray as write, addArray as add, deleteArray as del } from "../slices/resumeSlice";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

export function downloadPDF(name, lang) 
{
    const input = document.querySelector("#cv-container > div");

    let pdf = new jsPDF('p', 'mm', 'a4');
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
    });
}