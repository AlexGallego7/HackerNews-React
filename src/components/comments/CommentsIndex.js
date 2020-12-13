import React from 'react'
import {Link} from "react-router-dom";
import User from "../users/User";

class CommentsIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.match.params.id,
            comments: [],
            upvotedComments: []
        }
        this.updateUpvotedComments = this.updateUpvotedComments.bind(this)
    }

    componentDidMount() {

        let url
        let type
        if (this.state.user_id === undefined) {
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/upvoted"
            type = 0
        }
        else {
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/users/" + this.state.user_id
            type = 1
        }
        console.log(url)

        if (type === 1) {
            fetch(url)
                .then(response => response.json())
                .then(
                    (result) => {
                        this.setState({
                            comments: result
                        })
                    })
                .catch(error => {
                    console.log(error)
                })
        } else {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
                },
                body: null
            };

            fetch(url,requestOptions)
                .then(response => response.json())
                .then(
                    (result) => {
                        console.log(result)
                        this.setState({
                            comments: result
                        })
                    })
                .catch(error => {
                    console.log(error)
                })
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        let urlVoted = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/upvoted/"
        fetch(urlVoted, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        upvotedComments: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    like(id, i) {
        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" + id + "/likes";
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.addUpVotedComment(data, i)

            }).catch(error => {
            console.log(error)
        })
    }

    dislike(id, i) {
        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" + id + "/likes"
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        fetch(url, requestOptions)
            .then(() => {
            })
            .then(() => {
                this.deleteUpVotedComment(i)
                if (this.props.location.pathname === "/upvoted/comments") this.updateUpvotedComments()
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateUpvotedComments() {
        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/upvoted"
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        fetch(url,requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        comments: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }


    deleteUpVotedComment(i) {
        let copyUpVoted = this.state.upvotedComments;
        let copyComment = this.state.comments;
        let index = -1;
        for (let k = 0; i <= copyComment.length; ++k) {
            if (copyUpVoted[k].id === copyComment[i].id) {
                index = k;
                break;
            }
        }
        console.log(index)
        if (index > -1) {
            copyUpVoted.splice(index, 1);
            copyComment[i].points -= 1;

        }
        this.setState({
            upvotedComments: copyUpVoted,
            comments: copyComment
        })
    }

    addUpVotedComment(data, i) {
        if (!data.hasOwnProperty("code")) {
            let copyUpVoted = this.state.upvotedComments.slice();
            copyUpVoted.push(data);
            let copyComment = this.state.comments;
            copyComment[i] = data;
            this.setState({
                upvotedComments: copyUpVoted,
                comments: copyComment
            })
        }
    }

    checkIfLiked(e) {
        let copyUpvoted = this.state.upvotedComments;
        for (let i = 0; i < copyUpvoted.length; ++i) {
            if (copyUpvoted[i].id === e.id) return true;
        }
        return false;
    }

    render() {
        let comments = this.state.comments.map((e, i) => {
            return (
                <li style={{marginBottom: '10px'}} key={i}>
                    <div className="url-link">
                        <small style={{marginRight: '6px'}}>
                            {this.checkIfLiked(e) ?
                                (<a href="#" onClick={() => this.dislike(e.id, i, 1)}>▼</a>) :
                                (<a href="#" onClick={() => this.like(e.id, i, 1)}>▲</a>)
                            }
                        </small>
                        <Link to={'/comments/' + e.id}>{e.content} </Link>
                    </div>
                    <div>
                        <small className="leftmar">
                            {e.points} by
                            <Link to={'/users/' + e.user_id}>
                                <User user_id={e.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {e.created_at.substr(0, 10) + ' ' + e.created_at.substr(11, 10) + ' | '}
                            <Link to={'/comments/' + e.id}>
                                replies
                            </Link>
                        </small>
                    </div>
                </li>
            )
        })
        return (
            <div className="content">
                <ol className="inline gap">
                    {
                        comments
                    }

                </ol>
            </div>
        );
    }
}

export default CommentsIndex
