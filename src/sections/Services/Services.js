import SectionLayout from '../Root/SectionLayout';
import classes from './Services.module.scss';
import codeSvgFile from './code.svg'


const SERVICE_DATA = [
    {
        id: 1,
        name: '',
        description: 'Duis vulputate neque sed justo varius, vel lobortis sed lacus.',
        image: codeSvgFile,
    },
    {
        id: 2,
        name: '',
        description: 'Duis vulputate neque sed justo varius, vel lobortis sed lacus.',
        image: codeSvgFile,
    },
    {
        id: 3,
        name: '',
        description: 'Duis vulputate neque sed justo varius, vel lobortis sed lacus.',
        image: codeSvgFile,
    },
    {
        id: 4,
        name: '',
        description: 'Duis vulputate neque sed justo varius, vel lobortis sed lacus.',
        image: codeSvgFile,
    }
]

function ServicesSection() {
    return (
        <SectionLayout sectionName='services'>
            <div className="row flex-column" style={{ margin: '100px 0px' }}>
                <div className="col">
                    <div className="text-center mb-5">
                        <h4 className={classes.title}> Servislərimiz </h4>
                    </div>
                </div>

                <div className="row mt-4 flex-row-scroll">
                    {
                        SERVICE_DATA.map((data) => (
                            <div key={data.id} className={`col-1 col-sm-8 col-md-6 ${SERVICE_DATA.length >= 4 ? 'col-lg-3' : 'col-lg-4'} mb-4`}>
                                <div className={classes.serviceBox}>
                                    <div className={classes.serviceBoxImage}>
                                        <img src={data.image} />
                                    </div>
                                    <div className={classes.serviceBoxText}>
                                        <p> {data.description} </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </SectionLayout>
    )
}

export default ServicesSection;