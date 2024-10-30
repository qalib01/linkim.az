import { Link } from "react-router-dom";
import Section from "../components/Section/Section";
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return (
        <Section>
            <div className="row">
                <div className="col">
                    <div className="section-head text-center mx-auto narrow">
                        <h5 className='title'> Xəta </h5>
                        <p> Görünüşə görə ya səhv, ya da sistemimizdə mövcud olmayan səhifəyə daxil olmağa cəhd edirsən </p>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <button onClick={goBack}> Əvvələ qayıt </button>
                            </div>
                            <div className="col-12 col-md-6">
                                <Link to='/'> Ana səhifə </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default Error;