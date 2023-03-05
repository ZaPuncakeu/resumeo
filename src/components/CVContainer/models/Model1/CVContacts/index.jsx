export default function CVContacts({
    email,
    phone,
    address,
    text
}) {
    return (
        email.length === 0 && phone.length === 0 && address.length === 0 ?
        null 
        :
        <div className="contacts">
            <h3>- {text.contacts} -</h3>

            <div>
                <i className="fa fa-envelope"></i> 
                &nbsp; 
                <a href={`mailto:${email}`}>
                    {email}
                </a>
            </div>

            <div>
                <i className="fa fa-phone"></i> 
                &nbsp; 
                <span>{phone}</span>
            </div>

            <div>
                <i className="fa fa-map"></i> 
                &nbsp; 
                <span>{address}</span>
            </div>
        </div>
    )
}