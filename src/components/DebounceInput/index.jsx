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

    const [can_save, setCanSave] = useState(true);

    function apply(e)
    {
        console.log(can_save);
        if(can_save)
        {
            setCanSave(false);
            dispatch(save({
                id,
                lang
            })) 
        }

        clearTimeout(inputTimeout);
        props.onChange(e);
        setInputTimeout(setTimeout(() => {
            setCanSave(true);
        }, props.timer ? props.timer : 500));
    }

    return(
        <TextField
            {...props}
            onChange={apply}
        />
    )
}