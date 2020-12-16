import React  from 'react';
import {Link} from "react-router-dom";
import RenderReplies from "../replies/RenderReplies";
import TimeAgo from "timeago-react";

class CommentShow extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            error: null,
            id: this.props.match.params.id,
            comment: [],
            replies: [],
            content: "",
            upVotedComments : []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        this.fetchComment()
        this.fetchReplies()
        this.fetchUpvotedComments()
    }

    fetchComment() {

        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        comment: result,
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    fetchReplies() {
        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.id + "/replies"

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        replies: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event)  {
        event.preventDefault()
        this.doPost()
    }


    fetchUpvotedComments() {

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': localStorage.getItem('token')
            },
            body: null
        };

        let urlVoted = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/upvoted"
        fetch(urlVoted, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        upVotedComments: result

                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    doPost() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" + this.state.id + "/replies"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': localStorage.getItem('token')
            },
            body: JSON.stringify(this.state)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                let new_replies = this.state.replies.concat(data)
                this.setState({
                    replies: new_replies
                })
                console.log(data)
            })
    }

    like(id) {
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
                //this.addUpVotedContribution(data, i)
                this.componentDidMount()

            }).catch(error => {
            console.log(error)
        })

    }


    dislike(id) {
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
            .then(() => {
                this.componentDidMount()
            })
            .catch(error => {
                console.log(error)
            })
        this.componentDidMount()
    }


    checkIfLiked(e) {
        let copyUpvoted = this.state.upVotedComments;
        for (let i = 0; i < copyUpvoted.length; ++i) {
            if (copyUpvoted[i].id === e.id) return true;
        }
        return false;
    }



    render() {
        const comment = this.state.comment;
        return (
            <div className="content">
                <div style={{marginTop: '15px', marginBottom: '20px'}} className="leftmar">
                    <div className="inline">
                        <small>
                            {this.checkIfLiked(comment) ?
                            (<a href="#" onClick={() => this.dislike(comment.id,  1)}>▼</a>) :
                            (<a href="#" onClick={() => this.like(comment.id,  1)}>▲</a>)
                        }</small>
                        {comment.content}
                    </div>
                    <div className="leftmar">
                        <small>
                            {comment.points} points by
                            &nbsp;
                            <Link to={'/users/' + comment.user_id}>
                                {comment.user_id}
                            </Link>
                            &nbsp;
                            created&nbsp;
                            <TimeAgo datetime={comment.created_at} locale='en_US'/>
                        </small>
                    </div>
                    <div className="content">
                        <form>
                            <div className="leftmar">
                        <textarea className="bottomMar" rows="6" cols="60" name="content" value={this.state.content}
                                  onChange={this.handleChange}/>
                            </div>
                            <div style={{marginLeft: '15px'}} className="actions">
                                <input className="bottomMar" type="submit" value="add comment"
                                       onClick={this.handleSubmit}/>
                            </div>
                        </form>
                    </div>
                    <div style={{marginLeft: '15px', marginBottom: '15px'}}>
                        <RenderReplies idFather={this.state.id} type={"comment"} replies={this.state.replies}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentShow;
