import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { save } from "../../slices/resumeSlice";

export default function DebounceInput(props)
{
    const dispatch = useDispatch();
    const [inputTimeout, setInputTimeout] = useState(null);
    const lang = useSelector(state => state.lang.lang);
    const { id } = useParams();

    function apply(e)
    {
        clearTimeout(inputTimeout);
        props.onChange(e);
        setInputTimeout(setTimeout(() => {
            dispatch(save({
                id,
                lang
            }))   
        }, props.timer ? props.timer : 500));
    }

    return(
        <TextField
            {...props}
            onChange={apply}
        />
    )
}