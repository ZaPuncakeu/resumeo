import './ResumeForm.css';
import { Button, FormControl, InputLabel, MenuItem, Select, Slider } from "@mui/material"
import Personal from './Personal/Personal';
import Profile from './Profile/Profile';
import WorkExperience from './WorkExperience';
import Education from './Education';
import Skills from './Skills';
import Langs from './Langs';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../slices/langSlice';
import { scrollImage, write } from '../../slices/resumeSlice';
import { useParams } from 'react-router-dom';
export default function ResumeForm()
{
    const { id } = useParams();
    
    const {lang, text} = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    console.log(data);
    const dispatch = useDispatch();
    return (
        <form onSubmit={e => e.preventDefault()} id="form-container">

            <section id="picture">
                <h1>{text.upload_picture}</h1>
                <br />
                {
                    data[lang].picture.src.length === 0 ?
                    null
                    :
                    <div className='image-pos-x'>
                        <Slider onChange={e => dispatch(scrollImage({
                            value: e.target.value,
                            lang,
                            id,
                            direction: "image_position_x" 
                        }))} value={data[lang].picture.image_position_x} aria-label="Default" max={data[lang].picture.width/2} min={-data[lang].picture.width/2}/>
                    </div>
                }
                <div className='img-slider'>
                    {
                        data[lang].picture.src.length === 0 ?
                        null
                        :
                        <div className='image-pos-y'>
                            <Slider orientation='vertical' onChange={e => dispatch(scrollImage({
                                        value: e.target.value,
                                        lang,
                                        id,
                                        direction: "image_position_y" 
                                    }))} value={data[lang].picture.image_position_y} aria-label="Default" max={data[lang].picture.height/2} min={-data[lang].picture.height/2} />
                        </div>
                    }
                    <div 
                        className='image-input-container'
                        style={{
                            backgroundImage: `url(${data[lang].picture.src.length === 0 ? "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" : data[lang].picture.src})`,
                            backgroundPositionX: `${data[lang].picture.image_position_x}px`,
                            backgroundPositionY: `${data[lang].picture.image_position_y}px`,
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <input 
                            type="file" 
                            onChange={e => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    var img = new Image();
                                    img.src = reader.result;
                                    img.onload = () => {
                                        dispatch(write({
                                            id,
                                            value: {
                                                src: reader.result,
                                                width: img.width,
                                                height: img.height,
                                                image_position_x: 0,
                                                image_position_y: 0
                                            },
                                            field: 'picture',
                                            lang
                                        }))
                                    }
                                    
                                }
                                if(e.target.files[0])
                                    reader.readAsDataURL(e.target.files[0]);
                            }}
                        />
                    </div>
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
            
        </form>
    )
}