import React , {Component} from 'react'
import {HashRouter,Match} from 'react-router'
import firebase from 'firebase'
import 'normalize-css'

import styles from './app.css'
import Header from '../Header'
import Main from '../Main'
import Profile from '../Profile'
import Login from '../Login'

class App extends Component{
    constructor(){
        super()
        this.state ={
           user: null
            //{
                // photoURL:'http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg',
                // email: 'kev_1392@hotmail.com',
                // //onOpenText: false,
                // displayName: 'Kevin Zambrano ',
                // location: 'Lima, Peru'
           // }
        }

        this.handleOnAuth = this.handleOnAuth.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentWillMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                this.setState({ user })
                console.log(user)
            }
            else{
                this.setState({ user:null })
            }
        })
    }

    handleOnAuth(){
        const provider = new firebase.auth.GithubAuthProvider()

        firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.error(`Error: ${error.code}: ${error.message}`))
    }

    handleLogout(){
        firebase.auth().signOut()
        .then(() => console.log('Te haz desconectado correctamente'))
        .catch(()=> console.error('Un error Ocurrio'))
    }

    render(){
        return(
            <HashRouter>
                <div>
                    <Header />

                    <Match exactly pattern ='/' render={() => {
                        if(this.state.user){
                            return(
                                <Main 
                                    user={this.state.user}
                                    onLogout={this.handleLogout}
                                />
                            )
                        }
                        else { 
                            return(
                            <Login onAuth={this.handleOnAuth}  />
                            )
                        }                    

                    }}/>
                    <Match pattern='/profile' render = {() => {
                        return (    
                            <Profile
                                picture= {this.state.user.photoURL}
                                username= {this.state.user.email.split('@')[0]}
                                displayName= {this.state.user.displayName}
                                location = {this.state.user.location}
                                emailAddres= {this.state.user.email}
                            />
                        )
                    }} />
                    <Match pattern='/user/:username' render={({params}) => {
                        return(
                            <Profile 
                                displayName= {params.username}
                                username= {params.username}
                            />
                        )
                    }} />
                    
                </div>
            </HashRouter>
        )
    }
}
export default App