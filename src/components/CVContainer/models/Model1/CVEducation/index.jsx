export default function CVEducation({
    educations,
    text
}) {
    return (
        educations.length === 0 ?
        null 
        :
        <section>
            <h1 className="section-title">
                <button className="fa fa-graduation-cap">
                </button>
                &nbsp;
                {text.education}
            </h1>
            <div className="variable-content">
                {
                    educations.map((education, i) => {
                        return <div key={`${education.id}-education-cv`}>
                            <div className="title-date">
                                <h2>{education.degree_name}</h2>
                                <span>{education.start_month !== "none" ? <>{education.start_month}/</>:null}{education.start_year} - {education.present ? text.present : <>{education.end_month !== "none" ? <>{education.end_month}/</> : null}{education.end_year}</>}</span>
                            </div>
                            <span className="place-name">{education.institution}</span>
                            <p>
                                {
                                    education.description ?
                                    education.description.split('\n').map((txt, i) => {
                                        return (
                                            <span key={`profile-description-${i}`}>
                                                <span>{txt}</span>
                                                {
                                                    i < education.description.split('\n').length - 1 ?
                                                    <br/>
                                                    :
                                                    null
                                                }
                                            </span>
                                        )
                                    })
                                    :
                                    null
                                }
                            </p>
                        </div>
                    })
                }
            </div>
        </section>
    )
}