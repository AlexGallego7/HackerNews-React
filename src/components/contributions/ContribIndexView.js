import React from "react";
import {Link} from "react-router-dom";
import User from "../users/User";

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
                            <Link to={'/contributions/'+ contribution.id }>{contribution.title} </Link>
                        )}
                    </div>
                    <div>
                        <small className="leftmar">
                            {contribution.points} points by
                            <Link to={'users/'+contribution.user_id}>
                                <User user_id={contribution.user_id}/>
                            </Link>
                            {contribution.created_at}
                        </small>
                    </div>
                </li>

            )}
        </ol>
    </div>
);

export default ContribIndexView
