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
import './style-mobile.css'
import { useState } from 'react';

export default function Mobile({
    download,
    uploadFile,
    loading
}) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { text, lang } = useSelector(state => state.lang);
    const { historyStack, newStack } = useSelector(state => state.resume);
    const [isOn, setIsOn] = useState(false);
    return (
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
                        style={{ color: historyStack[lang].length === 0 ? 'gray' : 'white' }}
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
                        style={{ color: newStack[lang].length === 0 ? 'gray' : 'white' }}
                    >
                        <RedoIcon />
                    </IconButton>
                </div>
            </div>
            
            
            <IconButton aria-label="print" className='redo' onClick={e => window.print()}>
                <LocalPrintshopIcon />
            </IconButton>

            <button className={`menu-btn fa fa-${!isOn ? 'bars' : 'close'}`} onClick={e => setIsOn(!isOn)}></button>
            
            {
                !isOn ?
                    null
                    :
                    <div className='menu'>
                        <div className='mobile-menu'>
                            <Select
                                variant='standard'
                                className='language-website menu-btns'
                                label={text.language}
                                onChange={e => dispatch(changeLanguage(e.target.value))}
                                value={lang}
                                color="info"
                            >
                                <MenuItem value={'fr'}>{text.fr}</MenuItem>
                                <MenuItem value={'en'}>{text.en}</MenuItem>
                            </Select>
                            <br />
                            <br />
                            <Button className='menu-btns' variant="outlined" component="label" startIcon={<FileUploadIcon />}>
                                {text.upload}
                                <input onChange={uploadFile} hidden type="file" />
                            </Button>

                            <br />
                            <br />
                            <Button onClick={e => save(id, lang)} variant='outlined' className='back-btn menu-btns' startIcon={<SaveIcon />} >
                                {text.save}
                            </Button>

                            <br />
                            <br />
                            <Button className='menu-btns' variant='contained' color="primary" startIcon={<DownloadIcon />} onClick={e => download()} >
                                {text.download}
                            </Button>

                            <br />
                            <br />
                            {/*
                            <Button onClick={e => window.print()} variant='outlined' className='back-btn menu-btns' startIcon={<LocalPrintshopIcon />} >
                                {text.print}
                            </Button>
                            */}
                        </div>
                    </div>
            }
        </>
    );
}