import { handleToView } from '../../actions/switchView'
import { VIEW } from '../../constants/constants'

export const Menu = (
  <div className='divMenu'>
    <button
      className='buttonMenu'
      onClick={() => handleToView(`${VIEW.HOME}`)}
    >{`${VIEW.HOME}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToView(`${VIEW.ADD}`)}
    >{`${VIEW.ADD}`}</button>
    <button
      className='buttonMenu'
      onClick={() => handleToView(`${VIEW.BOARD}`)}
    >{`${VIEW.BOARD}`}</button>
  </div>
)
