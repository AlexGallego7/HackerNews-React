import React  from 'react';
import ContributionView from "./ContributionView";

class Contribution extends React.Component {

    state = {
        error: null,
        contributions: []
    }

    componentDidMount() {
        fetch("https://asw-hackernews-kaai12.herokuapp.com/api/contributions")
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
