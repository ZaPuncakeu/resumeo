import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { write } from "../../../slices/resumeSlice"
import DebounceInput from "../../DebounceInput";

export default function Personal()
{
    const { id } = useParams();

    const {lang, text} = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id])
    const dispatch = useDispatch();
    return(
        <section>
            <h1>{text.personal}</h1>
            <br />
            <DebounceInput 
                className='input' 
                label={text.fullname} 
                variant="filled" 
                defaultValue={data[lang].fullname}
                onChange={e => dispatch(write({
                    lang,
                    field: 'fullname',
                    value: e.target.value,
                    id
                }))}
            />

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.title} 
                variant="filled" 
                defaultValue={data[lang].title}
                onChange={e => dispatch(write({
                    lang,
                    field: 'title',
                    value: e.target.value,
                    id
                }))}
            />
            
            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.email} 
                variant="filled" 
                defaultValue={data[lang].email}
                onChange={e => dispatch(write({
                    lang,
                    field: 'email',
                    value: e.target.value,
                    id
                }))}
            />

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.phone} 
                variant="filled" 
                defaultValue={data[lang].phone}
                onChange={e => dispatch(write({
                    lang,
                    field: 'phone',
                    value: e.target.value,
                    id
                }))}
            />

            <br /><br />

            <DebounceInput 
                className='input' 
                label={text.address} 
                variant="filled" 
                defaultValue={data[lang].address}
                onChange={e => dispatch(write({
                    lang,
                    field: 'address',
                    value: e.target.value,
                    id
                }))}
            />
        </section>
    )
}