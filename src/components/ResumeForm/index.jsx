import './ResumeForm.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import Personal from './Personal/Personal';
import Profile from './Profile/Profile';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import Langs from './Langs';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../slices/langSlice';
import { write } from '../../slices/resumeSlice';
import { useParams } from 'react-router-dom';
import { save } from '../../utils/functions';
export default function ResumeForm()
{
    const { id } = useParams();
    
    const {lang, text} = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    console.log(data);
    const dispatch = useDispatch();
    return (
        <form onSubmit={e => e.preventDefault()} id="form-container">
            <section className="settings">
                <h1>{text.settings}</h1>
                <Button variant="contained">{text.model}</Button>
                <FormControl id="language-container">
                    <InputLabel id="language-label">{text.language}</InputLabel>
                    <Select
                        labelId="language-label"
                        label={text.language}
                        id="language"
                        onChange={e => dispatch(changeLanguage(e.target.value))}
                        value={lang}
                    >
                        <MenuItem value={'fr'}>{text.fr}</MenuItem>
                        <MenuItem value={'en'}>{text.en}</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" id="print" onClick={e => window.print()}>{text.print}</Button>
            </section>

            <hr />

            <section id="picture">
                <h1>{text.upload_picture}</h1>
                <div 
                    className='image-input-container'
                    style={{
                        backgroundImage: `url(${data[lang].picture})`
                    }}
                >
                    <input 
                        type="file" 
                        onChange={e => {
                            const reader = new FileReader();
                            reader.onload = () => {
                                dispatch(write({
                                    id,
                                    value: reader.result,
                                    field: 'picture',
                                    lang
                                }))
                            }
                            if(e.target.files[0])
                                reader.readAsDataURL(e.target.files[0]);
                        }}
                    />
                </div>
            </section>

            <hr />

            <Personal />

            <hr />
            
            <Profile />
            
            <hr />

            <WorkExperience />

            <hr />

            <Education />

            <hr />
            
            <Skills />

            <hr />

            <Langs />
            
            <Button variant="contained" onClick={e => save("save")}>{text.save}</Button>
            <br /><br />
        </form>
    )
}