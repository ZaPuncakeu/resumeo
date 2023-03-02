import { Button } from "@mui/material"
import { deleteArray, updateArrayData } from "../../../utils/functions"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DebounceInput from "../../DebounceInput";

export default function Skill({skill, lang, text, i})
{
    const dispatch = useDispatch();
    const { id } = useParams();
    
    return (
        <div>
            <Button 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={e => deleteArray('skills', i, text, lang, id, dispatch)}
            >
                {text.delete}
            </Button>
            <br /><br />
            <div className='same-line'>
                <DebounceInput 
                    className='input' 
                    label={text.skill_name} 
                    variant="filled" 
                    defaultValue={skill.skill_name}
                    onChange={e => updateArrayData('skills', e.target.value, 'skill_name', i, lang, id, dispatch)}
                />
                <DebounceInput 
                    className='input' 
                    label={text.level} 
                    variant="filled" 
                    defaultValue={skill.skill_level}
                    onChange={e => updateArrayData('skills', e.target.value, 'skill_level', i, lang, id, dispatch)}
                />
            </div>
        </div>
        
    )
}