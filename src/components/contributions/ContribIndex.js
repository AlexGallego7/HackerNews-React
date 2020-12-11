import React  from 'react';
import {Link} from "react-router-dom";
import User from "../users/User";

class ContribIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: this.props.type,
            contributions: [],
            upVotedContributions: []
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

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        let urlVoted = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/upvoted/"
        fetch(urlVoted,requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        upVotedContributions: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

     like(id,i) {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + id + "/likes";
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
             .then(data => {
                 this.addUpVotedContribution(data, i)

             }).catch(error => {
              console.log(error)
         })

         console.log("isaac putilla");
    }

    dislike(id,i) {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + id + "/likes"
        let copyContributions = this.state.contributions;
        //let meth = vote === 1? 'POST'   : 'DELETE';
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: null
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => data != null?
                this.deleteUpVotedContribution(data,i): null
            )
        console.log("isaac putilla");
    }



    render() {
        let contributions = this.state.contributions.map((e,i) => {
            return (
                <li key={i}>
                    <div className="url-link">
                        <small style={{marginRight: '6px'}}>


                                <a href="#" onClick={() => this.like(e.id, i,1)}>▲</a>


                        </small>
                        { e.url?(
                            <a href={e.url}>{e.title}
                                <small style={{marginLeft: '3px'}}>  ({e.url})</small>
                            </a>
                        ):(
                            <Link to={'/contributions/'+ e.id }>{e.title} </Link>
                        )}
                    </div>
                    <div>
                        <small className="leftmar">
                            {e.points} by
                            <Link to={'users/'+e.user_id}>
                                <User user_id={e.user_id}/>
                            </Link>
                            &nbsp;
                            created_at:
                            &nbsp;
                            {e.created_at}
                            <Link to={'contributions/'+ e.id}>
                                comments
                            </Link>
                        </small>
                    </div>
                </li>
            )
        })
        return (
            <div className="content">
                <ol className="inline gap">
                    {
                        contributions
                    }

                </ol>
            </div>
        );
    }



    deleteUpVotedContribution(data, i) {
        let copyUpVoted = this.state.upVotedContributions.slice();
        let copyContrib = this.state.contributions;
        copyContrib[i] = data;
        const index = copyUpVoted.indexOf(data);
        if ( index > -1 ) {
            copyUpVoted.splice(index,1);
        }
        this.setState({
            upVotedContributions:copyUpVoted,
            contributions:copyContrib
        })
    }

    addUpVotedContribution( data , i) {
        console.log(data);
        if ( ! data.hasOwnProperty("code")) {
            let copyUpVoted = this.state.upVotedContributions.slice();
            copyUpVoted.push(data);
            let copyContrib = this.state.contributions;
            copyContrib[i] = data;
            this.setState({
                upVotedContributions: copyUpVoted,
                contributions: copyContrib
            })
        }
    }
}

export default ContribIndex;
