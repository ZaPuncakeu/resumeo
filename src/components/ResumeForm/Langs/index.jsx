import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { addArray } from "../../../utils/functions";
import Language from "./Language";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Langs()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);
    const dispatch = useDispatch();

    return(
        <section className="variable-section">
            <h1>{text.langs}</h1>
            <br />
            <Button 
                variant="outlined" 
                startIcon={<AddIcon />}
                onClick={e => addArray('langs', lang, id, dispatch)}
            >
                {text.add}
            </Button>
            
            {
                data[lang].langs.map((language, i) => {
                    return(
                        <Language 
                            key={language.id}
                            language={language}
                            text={text} 
                            lang={lang} 
                            i={i}
                            size={data[lang].langs.length}
                        />
                    )
                })
            }
        </section>
    )
}