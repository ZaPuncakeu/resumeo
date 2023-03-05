export default function CVWorkExperience({
    text,
    work_experience
}) {
    return (
        work_experience.length === 0 ?
        null 
        :
        <section>
            <h1 className="section-title">
                <button className="fa fa-suitcase">
                </button>
                &nbsp;
                {text.work_experience}
            </h1>
            <div className="variable-content">
                {
                    work_experience.map((work, i) => {
                        return <div key={`${work.id}-education-cv`}>
                            <div className="title-date">
                                <h2>{work.work_name}</h2>
                                <span>{work.start_month !== "none" ? <>{work.start_month}/</>:null}{work.start_year} - {work.present ? text.present : <>{work.end_month !== "none" ? <>{work.end_month}/</> : null}{work.end_year}</>}</span>
                            </div>
                            <span className="place-name">{work.employer}</span>
                            <p>
                                {
                                    work.description ?
                                    work.description.split('\n').map((txt, i) => {
                                        return (
                                            <span key={`profile-description-${i}`}>
                                                <span>{txt}</span>
                                                {
                                                    i < work.description.split('\n').length - 1 ?
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