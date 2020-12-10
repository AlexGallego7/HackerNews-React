import React from 'react'

class Like extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_contribution: this.props.id,
            points: 0
        }
    }

    like() {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + this.state.id_contribution + "/likes"

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

    dislike() {
        const url="https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + this.state.id_contribution + "/likes"

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
            .then(data => {
                console.log(data)
                this.setState({
                    points: data.points
                })
            })
    }

    render() {
        const points = this.state.points
        return(
            <span>
                <a href="#" onClickCapture={this.like()}>▲</a>
            </span>
        )
    }
}


export default Like
