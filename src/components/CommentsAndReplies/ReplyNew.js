import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import RenderTree from "../comments/RenderTree";

class ReplyNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            url: "https://asw-hackernews-kaai12.herokuapp.com/api/" + this.props.location.pathname,
            comment: [],
            content: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        fetch(this.state.url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        comment: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            content: event.target.value
        })
    }

    handleSubmit(event)  {
        event.preventDefault()
        this.doPost()
    }

    doPost() {

        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" + this.state.comment.id + "/replies"
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: JSON.stringify(this.state.content)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }

    render(){
        const comment = this.state.comment
        return(
            <div className="content">
                <div style={{marginTop: '15px', marginBottom: '20px'}} className="leftmar">
                    <div className="inline">
                        <small>▲&nbsp;&nbsp;</small>
                        <a className="esl" href={comment.url}>{comment.content} </a>
                    </div>
                    <div className="leftmar">
                        <small>
                            {comment.points} points by
                            &nbsp;
                            <Link to={'/users/'+comment.user_id}>
                                <User user_id={comment.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {comment.created_at}
                        </small>
                    </div>
                    <form>
                        <div className="leftmar">
                        <textarea className="bottomMar" rows="6" cols="60" name="content" value={this.state.content}
                                  onChange={this.handleChange}/>
                        </div>
                        <div style={{marginLeft: '15px'}} className="actions">
                            <input className="bottomMar" type="submit" value="add reply"
                                   onClick={this.handleSubmit}/>
                        </div>
                    </form>
                </div>
                <div style={{marginLeft: '15px', marginBottom: '15px'}}>
                    <RenderTree idFather={this.state.id} type={"contribution"}/>
                </div>
            </div>

        )

    }
}

export default ReplyNew;
