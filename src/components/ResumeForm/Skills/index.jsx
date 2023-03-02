import { Button } from "@mui/material"
import Skill from "./Skill"
import AddIcon from '@mui/icons-material/Add';
import { addArray } from "../../../utils/functions";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Skills()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    const dispatch = useDispatch();

    return(
        <section className="variable-section">
            <h1>{text.skills}</h1>
            <br />
            <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={e => addArray('skills', lang, id, dispatch)}
            >
                {text.add}
            </Button>
            
            {
                data[lang].skills.map((skill, i) => {
                    return(
                        <Skill 
                            key={skill.id}
                            skill={skill}
                            text={text} 
                            lang={lang} 
                            i={i}
                        />
                    )
                })
            }
        </section>
    )
}