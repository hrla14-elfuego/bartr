import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events';
import jwtDecode from 'jwt-decode'
import { hashHistory } from 'react-router';
import { loginSuccess } from '../actions';

// import LogoImg from 'images/test-icon.png';
const emitter = new EventEmitter();

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0 lock
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:8080/',
        responseType: 'token',
        params: {scope: 'openid profile'}
      },
      theme: {
        logo: 'https://openclipart.org/download/240346/Low-Poly-Camel-Sunset.svg',
        primaryColor: "red"
      },
      languageDictionary: {
        title: 'Bartr'
      }
    })
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    this.lock.on('authenticated', AuthService.doAuthentication.bind(this));
  }

  static doAuthentication(authResult) {
    console.log('success: ', authResult);
    AuthService.setToken(authResult.idToken);
    hashHistory.push('/');
    this.lock.getProfile(authResult.idToken, (err, profile) => {
      if (err) {
        console.log('Error loading profile: ', err)
      } else {
        AuthService.setProfile(profile);
      }
      emitter.emit('login_sequence_complete', { profile, idToken: authResult.idToken })
    })
  }

  // ======================================================
  // Public methods
  // ======================================================
  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  logout(){
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

  // ======================================================
  // Static methods
  // ======================================================
  static getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken()
    return !!token && !AuthService.isTokenExpired(token)
  }

  static setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
  }

  static getProfile(){
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  }

  static getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  static getTokenExpirationDate() {
    const token = AuthService.getToken()
    const decoded = jwtDecode(token)
    if(!decoded.exp) {
      return null
    }

    const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
    date.setUTCSeconds(decoded.exp)
    return date
  }

  static isTokenExpired() {
    const token = AuthService.getToken()
    if (!token) return true
    const date = AuthService.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }
}

export const emitr = emitter;