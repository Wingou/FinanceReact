import { handleToggleAdd, handleToPage } from '../../actions/switchView'

import React from "react";

export const Menu = (
  <div className='divMenu'>
    <button
      className="btnMenu btnEnabled"
      onClick={() => handleToPage('HOME')}
    >{`${'HOME'}`}</button>
    <button
      className="btnMenu btnEnabled"
      onClick={() => handleToggleAdd()}
    >{`${'ADD'}`}</button>
    <button
      className="btnMenu btnEnabled"
      onClick={() => handleToPage('BOARD')}
    >{`${'BOARD'}`}</button>
  </div>
)
