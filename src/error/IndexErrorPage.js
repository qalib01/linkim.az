import Section from "../components/Section/Section";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button/Button";
import MetaIndex from "../helmet/IndexPageHelmet";

function Error() {
    const navigate = useNavigate();

    function goBack() {
        navigate(-1)
    }

    return (
        <>
            <MetaIndex />
            <Section>
                <div className="row">
                    <div className="col">
                        <div className="section-head text-center mx-auto narrow">
                            <h5 className='title'> Xəta </h5>
                            <p> Görünüşə görə ya səhv, ya da sistemimizdə mövcud olmayan səhifəyə daxil olmağa cəhd edirsən! </p>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <Button asButton={true} onClick={goBack}> Əvvələ qayıt </Button>
                                </div>
                                <div className="col-12 col-md-6">
                                    <Button to='/'> Ana səhifə </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default Error;