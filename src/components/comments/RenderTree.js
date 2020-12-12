import React  from 'react';
import {Link} from "react-router-dom";
import RenderReplies from "../replies/RenderReplies";

class RenderTree extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            type: this.props.type,
            idFather: this.props.idFather,
            comments: [],
            hasMoreReplies: false
        }
    }

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
                    this.setState({
                        comments: result

                    })
                })
            .catch(error => {
                console.log(error)
            })

        this.checkIfMoreReplies()
    }

    checkIfMoreReplies() {
        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.idFather + "/replies"
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        hasMoreReplies: result.length !== 0
                    })
                }
            )
        console.log("REPLY WITH ID: " + this.state.idFather + " REPLIES: " + this.state.hasMoreReplies)
    }

    render() {
        //en comptes de fer link en botto "Reply", aver si amb redirect a la path funcionaria.
        let renderComments = this.state.comments.map((e,i) => {
            return (
                <div style={{marginBottom: '10px'}}>
                    <small>
                        ▲&nbsp; {e.points} points by {e.user_id} created at: {e.created_at}
                    </small>
                    <div className="pad-comment">
                        {e.content} <br />
                        <small>
                            <Link to={(this.state.type === 'contribution' ? '/comments/' : '/replies/') + e.id}>
                                Reply
                            </Link>
                        </small>
                        <div>
                            {this.state.hasMoreReplies ? <RenderReplies idFather={e.id} type="comment"/> : null }
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
