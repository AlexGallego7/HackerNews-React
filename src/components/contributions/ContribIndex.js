import React  from 'react';
import ContribIndexView from "./ContribIndexView";

class ContribIndex extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            type: this.props.type,
            contributions: []
        }
        console.log("infinite loop")
    }

    componentDidMount() {

        let url = ""
        if (this.state.type === 'all')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/newest"
        else if (this.state.type === 'ask')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/ask"
        else if (this.state.type === 'url')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions"

        console.log(url)

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

    render() {
        const contributions = this.state.contributions
        return (
            <div>
                <ContribIndexView contributions={contributions} />
            </div>
        );
    }
}

export default ContribIndex;
