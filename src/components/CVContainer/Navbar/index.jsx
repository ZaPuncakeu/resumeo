import './style.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { save, downloadPDF } from '../../../utils/functions';
import { changeLanguage } from '../../../slices/langSlice';
import { redo, undo, upload } from '../../../slices/resumeSlice';
import CVContainer from '..';
import html2canvas from 'html2canvas';

export default function Navbar()
{
    const {text, lang} = useSelector(state => state.lang);
    
    const dispatch = useDispatch();
    const { id } = useParams();
    const {data, historyStack, newStack} = useSelector(state => state.resume);
    console.log(data, historyStack, newStack)
    function download()
    {
        downloadPDF(data[id].name, lang);
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

    return(
        <div id="navbar">
            <Link to="/">
                <Button className='back-btn' variant="outlined" startIcon={<ArrowBackIcon />} >
                    {text.back_home}
                </Button>
            </Link>

            <div className='right-side'>
                <div className='undo-redo'>
                    <IconButton 
                        onClick={e => dispatch(undo({
                            lang,
                            id
                        }))} 
                        aria-label="undo" 
                        className='undo'
                        disabled={historyStack[lang].length === 0}
                        style={{color: historyStack[lang].length === 0 ? 'gray': 'white'}}
                    >
                        <UndoIcon />
                    </IconButton>
                    
                    <IconButton 
                        onClick={e => dispatch(redo({
                            lang, 
                            id
                        }))} 
                        aria-label="redo" 
                        className='redo'
                        disabled={newStack[lang].length === 0}
                        style={{color: newStack[lang].length === 0 ? 'gray': 'white'}}
                    >
                        <RedoIcon />
                    </IconButton>
                </div>

                <Select
                    variant='standard'
                    className='language-website'
                    label={text.language}
                    onChange={e => dispatch(changeLanguage(e.target.value))}
                    value={lang}
                    color="info"
                >
                    <MenuItem value={'fr'}>{text.fr}</MenuItem>
                    <MenuItem value={'en'}>{text.en}</MenuItem>
                </Select>

                <Button variant="outlined" component="label" startIcon={<FileUploadIcon />}>
                    {text.upload}
                    <input onChange={uploadFile} hidden type="file" />
                </Button>
                
                <Button onClick={e => save(id, lang)} variant='outlined' className='back-btn' startIcon={<SaveIcon />} >
                    {text.save}
                </Button>

                <Button variant='contained' color="primary" startIcon={<DownloadIcon />} onClick={e => download()} >
                    {text.download}
                </Button>

                <IconButton aria-label="print" className='redo' onClick={e => window.print()}>
                    <LocalPrintshopIcon />
                </IconButton>
            </div>
        </div>
    )
}