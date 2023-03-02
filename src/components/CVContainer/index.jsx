import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useModels from '../../hooks/useModels';
import './CVContainer.css';
import Model1 from "./models/Model1";

export default function CVContainer()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);

    const Model = useModels(data.model, {lang, text, data});

    return(
        <div id="cv-container">
            {Model}
        </div>
    )
}