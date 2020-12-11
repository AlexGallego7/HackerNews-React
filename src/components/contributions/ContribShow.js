import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import RenderTree from "../CommentsAndReplies/RenderTree";

class ContribShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            contribution: [],
            comment: ""
        }
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

        /*let urlcomments = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.id + "/CommentsAndReplies"

        fetch(urlcomments)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        CommentsAndReplies: result

                    })
                })
            .catch(error => {
                console.log(error)
            })*/

    }

    addComment() {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + this.state.id + "/CommentsAndReplies"
        console.log("-------------holaaa-------------")
        console.log(this.state.comment)
        //AQUIIIII PETA
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: {
                "content": "testing comment in react!!!!"
            }
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
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
                    <div className="leftmar">
                       <textarea className="bottomMar" name="textarea" rows="6" cols="60" value={this.props.comment}/>
                    </div>
                    <div style={{marginLeft: '15px'}} className="actions">
                        <input className="bottomMar" type="submit" value="add comment"
                               onClick={() => this.addComment()}/>
                    </div>
                </div>
                <div style={{marginLeft: '15px', marginBottom: '15px'}}>
                    <RenderTree idFather={this.state.id} type={"contribution"}/>
                </div>
            </div>
        );
    }
}

export default ContribShow;
