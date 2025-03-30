import React, { Component } from 'react'
import { VIEW } from '../../constants/constants'
import {handleToView} from '../../actions/switchView'

export class HomeView extends Component {
    render () {
            return   <div>ADD WIEW
                            <div>
                                <button onClick={()=>handleToView(`${VIEW.HOME}`)} >{`${VIEW.HOME}`}</button>
                                <button onClick={()=>handleToView(`${VIEW.ADD}`)} >{`${VIEW.ADD}`}</button>

                                <button onClick={()=>handleToView(`${VIEW.BOARD}`)} >{`${VIEW.BOARD}`}</button>

                            </div>
            </div>
        }
    }