export default function CVProfile({
    profile,
    text
})
{
    return(
        profile.length === 0 ? 
        null 
        :
        <section>
            <h1 className="section-title">
                <button className="fa fa-user">
                </button>
                &nbsp;
                {text.profile}
            </h1>
            <p className="profile">
                {
                    profile && profile.length > 0 ? profile.split('\n').map((txt, i) => {
                        return (
                            <span key={`profile-description-${i}`}>
                                <span>{txt}</span>
                                {
                                    i < profile.split('\n').length - 1 ?
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
    )
}