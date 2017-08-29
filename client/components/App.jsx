/*
 ./client/components/App.jsx
 */
import React from 'react';
// import '../index.css'
// const whatDog = require('what-dog');
//
// whatDog('http://imgur.com/B7a15F5.jpg')
// .then(doggyData => {
//     console.log(doggyData);
// });


class Header extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello World</h1>
            </div>);
    };
}
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {url: ""}
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        placeholder="Enter link here..."
                    />
                    <input type="submit"/>
                </form>
            </div>
        )
    }

    handleChange(e) {
        this.setState({url: e.target.value});
        console.log("CHANGED")
    }

    handleSubmit(e) {
        e.preventDefault();
        // whatDog(this.state.url);
    }
}
class Picture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

class PictureAndInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Picture/>
                <Input/>
            </div>
        )
    }
}
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="bodyContainer">
                    <PictureAndInput/>
                </div>
            </div>
        )
    }
}