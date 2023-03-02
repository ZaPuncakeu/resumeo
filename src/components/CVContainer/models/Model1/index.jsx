import { useEffect, useState } from "react";
import "./style.css";

export default function({data, lang, text}) {
    const [fullname, setFullname] = useState(data[lang].fullname.split(' '));
    useEffect(() => {
        setFullname(data[lang].fullname.split(' '));
    }, [data])
    return (
        <div id="model1">
            <div className="left-side">
                <div className="segement-1">
                    <div 
                        className="profile-picture"
                        style={{
                            backgroundImage: `url(${data[lang].picture})`
                        }}
                    ></div>
                </div>
                <div className="segement-2">
                    <h2 className="fullname">
                        <b>{
                            fullname.slice(0, fullname.length > 2 ? fullname.length - 1 : 1).join(' ')
                        }</b>
                        &nbsp;
                        {fullname.length >= 2 ? fullname[fullname.length - 1] : null}
                    </h2>

                    <h3 className="title">
                        {data[lang].title}
                    </h3>

                    <div className="contacts">
                        <h3>- {text.contacts} -</h3>

                        <div>
                            <i className="fa fa-envelope"></i> 
                            &nbsp; 
                            <a href={`mailto:${data[lang].email}`}>
                                {data[lang].email}
                            </a>
                        </div>

                        <div>
                            <i className="fa fa-phone"></i> 
                            &nbsp; 
                            <span>{data[lang].phone}</span>
                        </div>

                        <div>
                            <i className="fa fa-map"></i> 
                            &nbsp; 
                            <span>{data[lang].address}</span>
                        </div>
                    </div>

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

                    <div className="element-level">
                        <h3>- {text.language} -</h3>

                        {
                            data[lang].langs.map((l) => {
                                return <div key={`${l.id}-cv`}>
                                    <span>{l.language_name}</span>
                                    <span>{l.language_level}</span>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="cv-body">
                <section>
                    <h1 className="section-title">
                        <button className="fa fa-user">
                        </button>
                        &nbsp;
                        {text.profile}
                    </h1>
                    <p className="profile">
                        {
                            data[lang].profile && data[lang].profile.length > 0 ? data[lang].profile.split('\n').map((txt, i) => {
                                return (
                                    <span key={`profile-description-${i}`}>
                                        <span>{txt}</span>
                                        {
                                            i < data[lang].profile.split('\n').length - 1 ?
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
                </section>

                <section>
                    <h1 className="section-title">
                        <button className="fa fa-suitcase">
                        </button>
                        &nbsp;
                        {text.work_experience}
                    </h1>
                    <div className="variable-content">
                        {
                            data[lang].work_experience.map((work, i) => {
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

                <section>
                    <h1 className="section-title">
                        <button className="fa fa-graduation-cap">
                        </button>
                        &nbsp;
                        {text.education}
                    </h1>
                    <div className="variable-content">
                        {
                            data[lang].education.map((education, i) => {
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
            </div>
        </div>
    )
}