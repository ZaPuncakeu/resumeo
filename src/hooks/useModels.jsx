import Model1 from "../components/CVContainer/models/Model1";

export default function useModels(model_num, {data, lang, text})
{
    const model = [
        <Model1 data={data} lang={lang} text={text}/>
    ]
    return model[model_num]
}