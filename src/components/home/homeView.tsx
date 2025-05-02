import React, { Component } from 'react'
import { handleToPage } from '../../actions/switchView'

export class HomeView extends Component {
    render() {
        return <div>Welcome to the Finance React App !<br />
            Build with React, TypeScript, GraphQL and Apollo Client.
            <br />
            Node.JS and Express for the backend.
        </div>
    }
}