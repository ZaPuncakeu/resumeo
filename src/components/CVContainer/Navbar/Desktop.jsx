import { Button, IconButton, MenuItem, Select } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SaveIcon from '@mui/icons-material/Save';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { redo, undo } from '../../../slices/resumeSlice';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { changeLanguage } from '../../../slices/langSlice';
import { Link, useParams } from 'react-router-dom';
import { save } from '../../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';

export default function Desktop({
    download,
    uploadFile,
    loading
})
{
    const dispatch = useDispatch();
    const { id } = useParams();
    const {text, lang} = useSelector(state => state.lang);
    const {historyStack, newStack} = useSelector(state => state.resume);

    return(
        <>
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

                <Button disabled={loading} variant='contained' color="primary" startIcon={<DownloadIcon />} onClick={e => download()} >
                    {text.download}
                </Button>

                <IconButton aria-label="print" className='redo' onClick={e => window.print()}>
                    <LocalPrintshopIcon />
                </IconButton>
            </div>
        </>
    )
}