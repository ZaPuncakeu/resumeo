import { Button } from "@mui/material";
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import useModels from "../../hooks/useModels";
import './Home.css';
export default function Home()
{
    
    const {lang, text} = useSelector((state) => state.lang)
    const navigate = useNavigate();
    const recent = JSON.parse(window.localStorage.getItem('resumeo-data') ? window.localStorage.getItem('resumeo-data') : '{}');
    function createResume()
    { 
        navigate(`/resume/${v4()}`);
    }

    function deleteResume(key) {
        delete recent[key];
        window.localStorage.setItem('resumeo-data', JSON.stringify(recent));
        window.location.reload();
    }

    return(
        <div id="home">
            <h1>Resumeo</h1>
            <h2>{text.home_slogan}</h2>
            <Button 
                id="start-btn" 
                variant="outlined"
                onClick={createResume}
            >
                {text.start_now}
            </Button>
            
            <div id="history">
                <h2>{text.recent}</h2>
                <div>
                    {
                        Object.keys(recent).map(key => {
                            return(
                                <div key={'recent-'+key}>
                                    <div className='model-container'>
                                        {useModels(recent[key].model, {lang, text, data: recent[key]})}
                                    </div>
                                    <br />
                                    <div className="btn-model">
                                        <Link to={`/resume/${key}`} style={{textDecoration: 'none'}}>
                                            <Button variant="outlined">{text.select}</Button>
                                        </Link>
                                        &nbsp;&nbsp;
                                        <Button variant="outlined" color="error" onClick={e => deleteResume(key)}>{text.delete}</Button>
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}