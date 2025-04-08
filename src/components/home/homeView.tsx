import React, { Component } from 'react'
import {handleToView} from '../../actions/switchView'

export class HomeView extends Component {
    render () {
            return   <div>ADD WIEW
                            <div>
                                <button onClick={()=>handleToView('HOME')} >{'HOME'}</button>
                                <button onClick={()=>handleToView('ADD')} >{'ADD'}</button>

                                <button onClick={()=>handleToView('BOARD')} >{'BOARD'}</button>

                            </div>
            </div>
        }
    }