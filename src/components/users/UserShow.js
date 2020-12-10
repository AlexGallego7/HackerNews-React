import React  from 'react';
import UserShowView from "./UserShowView";

class UserShow extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            error: null,
            id: this.props.match.params.id,
            user: []
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
                        user: result
                    })
                })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const user = this.state.user
        return (

            <div>
                <UserShowView user={user}/>
            </div>
        );

    }
}

export default UserShow;
