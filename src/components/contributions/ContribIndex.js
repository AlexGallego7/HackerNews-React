import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";

class ContribIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: this.props.type,
            contributions: []
        }
    }

    componentDidMount() {

        let url = ""
        if (this.state.type === 'all')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/newest"
        else if (this.state.type === 'ask')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/ask"
        else if (this.state.type === 'url')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions"

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        contributions: result
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    like(id) {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + id + "/likes"

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        const contributions = this.state.contributions
        return (
            <div className="content">
                <ol className="inline gap">
                    {contributions.map( (contribution) =>
                        <li style={{marginBottom: '3px'}}>
                            <div className="url-link">
                                <small style={{marginRight: '6px'}}>
                                    <a href="#" onClick={this.like(contribution.id)}>▲</a>
                                </small>
                                { contribution.url?(
                                    <a href={contribution.url}>{contribution.title}
                                        <small style={{marginLeft: '3px'}}>  ({contribution.url})</small>
                                    </a>
                                ):(
                                    <Link to={'/contributions/'+ contribution.id }>{contribution.title} </Link>
                                )}
                            </div>
                            <div>
                                <small className="leftmar">
                                    {contribution.points} by
                                    <Link to={'users/'+contribution.user_id}>
                                        <User user_id={contribution.user_id}/>
                                    </Link>
                                    {contribution.created_at}
                                </small>
                            </div>
                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default ContribIndex;
