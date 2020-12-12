import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import CommentForm from "../comments/CommentForm";
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
    }

    componentDidMount() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" +  this.state.id
        console.log(url);

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

        url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" +  this.state.id + "/replies"

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
                            <Link to={'users/' + reply.user_id}>
                                <User user_id={reply.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {reply.created_at}
                        </small>
                    </div>
                    <form>
                        <CommentForm data={this.state} type='reply'/>
                    </form>
                    <div style={{marginLeft: '15px', marginBottom: '15px'}}>
                        <RenderReplies idFather={this.state.id} type={"replies"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReplyShow;
