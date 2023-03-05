import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteArray, updateArrayData } from "../../../utils/functions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DebounceInput from "../../DebounceInput";
import { moveDown, moveUp } from "../../../slices/resumeSlice";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function EducationItem({education, lang, text, i, size})
{
    const dispatch = useDispatch();
    const { id } = useParams();
    
    return(
        <div>
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<DeleteIcon />}
                    onClick={e => deleteArray('education', i, text, lang, id, dispatch)}
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
                                    field: 'education',
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
                                    field: 'education',
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
            
            <DebounceInput 
                className='input' 
                label={text.degree_name} 
                variant="filled" 
                value={education.degree_name}
                onChange={e => updateArrayData('education', e.target.value, 'degree_name', i, lang, id, dispatch)}
            />
            
            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.institution} 
                variant="filled" 
                value={education.institution}
                onChange={e => updateArrayData('education', e.target.value, 'institution', i, lang, id, dispatch)}
            />

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.address} 
                variant="filled" 
                value={education.address}
                onChange={e => updateArrayData('education', e.target.value, 'address', i, lang, id, dispatch)}
            />

            <br /><br />
            
            <div>
                <h3>{text.start_date}</h3>
                <div className='same-line'>
                    <FormControl variant="filled">
                        <InputLabel id={"start-month-"+i}>{text.month}</InputLabel>
                        <Select
                            labelId={"start-month-"+i}
                            value={education.start_month}
                            onChange={e => updateArrayData('education', e.target.value, 'start_month', i, lang, id, dispatch)}
                        >
                            <MenuItem value={'none'}>{text.none}</MenuItem>
                            {
                                [...Array(12)].map((_, num) => {
                                    return(
                                        <MenuItem key={`${education.id}-education-start-month-${num}`} value={num+1}>{num+1}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <DebounceInput 
                        className='input' 
                        label={text.year} 
                        variant="filled" 
                        value={education.start_year}
                        onChange={e => updateArrayData('education', e.target.value, 'start_year', i, lang, id, dispatch)}
                    />
                </div>
            </div>

            <br /><br />
            
            <div>
                <h3>{text.end_date}</h3>
                {
                    !education.present ?
                    <div className='same-line'>
                        <FormControl variant="filled">
                            <InputLabel id={"start-month-"+i}>{text.month}</InputLabel>
                            <Select
                                labelId={"start-month-"+i}
                                value={education.end_month}
                                onChange={e => updateArrayData('education', e.target.value, 'end_month', i, lang, id, dispatch)}
                            >
                                <MenuItem value={'none'}>{text.none}</MenuItem>
                                {
                                    [...Array(12)].map((_, num) => {
                                        return(
                                            <MenuItem key={`${education.id}-education-end-month-${num}`} value={num+1}>{num+1}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <DebounceInput 
                            className='input' 
                            label={text.year} 
                            variant="filled" 
                            value={education.end_year}
                            onChange={e => updateArrayData('education', e.target.value, 'end_year', i, lang, id, dispatch)}
                        />
                    </div>
                    :
                    null
                }

                <FormControlLabel 
                    control={<Checkbox 
                        defaultChecked={education.present}
                        onChange={e => updateArrayData('education', e.target.checked, 'present', i, lang, id, dispatch)}
                    />} 
                    label={text.present} 
                />
            </div>

            <br /><br />
            
            <DebounceInput 
                multiline
                rows={10}
                className='input' 
                label={text.description} 
                variant="outlined" 
                value={education.description}
                onChange={e => updateArrayData('education', e.target.value, 'description', i, lang, id, dispatch)}
            />
        </div>
    )
}