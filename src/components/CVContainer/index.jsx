import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useModels from '../../hooks/useModels';
import './CVContainer.css';
import { useWindowSize } from '../../hooks/useWindowSize';
export default function CVContainer()
{
    const { id } = useParams();
    const { lang, text } = useSelector(state => state.lang);
    const data = useSelector(state => state.resume.data[id]);

    const Model = useModels(data.model, {lang, text, data});
    const { width } = useWindowSize();
    return(
        <div id="cv-container" className={`cv-container-${width >= 860 ? 'desktop' : 'mobile'}`}>
            {Model}
        </div>
    )
}