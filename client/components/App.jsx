/*
 ./client/components/App.jsx
 */
import React from 'react';
const http = require('http');

let whatDog = function whatDog(imageUrl) {
    if (!(imageUrl.endsWith(".jpg") || imageUrl.endsWith(".png") || imageUrl.endsWith(".bmp"))) {
        return Promise.reject(new Error('A valid url is required.'));
    }
    console.log("URL: " + imageUrl);
    // DEBUG DOG PICTURE URL
    // https://images.pexels.com/photos/7720/night-animal-dog-pet.jpg
    const postData = querystring.stringify({
        isTest: 'False',
        version: '001',
        faceUrl: imageUrl,
        faceName: imageUrl
    });

    const options = {
        hostname: 'https://www.what-dog.net/Home/Analyze',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
        }
    };
    http.request(options, (res) => {
        console.log("WOW!");
        console.log(`STATUS: $(res.statusCode)`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });
    return fetch('https://www.what-dog.net/Home/Analyze', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        query: { isTest: 'False', version: '001', faceUrl: imageUrl, faceName: imageUrl}
    })
    // return got.post('https://www.what-dog.net/Home/Analyze', {
    //     query: {
    //         isTest: 'False',
    //         version: '001',
    //         faceUrl: imageUrl,
    //         faceName: imageUrl
    //     }
    // })
        .then(response => {
            console.log(response);
        try {
            // Silly Microsoft double-JSON encoded their output?!
            const whatDog = JSON.parse(JSON.parse(response.body));
            return {
                isDog: whatDog.IsDog,
                breed: whatDog.BreedName,
                about: whatDog.Keywords
            };
        } catch (err) {
            return {
                isDog: false,
                breed: 'Not a dog',
                about: '',
                err: err
            };
        }
    }).catch(err => {
        return {
            isDog: false,
            breed: 'Not a dog',
            about: '',
            err: err
        };
    });
};

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
        whatDog(this.state.url);
    }
}
class Picture extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <img src="https://giphy.com/gifs/smile-pug-dog-oDLDbBgf0dkis"/>
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
                    <PictureAndInput/>
                </div>
            </div>
        )
    }
}