export default function CVLanguages({
    languages,
    text
}) {
    return (
        languages.length === 0 ?
        null 
        :
        <div className="element-level">
            <h3>- {text.language} -</h3>

            {
                languages.map((l) => {
                    return <div key={`${l.id}-cv`}>
                        <span>{l.language_name}</span>
                        <span>{l.language_level}</span>
                    </div>
                })
            }
        </div>
    )
}