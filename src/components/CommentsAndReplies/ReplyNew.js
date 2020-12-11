import React  from 'react';

class ReplyNew extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            //AQUI FALLA, NECESSITO EL :id de la path, pero no s'obte per culpa de render => en AppRouter
            id: this.props.match.params.id,
            type: this.props.type,
            comment: [],
            content: ""
        }
    }

    componentDidMount() {

        let url = ""
        if (this.state.type === 'comment')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/comments/" +  this.state.id
        else if (this.state.type === 'reply')
            url = "https://asw-hackernews-kaai12.herokuapp.com/api/replies/" +  this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({
                        comment: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        //comentar a un comentari o una reply, utilitzar la mateixa plantilla, es a dir aquesta.
        return(
            <div>
                holaaa
            </div>

        )

    }
}

export default ReplyNew;
