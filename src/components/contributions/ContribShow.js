import React  from 'react';
import ContribShowView from "./ContribShowView";

class ContribShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.match.params.id,
            contribution: null
        }
        console.log(this.props.match.params.id);
    }

    componentWillMount() {

        // CON componenDidMount AQUIIII  NO LLEGA!!!!!!
        // CON componenWillMount LLEGA, PERO HACE RENDER ANTES DE !!!!!!

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" +  this.props.match.params.id;
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log("HAGO LLAMADA A LA API DESPUES DEL RENDER")
                    console.log(result)
                    this.setState({
                        contribution: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log("haciendo el render sano")
        const contribution = this.state.contribution
        console.log(contribution);
        return (
            <div>
                <ContribShowView contribution={contribution} />
            </div>
        );
    }
}

export default ContribShow;
