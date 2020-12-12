import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";
import RenderTree from "../comments/RenderTree";
import CommentForm from "../comments/CommentForm";

// HAY UN BUG EN RENDERTREE CUANDO SE LLAMA AL IDFATHER SI HAY UNA CONTRIBUCION CON ID 1 Y UN COMMENT CON ID 1 SE DAN LOS COMENTARIOS DE LA CONTRIBUCION 1 PARA EL COMMENT TAMBIEN

class ContribShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            contribution: [],
            comments: [],
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
                        contribution: result,
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
                            <Link to={'users/' + contribution.user_id}>
                                <User user_id={contribution.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {contribution.created_at}
                        </small>
                        <p style={{marginTop: '7px'}}>{contribution.text}</p>
                    </div>
                    <form>
                        <CommentForm data={this.state} type='contribution'/>
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
