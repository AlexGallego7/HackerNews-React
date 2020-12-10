import React from "react";

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
        </div>
    </div>
);

export default UserShowView
