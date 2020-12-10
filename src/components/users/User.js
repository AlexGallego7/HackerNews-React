import React  from 'react';

class User extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            id: this.props.user_id,
            username: []
        }
    }

    componentDidMount() {

        let url = "https://asw-hackernews-kaai12.herokuapp.com/api/users/" +  this.state.id
        console.log(url);

        fetch(url)
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result)
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
