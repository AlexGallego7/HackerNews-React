import {Link} from "react-router-dom";

const ContributionView = (props) => (
    <div className="content">
        <ol className="inline gap">
            {props.contributions.map( (contribution) =>
                    <div>{contribution.title}
                        <small>
                            <Link to={contribution.url}> {' (' + contribution.url + ')'} </Link>
                        </small>
                    </div>
            )}
        </ol>
    </div>
);

export default ContributionView
