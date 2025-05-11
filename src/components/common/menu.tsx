import { handleToggleAdd, handleToggleLast, handleToPage } from '../../actions/switchView'

import React from "react";
import { PAGE } from '../../types/constants';

interface MenuProps {
  view: {
    page: PAGE,
    isAddOpen: boolean,
    isLast: boolean
  }
}

export const Menu: React.FC<MenuProps> = ({ view }) => {
  const { page, isAddOpen, isLast } = view
  return <div className='divMenu'>
    <button
      className={`btnMenu ${page === 'HOME' ? 'btnSwitchOn' : 'btnSwitchOff'}`}
      onClick={() => handleToPage('HOME')}
    >{`${'HOME'}`}</button>
    <button
      className={`btnMenu ${page === 'BOARD' ? 'btnSwitchOn' : 'btnSwitchOff'}`}
      onClick={() => handleToPage('BOARD')}
    >{`${'BOARD'}`}</button>
    <button
      className={`btnMenu  ${isAddOpen ? 'btnSwitchOn' : 'btnSwitchOff'}`}
      onClick={() => handleToggleAdd()}
    >{`${'ADD'}`}</button>
    <button
      className={`btnMenu  ${isLast ? 'btnSwitchOn' : 'btnSwitchOff'}`}
      onClick={() => handleToggleLast()}
    >{`${'LAST'}`}</button>
  </div>
}
