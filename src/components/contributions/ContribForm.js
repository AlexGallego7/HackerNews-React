import React from 'react'

class ContribForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            url: "",
            text: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event)  {
        console.log(this.state)
        event.preventDefault()
        this.doPost()
    }

    doPost() {

        const url = "https://asw-hackernews-kaai12.herokuapp.com/api/contributions"
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
                    <div className="field" style={{marginBottom: '15px', marginTop: '15px'}}>
                        <label>
                            Title:
                            <input type="text" name="title" value={this.state.title} onChange={
                                this.handleChange} />
                        </label>
                    </div>
                    <div className="field" style={{marginBottom: '15px'}}>
                        <label>
                            URL:
                            <input type="text" name="url" value={this.state.url} onChange={
                                this.handleChange} />
                        </label>
                    </div>
                    <div className="field" style={{marginBottom: '15px'}}>
                        <label>
                            Text:
                            <input type="text" name="text" value={this.state.text} onChange={
                                this.handleChange} />
                        </label>
                    </div>
                    <div style={{marginLeft: '40px'}} className="actions">
                        <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default ContribForm
