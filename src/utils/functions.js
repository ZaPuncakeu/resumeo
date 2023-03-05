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
    if(window.confirm(text.delete_msg))
    {
        dispatch(del({
            lang,
            position,
            field: array,
            id
        }))
    }
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
    a.download = data[id].name;
    a.click();
}

/* _exportPdf = () => {

     html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas);  // if you want see your screenshot in body.
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("download.pdf"); 
    });

 }
*/