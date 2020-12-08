import React  from 'react';
import ContributionView from "./ContributionView";
import Header from "../Header";

class Contribution extends React.Component {

    /*
        Utilizaremos un constructor aqui que tenga un parametro
        para definir el tipo de contribuciones que queremos (ask, all, url).
        Haremos un set del state con el tipo y haremos un if en el
        componentDidMount para la url y el fetch
    */

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: this.props.type,
            contributions: []
        }
        console.log("debug")
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
                    this.setState({
                        contributions: result
                    });
                    console.log(this.state.contributions)
                }, (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        const contributions = this.state.contributions
        return (
            <div>
                <ContributionView contributions={contributions} />
            </div>
        );
    }
}

export default Contribution;
