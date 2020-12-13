import React  from 'react';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            id: this.props.user_id,
            username: []
        }
    }

    componentWillReceiveProps(props, nextContext) {
        this.setState({
            id: this.props.user_id
        })
    }

    componentDidMount() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/users/" +  this.state.id

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        username: result.username
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const username = this.state.username
        return (
            <span>
                &nbsp;{username}
            </span>
        );
    }
}

export default User;
