import { handleToggleAdd, handleToPage } from '../../actions/switchView'
 
import React from "react";

export const Menu = (
  <div className='divMenu'>
    <button
      className='buttonMenu'
      onClick={() => handleToPage('HOME')}
    >{`${'HOME'}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToggleAdd()}
    >{`${'ADD'}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToPage('BOARD')}
    >{`${'BOARD'}`}</button>
  </div>
)
