import { handleToView } from '../../actions/switchView'
 
import React from "react";

export const Menu = (
  <div className='divMenu'>
    <button
      className='buttonMenu'
      onClick={() => handleToView('HOME')}
    >{`${'HOME'}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToView('ADD')}
    >{`${'ADD'}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToView('BOARD')}
    >{`${'BOARD'}`}</button>
  </div>
)
