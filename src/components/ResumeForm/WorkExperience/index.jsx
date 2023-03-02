import { Button } from "@mui/material";
import Work from "./Work";
import AddIcon from '@mui/icons-material/Add';
import { addArray } from "../../../utils/functions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function WorkExperience()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    const dispatch = useDispatch();

    return (
        <section className="variable-section">
            <h1>{text.work_experience}</h1>
            <br />
            <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={e => addArray('work_experience', lang, id, dispatch)}
            >
                {text.add}
            </Button>

            <br /><br />

            {
                data[lang].work_experience.map((work_exp, i) => {
                    return(
                        <Work key={work_exp.id} work_exp={work_exp} text={text} lang={lang} i={i}/>
                    )
                })
            }
        </section>
    )
}