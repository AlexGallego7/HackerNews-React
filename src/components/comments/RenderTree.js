import React  from 'react';
import {Link} from "react-router-dom";
import RenderReplies from "../replies/RenderReplies";
import User from "../users/User";
import TimeAgo from "timeago-react";

class RenderTree extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            type: this.props.type,
            idFather: this.props.idFather,
            upVotedComments: [],
            comments: [],
            hasMoreReplies: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps)
        if (JSON.stringify(nextProps.comments) !== JSON.stringify(prevState.comments)){
            if(nextProps.comments)
                return({
                    comments: nextProps.comments
                })
            else
                return []
        }
        return null;
    }

/*
    componentWillReceiveProps(props) {
        console.log(props)
        this.setState({
            ...this.state,
            comments: props.comments
        })
    }
*/

    componentDidMount() {
        let url = ""
        if (this.state.type === 'contribution')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.idFather + "/comments"
        else if (this.state.type === 'comment')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.idFather + "/replies"

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
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
                'X-API-KEY': localStorage.getItem('token')
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
                'X-API-KEY': localStorage.getItem('token')
            },
            body: null
        };

        fetch(url, requestOptions)
            .then(() => {
            })
            .then(() => this.deleteUpVotedComment(i))
            .catch(error => {
                console.log(error)
            })
    }

    deleteUpVotedComment(i) {
        let copyUpVoted = this.state.upVotedComments;
        let copyComments = this.state.comments;
        let index = -1;
        for (let k = 0; i <= copyComments.length; ++k) {
            if (copyUpVoted[k].id === copyComments[i].id) {
                index = k;
                break;
            }
        }
        if (index > -1) {
            copyUpVoted.splice(index, 1);
            copyComments[i].points -= 1;

        }
        this.setState({
            upVotedComments: copyUpVoted,
            comments: copyComments
        })
    }

    addUpVotedComment(data, i) {
        if (!data.hasOwnProperty("code")) {
            let copyUpVoted = this.state.upVotedComments.slice();
            copyUpVoted.push(data);
            let copyComments = this.state.comments;
            copyComments[i] = data;
            this.setState({
                upVotedComments: copyUpVoted,
                comments: copyComments
            })
        }
    }

    checkIfLiked(e) {
        let copyUpvoted = this.state.upVotedComments;
        for (let i = 0; i < copyUpvoted.length; ++i) {
            if (copyUpvoted[i].id === e.id) return true;
        }
        return false;
    }



    render() {
        //en comptes de fer link en botto "Reply", aver si amb redirect a la path funcionaria.
        let renderComments = this.state.comments.map((e,i) => {
            return (
                <div style={{marginBottom: '10px'}}>
                    <small>
                        <small style={{marginRight: '6px'}}>
                            {this.checkIfLiked(e) ?
                                (<a href="#" onClick={() => this.dislike(e.id, i, 1)}>▼</a>) :
                                (<a href="#" onClick={() => this.like(e.id, i, 1)}>▲</a>)
                            }

                        </small>
                        {e.points} points by
                        <Link to={'/users/' + e.user_id}>
                            <User user_id={e.user_id}/>
                        </Link>
                        created&nbsp;
                        <TimeAgo datetime={e.created_at} locale='en_US'/>
                    </small>
                    <div className="pad-comment">
                        {e.content} <br />
                        <small>
                            <Link to={(this.state.type === 'contribution' ? '/comments/' : '/replies/') + e.id}>
                                Reply
                            </Link>
                        </small>
                        <div>
                            <RenderReplies idFather={e.id} type="comment" replies={this.state.replies}/>
                        </div>
                    </div>
                </div>

            )
        })
        return (
            renderComments
        )
    }
}

export default RenderTree;
