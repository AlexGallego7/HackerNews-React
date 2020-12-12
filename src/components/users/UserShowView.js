import React from "react";
import {Link} from "react-router-dom";

const UserShowView = (props) => (
    <div className="content">
        <div style={{marginLeft: '10px', marginTop: '10px'}}>
            <p>
                <strong>Username:</strong>&nbsp;&nbsp;
                {props.user.username}
            </p>
            <p>
                <strong>Created:</strong>&emsp;&nbsp;&nbsp;
                {props.user.created_at}
            </p>
            <p>
                <strong>Karma:</strong>&emsp;&emsp;&nbsp;
                {props.user.karma}
            </p>
            <p style={{paddingBottom: '10px'}}>
                <strong>About:</strong>&emsp;&emsp;&nbsp;
                {props.user.about}
            </p>
            <p>
                <Link to={'/contributions/users/' + props.user.id} className="wow">contributions</Link>
            </p>
            <p>
                <Link to={'/comments/users/' + props.user.id} className="wow">comments</Link>
            </p>
        </div>

    </div>
);

export default UserShowView
