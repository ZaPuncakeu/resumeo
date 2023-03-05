import { useEffect, useState } from "react";
import CVContacts from "./CVContacts";
import CVEducation from "./CVEducation";
import CVLanguages from "./CVLanguages";
import CVProfile from "./CVProfile";
import CVSkills from "./CVSkills";
import CVWorkExperience from "./CVWorkExperience";
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
                            backgroundImage: `url(${data[lang].picture.src.length === 0 ? "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" : data[lang].picture.src})`,
                            backgroundPositionX: `${data[lang].picture.image_position_x}px`,
                            backgroundPositionY: `${data[lang].picture.image_position_y}px`,
                            backgroundRepeat: 'no-repeat'
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
                    
                    <CVContacts 
                        email={data[lang].email} 
                        phone={data[lang].phone} 
                        address={data[lang].address} 
                        text={text}
                    />

                    <CVSkills skills={data[lang].skills} text={text}/>

                    <CVLanguages languages={data[lang].langs} text={text}/>
                </div>
            </div>

            <div className="cv-body">
                
                <CVProfile profile={data[lang].profile} text={text} />

                <CVWorkExperience work_experience={data[lang].work_experience} text={text} />

                <CVEducation educations={data[lang].education} text={text} />
            </div>
        </div>
    )
}