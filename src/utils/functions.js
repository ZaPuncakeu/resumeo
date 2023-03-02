import { writeArray as write, addArray as add, deleteArray as del } from "../slices/resumeSlice";

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

export function save(name)
{
    const a = document.createElement('a');
    a.href = makeTextFile(window.localStorage.getItem('resumeo-data'));
    a.download = name
    a.click();
}