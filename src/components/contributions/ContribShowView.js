import React from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";


const ContribShowView = (props) => {
    return (
        <div className="content">
            <div className="url-link">
                <small style={{marginRight: '6px'}}>▲</small>
                { props.contribution.url?(
                    <a href={props.contribution.url}>{props.contribution.title}
                        <small style={{marginLeft: '3px'}}>  ({props.contribution.url})</small>
                    </a>
                ):(
                    <Link to={'/contribution/'+ props.contribution.id }>{props.contribution.title} </Link>
                )}
            </div>
            <div>
                <small className="leftmar">
                    {props.contribution.points} points by
                    <a>
                        <User user_id={props.contribution.user_id}/>
                    </a>
                    {props.contribution.created_at}
                </small>
            </div>
            <div>
                {props.contribution.text}
            </div>
        </div>

    );
};

export default ContribShowView;
