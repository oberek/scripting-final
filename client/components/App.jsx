/*
 ./client/components/App.jsx
 */
import React from 'react';
import './index.css';
function whatDog(imageUrl) {
    if (!(imageUrl.endsWith(".jpg") || imageUrl.endsWith(".png") || imageUrl.endsWith(".bmp"))) {
        return Promise.reject(new Error('A valid url is required.'));
    }

    return got.post('https://www.what-dog.net/Home/Analyze', {
        query: {
            isTest: 'False',
            version: '001',
            faceUrl: imageUrl,
            faceName: imageUrl
        }
    }).then(response => {
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
}
class Header extends React.Component {
    render(){
        return (
            <div style={{textAlign: 'center'}}>
                <h1>Hello World</h1>
            </div>);
    };
}
class Input extends React.Component {
    render(){
        return (
            <div>
                <fieldset>

                </fieldset>
                <input placeholder="Enter Link Here..."/>
            </div>
        )
    }
}
class Picture extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div>
            <img src="https://giphy.com/gifs/smile-pug-dog-oDLDbBgf0dkis"/>
        </div>
        )
    }
}
class PictureAndInput extends React.Component {
    render(){
        return(
            <div>
                <Picture/>
                <Input/>
            </div>
        )
    }
}
export default class App extends React.Component {
    render() {
        return (
        <div>
            <Header/>
            <div class="bodyContainer">
                <PictureAndInput/>
                <PictureAndInput/>
            </div>
        </div>
        )
    }
}