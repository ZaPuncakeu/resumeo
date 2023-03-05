import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { addArray } from "../../../utils/functions";
import EducationItem from "./EducationItem";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function Education()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    const dispatch = useDispatch();
    
    return (
        <section className="variable-section">
            <h1>{text.education}</h1>
            <br />
            <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={e => addArray('education', lang, id, dispatch)}
            >
                {text.add}
            </Button>

            <br /><br />

            {
                data[lang].education.map((education, i) => {
                    return(
                        <EducationItem size={data[lang].education.length} key={education.id} education={education} text={text} lang={lang} i={i}/>
                    )
                })
            }
        </section>
    )
}