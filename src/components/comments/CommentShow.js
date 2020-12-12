import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import CommentForm from "./CommentForm";
import RenderTree from "../CommentsAndReplies/RenderTree";

// HAY UN BUG EN RENDERTREE CUANDO SE LLAMA AL IDFATHER SI HAY UNA CONTRIBUCION CON ID 1 Y UN COMMENT CON ID 1 SE DAN LOS COMENTARIOS DE LA CONTRIBUCION 1 PARA EL COMMENT TAMBIEN

class CommentShow extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            error: null,
            id: this.props.match.params.id,
            comment: [],
            replies: [],
        }
    }

    componentDidMount() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.id
        console.log(url);

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

        url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.id + "/replies"

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
        const comment = this.state.comment;
        return (
            <div className="content">
                <div style={{marginTop: '15px', marginBottom: '20px'}} className="leftmar">
                    <div className="inline">
                        <small>▲&nbsp;&nbsp;</small>
                        {comment.content}
                    </div>
                    <div className="leftmar">
                        <small>
                            {comment.points} points by
                            &nbsp;
                            <Link to={'users/' + comment.user_id}>
                                <User user_id={comment.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {comment.created_at}
                        </small>
                    </div>
                    <form>
                        <CommentForm data={this.state} type='comment'/>
                    </form>
                    <div style={{marginLeft: '15px', marginBottom: '15px'}}>
                        <RenderTree idFather={this.state.id} type={"comment"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentShow;
