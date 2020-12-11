import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";

class RenderTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: this.props.type,
            idFather: this.props.idFather,
            comments: []
        }
    }

    componentDidMount() {
        let url = ""
        if (this.state.type === 'contribution')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.idFather + "/comments"
        else if (this.state.type === 'replies')
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
                            <Link to={'/comments/'+ e.id}>
                                Reply
                            </Link>
                        </small>
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
