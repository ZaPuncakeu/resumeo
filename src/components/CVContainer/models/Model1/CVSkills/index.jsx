export default function CVSkills ({
    skills,
    text
}) {
    return (
        skills.length === 0 ?
        null 
        :
        <div className="element-level">
            <h3>- {text.skills} -</h3>

            {
                data[lang].skills.map((s) => {
                    return <div key={`${s.id}-cv`} className='skills-element'>
                        <span>{s.skill_name}</span>
                        <span>{s.skill_level}</span>
                    </div>
                })
            }
        </div>
    )
}