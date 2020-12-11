import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import RenderTree from "../CommentsAndReplies/RenderTree";

// HAY UN BUG EN RENDERTREE CUANDO SE LLAMA AL IDFATHER SI HAY UNA CONTRIBUCION CON ID 1 Y UN COMMENT CON ID 1 SE DAN LOS COMENTARIOS DE LA CONTRIBUCION 1 PARA EL COMMENT TAMBIEN

class ContribShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            contribution: [],
            comments: [],
            content: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.id
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        contribution: result
                    })
                })
            .catch(error => {
                console.log(error)
            })

        url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.id + "/comments"

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

        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + this.state.id + "/comments"
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
                console.log(data)
                this.setState({
                    comments: this.state.comments.concat(data)
                })
                console.log(this.state.comments)
            })
    }

    render() {
        const contribution = this.state.contribution;
        return (
            <div className="content">
                <div style={{marginTop: '15px', marginBottom: '20px'}} className="leftmar">
                    <div className="inline">
                        <small>▲&nbsp;&nbsp;</small>
                        <a className="esl" href={contribution.url}>{contribution.title} </a>
                            { contribution.url?(
                                    <small style={{marginLeft: '3px'}}>
                                        <a href={contribution.url}>
                                            ({contribution.url})
                                        </a>
                                    </small>
                            ): <React.Fragment/>}
                    </div>
                    <div className="leftmar">
                        <small>
                            {contribution.points} points by
                            &nbsp;
                            <Link to={'/users/'+contribution.user_id}>
                                user_<User user_id={contribution.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {contribution.created_at}
                        </small>
                        <p style={{marginTop: '7px'}}>{contribution.text}</p>
                    </div>
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
                    <RenderTree idFather={this.state.id} type={"contribution"}/>
                </div>
            </div>
        );
    }
}

export default ContribShow;
