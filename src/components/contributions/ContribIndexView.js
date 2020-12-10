import React from "react";
import {Link} from "react-router-dom";

const ContribIndexView = (props) => (
    <div className="content">
        <ol className="inline gap">
            {props.contributions.map( (contribution) =>
                <li style={{marginBottom: '3px'}}>
                    <div className="url-link">
                        <small style={{marginRight: '6px'}}>▲</small>
                        { contribution.url?(
                            <a href={contribution.url}>{contribution.title}
                                <small style={{marginLeft: '3px'}}>  ({contribution.url})</small>
                            </a>
                        ):(
                            <Link to={'/contribution/'+ contribution.id }>{contribution.title} </Link>
                        )}
                    </div>
                    <div>
                        <small className="leftmar">
                            {contribution.points} points by {contribution.user_id} {contribution.created_at}
                        </small>
                    </div>
                </li>
            )}
        </ol>
    </div>
);

export default ContribIndexView
