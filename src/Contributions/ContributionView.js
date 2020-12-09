import React from "react";

const ContributionView = (props) => (
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
                            <a href={"http://localhost:3000/newest"}>{contribution.title}</a>
                        )}
                    </div>
                    <div>
                        <small className="leftmar">
                            {contribution.points} points by {contribution.user_id}
                        </small>
                    </div>
                </li>
            )}
        </ol>
    </div>
);

export default ContributionView
