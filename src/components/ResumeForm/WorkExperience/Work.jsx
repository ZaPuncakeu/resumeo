import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteArray, updateArrayData } from "../../../utils/functions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DebounceInput from "../../DebounceInput";
export default function Work({work_exp, lang, text, i})
{
    const dispatch = useDispatch();
    const { id } = useParams();

    return(
        <div>
            <Button 
                variant="outlined" 
                color="error" 
                startIcon={<DeleteIcon />}
                onClick={e => deleteArray('work_experience', i, text, lang, id, dispatch)}
            >
                {text.delete}
            </Button>

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.work_name} 
                variant="filled" 
                defaultValue={work_exp.work_name}
                onChange={e => updateArrayData('work_experience', e.target.value, 'work_name', i, lang, id, dispatch)}
            />
            
            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.employer} 
                variant="filled" 
                defaultValue={work_exp.employer}
                onChange={e => updateArrayData('work_experience', e.target.value, 'employer', i, lang, id, dispatch)}
            />

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.address} 
                variant="filled" 
                defaultValue={work_exp.address}
                onChange={e => updateArrayData('work_experience', e.target.value, 'address', i, lang, id, dispatch)}
            />

            <br /><br />
            
            <div>
                <h3>{text.start_date}</h3>
                <div className='same-line'>
                    <FormControl variant="filled">
                        <InputLabel id={"start-month-"+i}>{text.month}</InputLabel>
                        <Select
                            labelId={"start-month-"+i}
                            defaultValue={work_exp.start_month}
                            onChange={e => updateArrayData('work_experience', e.target.value, 'start_month', i, lang, id, dispatch)}
                        >
                            <MenuItem value={'none'}>{text.none}</MenuItem>
                            {
                                [...Array(12)].map((_, num) => {
                                    return(
                                        <MenuItem key={`${work_exp.id}-work-experience-start-month-${i}`} value={num+1}>{num+1}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                    <DebounceInput 
                        className='input' 
                        label={text.year} 
                        variant="filled" 
                        defaultValue={work_exp.start_year}
                        onChange={e => updateArrayData('work_experience', e.target.value, 'start_year', i, lang, id, dispatch)}
                    />
                </div>
            </div>

            <br /><br />
            
            <div>
                <h3>{text.end_date}</h3>
                {
                    !work_exp.present ?
                    <div className='same-line'>
                        <FormControl variant="filled">
                            <InputLabel id={"start-month-"+i}>{text.month}</InputLabel>
                            <Select
                                labelId={"start-month-"+i}
                                defaultValue={work_exp.end_month}
                                onChange={e => updateArrayData('work_experience', e.target.value, 'end_month', i, lang, id, dispatch)}
                            >
                                <MenuItem value={'none'}>{text.none}</MenuItem>
                                {
                                    [...Array(12)].map((_, num) => {
                                        return(
                                            <MenuItem key={`${work_exp.id}-work-experience-end-month-${i}`} value={num+1}>{num+1}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>

                        <DebounceInput 
                            className='input' 
                            label={text.year} 
                            variant="filled" 
                            defaultValue={work_exp.end_year}
                            onChange={e => updateArrayData('work_experience', e.target.value, 'end_year', i, lang, id, dispatch)}
                        />
                    </div>
                    :
                    null
                }

                <FormControlLabel 
                    control={<Checkbox 
                        defaultChecked={work_exp.present}
                        onChange={e => updateArrayData('work_experience', e.target.checked, 'present', i, lang, id, dispatch)}
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
                defaultValue={work_exp.description}
                onChange={e => updateArrayData('work_experience', e.target.value, 'description', i, lang, id, dispatch)}
            />
        </div>
    )
}