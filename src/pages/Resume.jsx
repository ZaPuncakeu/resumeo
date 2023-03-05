import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import ResumeForm from "../components/ResumeForm";
import CVContainer from '../components/CVContainer'
import { useParams } from "react-router-dom";
import { init, redo, undo } from "../slices/resumeSlice";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/CVContainer/Navbar";
export default function Resume()
{
    let { id } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(state => state.resume.data);
    const lang = useSelector(state => state.lang.lang);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(init({
            id: id     
        }))

        function KeyPress(e) {
            var evtobj = window.event? event : e
            if (evtobj.keyCode == 90 && evtobj.ctrlKey) return dispatch(undo({lang, id}));
            if (evtobj.keyCode == 89 && evtobj.ctrlKey) return dispatch(redo({lang, id}));
        }
      
        document.onkeydown = KeyPress;
    }, []);

    useEffect(() => {
        if(data[id]) {
            setLoading(false);
        }
    }, [data])
    
    return (
        <div>
            {
                loading ? 
                    <CircularProgress/>
                :
                <>
                    <Navbar/>
                    <ResumeForm/>
                    <CVContainer/>
                </>
            }
        </div>
    )
}