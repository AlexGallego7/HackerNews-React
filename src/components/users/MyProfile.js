import React  from 'react';
import {Link} from "react-router-dom";

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: [],
            user: [],
            url: "https://asw-hackernews-kaai12.herokuapp.com/api/myprofile",
            about: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            }
        };

        console.log("dkjashdkjashdkaljsh")

        fetch(this.state.url,requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            });
    }

    handleSubmit(e) {
        let k = {
            About: this.state.about
        }
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: JSON.stringify(k)
        };

        console.log(JSON.stringify(k))

        fetch(this.state.url,requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            });
    }

    handleChange(e) {
        this.setState({
            about: e.target.value
        })
    }

    render() {
        const user = this.state.user
        return (
            <div className="content">
                <div>
                    <p><strong>Username:</strong>&nbsp;&nbsp;{user.username}</p>
                    <p><strong>My api key:</strong>&nbsp;{user.apiKey}</p>
                    <p><strong>Created:</strong>&emsp;&nbsp;&nbsp;&nbsp;{user.created_at}</p>
                    <p><strong>Karma:</strong>&emsp;&emsp;&nbsp;&nbsp;{user.karma}</p>
                    <p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;</p>
                    <p><strong>About:</strong>&emsp;&emsp;&emsp;<textarea className="bottomMar" rows="6" cols="60" name="about" defaultValue={user.about} onChange={this.handleChange}/></p>

                    <p>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <Link class="wow" to={'/contributions/users/' + user.id}>submissions</Link>
                    </p>

                    <p>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <Link class="wow" to={'/comments/users/' + user.id}>comments</Link>
                    </p>

                    <p>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <Link class="wow" to={'/contributions/upvoted'}>upvoted submissions</Link>
                    </p>

                    <p>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;
                        <Link class="wow" to={'/upvoted/comments/'}>upvoted comments</Link>
                    </p>

                    <br/>
                    <div  className="actions">
                        <input className="bottomMar" type="submit" value="add comment" onClick={this.handleSubmit}/>
                    </div>

                </div>
            </div>
        );

    }
}

export default MyProfile;