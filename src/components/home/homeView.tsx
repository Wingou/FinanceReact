import React, { Component } from 'react'
import { handleToPage } from '../../actions/switchView'

export class HomeView extends Component {
    render() {
        return <div>ADD WIEW
            <div>
                <button onClick={() => handleToPage('HOME')} >{'HOME'}</button>
   
                <button onClick={() => handleToPage('BOARD')} >{'BOARD'}</button>
            </div>
        </div>
    }
}