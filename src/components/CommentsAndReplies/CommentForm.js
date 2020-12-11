import React from 'react'

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            content: "",
            c_id: this.props.id
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            content: event.target.value
        })
    }

    handleSubmit(event)  {
        event.preventDefault()
        this.doPost()
    }

    doPost() {

        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions/" + this.state.c_id + "/comments"
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': '-ExnIm9fIjM-Za8sfP7RYg'
            },
            body: JSON.stringify(this.state)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div className="content">
                <form>
                    <div className="leftmar">
                        <textarea className="bottomMar" rows="6" cols="60" name="content" value={this.state.content}
                            onChange={this.handleChange}/>
                    </div>
                    <div style={{marginLeft: '15px'}} className="actions">
                        <input className="bottomMar" type="submit" value="add comment"
                               onClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CommentForm
