import './style.css';


import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { downloadPDF } from '../../../utils/functions';
import { upload } from '../../../slices/resumeSlice';
import { useWindowSize } from '../../../hooks/useWindowSize';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { useState } from 'react';

export default function Navbar()
{
    
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const {data} = useSelector(state => state.resume);

    const {lang} = useSelector(state => state.lang);
    const [loading, setLoading] = useState(false);

    function download()
    {
        setLoading(true);
        downloadPDF(data[id].name, lang)
        .then(() => setLoading(false));
    }

    function uploadFile(e) {
        const reader = new FileReader();
        reader.onload = () => {
            dispatch(upload({
                id,
                lang,
                data: JSON.parse(reader.result)
            }))
        }
        if(!e.target.files[0]) return;
        reader.readAsText(e.target.files[0]);
    }

    const { width } = useWindowSize();

    return(
        <div id="navbar">
            {
                width >= 860 ?
                <Desktop loading={loading} download={download} uploadFile={uploadFile} />
                :
                <Mobile loading={loading} download={download} uploadFile={uploadFile} />
            }
        </div>
    )
}