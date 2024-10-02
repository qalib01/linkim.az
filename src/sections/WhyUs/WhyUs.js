import SectionLayout from "../Root/SectionLayout";
import classes from './WhyUs.module.scss';
import userFriendly from './userFriendly.svg';
import mediaPlayer from './mediaPlayer.svg';
import easyShare from './easyShare.svg';
import suitableEveryone from './suitableEveryone.svg';



function WhyUs() {
    return (
        <SectionLayout sectionName='whyus' sectionBg='bgTransparent'>
            <div className="row">
                <div className="col-12 pt-4" >
                    <div className='pe-md-0 pe-lg-5' style={{marginBottom: '100px'}}>
                        <h3 className={` ${classes.title} mt-3 text-center`}> Nə üçün linkim.az? </h3>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row gy-4 flex-wrap justify-content-between">
                        <div className="col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <img src={userFriendly} alt='Sadə və Effektiv' />
                                </div>
                                <div className={classes.content}>
                                    <h3>Sadə və Effektiv</h3>
                                    <p>Bütün sosial media və şəxsi hesablarını bir platformada toplamaq yalnız bir neçə dəqiqə lazımdır</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <img src={mediaPlayer} alt='Hamısı Bir Yerdə' />
                                </div>
                                <div className={classes.content}>
                                    <h3>Hamısı Bir Yerdə</h3>
                                    <p>Facebook, Instagram, X və digər platformalardakı hesablarını bir keçiddə topla və hər şeyi bir kliklə təqdim et</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <img src={easyShare} alt='Rahat Paylaşım' />
                                </div>
                                <div className={classes.content}>
                                    <h3>Rahat Paylaşım</h3>
                                    <p>Öz şəxsiyyətini və işlərini həm sosial mediada, həm də iş və şəxsi həyatında asanlıqla paylaş</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className={classes.item}>
                                <div className={classes.icon}>
                                    <img src={suitableEveryone} alt='Hərkəsə uyğun' />
                                </div>
                                <div className={classes.content}>
                                    <h3>Hərkəsə uyğun</h3>
                                    <p>İstər influencer ol, istərsə də kiçik bir biznes sahibi, "linkim.az" hər kəs üçün ideal bir həll olacaq</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    )
}

export default WhyUs;