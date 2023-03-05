import { Button, IconButton } from "@mui/material"
import { deleteArray, updateArrayData } from "../../../utils/functions"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DebounceInput from "../../DebounceInput";

import { moveDown, moveUp } from "../../../slices/resumeSlice";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Language({language, lang, text, i, size})
{
    const dispatch = useDispatch();
    const {id} = useParams();
    return (
        <div>
            
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={e => deleteArray('langs', i, text, lang, id, dispatch)}
                >
                    {text.delete}
                </Button>

                {
                    size === 1 ?
                    null
                    :
                    <div className='undo-redo'>
                        {
                            i === 0 ?
                            null
                            :
                            <IconButton 
                                aria-label="undo" 
                                className='undo'
                                onClick={e => dispatch(moveUp({
                                    id,
                                    lang,
                                    field: 'langs',
                                    position: i
                                }))}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        }

                        {
                            i === size-1 ?
                            null
                            :
                            <IconButton 
                                aria-label="undo" 
                                className='undo'
                                onClick={e => dispatch(moveDown({
                                    id,
                                    lang,
                                    field: 'langs',
                                    position: i
                                }))}
                            >
                                <ArrowDownwardIcon />
                            </IconButton>
                        }
                    </div>
                }
            </div>

            <br /><br />
            <div className='same-line'>
                <DebounceInput 
                    className='input' 
                    label={text.language_name} 
                    variant="filled" 
                    value={language.language_name}
                    onChange={e => updateArrayData('langs', e.target.value, 'language_name', i, lang, id, dispatch)}
                />
                <DebounceInput 
                    className='input' 
                    label={text.level} 
                    variant="filled" 
                    value={language.language_level}
                    onChange={e => updateArrayData('langs', e.target.value, 'language_level', i, lang, id, dispatch)}
                />
            </div>
        </div>
        
    )
}