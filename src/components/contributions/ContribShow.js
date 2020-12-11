import React  from 'react';
import ContribShowView from "./ContribShowView";

class ContribShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            contribution: [],
            comments: []
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

        let urlcomments = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.state.id + "/comments"

        fetch(urlcomments)
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
        const contribution = this.state.contribution
        return (
            <div>
                <ContribShowView contribution={contribution} />
            </div>
        );
    }
}

export default ContribShow;
