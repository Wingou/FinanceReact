import React, { Component } from 'react'
import { VIEW } from '../../constants/constants'
import {handleToView} from '../../actions/switchView'

export class AddView extends Component {
    render () {
            return   <div>WELCOME ADD VIEW 
                            <div>
                                <button onClick={()=>handleToView(`${VIEW.HOME}`)} >{`${VIEW.HOME}`}</button>
                                <button onClick={()=>handleToView(`${VIEW.ADD}`)} >{`${VIEW.ADD}`}</button>

                                <button onClick={()=>handleToView(`${VIEW.BOARD}`)} >{`${VIEW.BOARD}`}</button>

                            </div>
            </div>
        }
    }