import SectionLayout from "../Root/SectionLayout";
import classes from './Team.module.scss';
import team1 from './team-1.jpg';
import team2 from './team-2.jpg';
import team3 from './team-3.jpg';
import team4 from './team-4.jpg';


const TEAM_DATA = [
    {
        id: 1,
        name: 'Jimmy Jones',
        profession: 'CEO',
        image: team1,
    },
    {
        id: 2,
        name: 'Piwy Powell',
        profession: 'CTO',
        image: team2,
    },
    {
        id: 3,
        name: 'Siko Simpson',
        profession: 'COO',
        image: team3,
    },
    {
        id: 4,
        name: 'Gina Griffin',
        profession: 'Creative Director',
        image: team4,
    }
]

function Team() {
    return (
        <SectionLayout sectionName='team'  sectionBg='bgTransparent'>
            <div className="row">
                <div className="col">
                    <div className="section-head text-center mx-auto narrow">
                        <h5 className={classes.title}> Komandamız </h5>
                    </div>
                </div>
            </div>
            <div className="row flex-row-scroll">
                {
                    TEAM_DATA.map((data) => (
                        <div key={data.id} className="col-6 col-md-6 col-lg-3">
                            <div className={`${classes.teamMember} mt-3 mt-md-5`}>
                                <div className="card border-0 shadow-sm">
                                    <img src={data.image} className="card-img-top rounded" alt={data.name} />
                                    <div className="card-body py-4 text-center">
                                        <p className={`${classes.cardTitle} fs-6 fw-bold text-uppercase`}>{data.name}</p>
                                        <p className="card-subtitle mb-0 text-muted small">{data.profession}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </SectionLayout>
    )
}

export default Team;