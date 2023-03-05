import { Button, IconButton } from "@mui/material"
import { deleteArray, updateArrayData } from "../../../utils/functions"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DebounceInput from "../../DebounceInput";
import { moveDown, moveUp } from "../../../slices/resumeSlice";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Skill({skill, lang, text, i, size})
{
    const dispatch = useDispatch();
    const { id } = useParams();

    return (
        <div>
            
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={e => deleteArray('skills', i, text, lang, id, dispatch)}
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
                                    field: 'skills',
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
                                    field: 'skills',
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
                    label={text.skill_name} 
                    variant="filled" 
                    value={skill.skill_name}
                    onChange={e => updateArrayData('skills', e.target.value, 'skill_name', i, lang, id, dispatch)}
                />
                <DebounceInput 
                    className='input' 
                    label={text.level} 
                    variant="filled" 
                    value={skill.skill_level}
                    onChange={e => updateArrayData('skills', e.target.value, 'skill_level', i, lang, id, dispatch)}
                />
            </div>
        </div>
        
    )
}