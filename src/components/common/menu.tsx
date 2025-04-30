import { handleToggleAdd, handleToPage } from '../../actions/switchView'

import React from "react";

export const Menu = (
  <div className='divMenu'>
    <button
      className="btn"
      onClick={() => handleToPage('HOME')}
    >{`${'HOME'}`}</button>
    <button
      className="btn"
      onClick={() => handleToggleAdd()}
    >{`${'ADD'}`}</button>
    <button
      className="btn"
      onClick={() => handleToPage('BOARD')}
    >{`${'BOARD'}`}</button>
  </div>
)
