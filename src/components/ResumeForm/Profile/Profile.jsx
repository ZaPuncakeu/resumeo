import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { write } from "../../../slices/resumeSlice";
import DebounceInput from "../../DebounceInput";

export default function Profile()
{
    const {id} = useParams();
    const {lang, text} = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    const dispatch = useDispatch();
    
    return(
        <section>
            <h1>{text.profile}</h1>
            <br />
            <DebounceInput 
                multiline
                rows={10}
                className='input' 
                label={text.description} 
                variant="outlined" 
                value={data[lang].profile}
                onChange={e => dispatch(write({
                    lang,
                    field: 'profile',
                    value: e.target.value,
                    id
                }))}
            />
        </section>
    )
}