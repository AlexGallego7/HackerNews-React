import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import RenderReplies from "./RenderReplies";

class ReplyShow extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            error: null,
            id: this.props.match.params.id,
            reply: [],
            replies: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        this.fetchReply()
        this.fetchReplies()
    }

    fetchReply() {
        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" +  this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        reply: result,
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    fetchReplies() {
        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" +  this.state.id + "/replies"

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

    doPost() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" + this.state.id
        console.log(url)

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
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

    render() {
        const reply = this.state.reply;
        return (
            <div className="content">
                <div style={{marginTop: '15px', marginBottom: '20px'}} className="leftmar">
                    <div className="inline">
                        <small>▲&nbsp;&nbsp;</small>
                        {reply.content}
                    </div>
                    <div className="leftmar">
                        <small>
                            {reply.points} points by
                            &nbsp;
                            <Link to={'/users/' + reply.user_id}>
                                {reply.user_id}
                            </Link>
                            &nbsp;
                            created at:
                            &nbsp;
                            {reply.created_at}
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
                        <RenderReplies idFather={this.state.id} type={"replies"} replies={this.state.replies}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReplyShow;
