import React from 'react'
import {
  handleSelectedCat,
  handleUpdateAllCats,
  handleUpdateMultipleCats
} from '../../actions/search'
import { CheckBox } from '../common/inputForm'
import { ActivatedCatsInputProps } from '../board/boardView.d'

export const ActivatedCatsInput: React.FC<ActivatedCatsInputProps> = (props) => {
  const { isMultiCats, isAllCatsChecked, displayedCats, nbObjPerCats, isSearchReserved, isSearchDeleted } = props
  return displayedCats.length === 0 ? <MsgNoCat /> : <SearchInputCat isMultiCats={isMultiCats} isAllCatsChecked={isAllCatsChecked} displayedCats={displayedCats} nbObjPerCats={nbObjPerCats} isSearchReserved={isSearchReserved} isSearchDeleted={isSearchDeleted} />
}

const MsgNoCat: React.FC = () => (
  <div className="MsgNoCatDiv">No category</div>
)

const SearchInputCat: React.FC<ActivatedCatsInputProps> = ({ isMultiCats, isAllCatsChecked, displayedCats, nbObjPerCats, isSearchReserved, isSearchDeleted }) => {

  return (
    <div className='searchDiv' >
      <div className='searchCheckboxAdmin'>
        <CheckBox
          key={`multipleCats`}
          name='multipleCats'
          index={0}
          checked={isMultiCats}
          handleFC={handleUpdateMultipleCats}
          label='MULTI'
          isLabelBold={true}
        />
        <CheckBox
          key={`allcats`}
          name='allCats'
          index={1}
          checked={isAllCatsChecked}
          handleFC={handleUpdateAllCats}
          label='ALL'
          isLabelBold={true}
        />
      </div>
      <div className='searchCheckboxOptions'>
        {displayedCats.map((c, index) => {
          const nbObjPerCat_ = nbObjPerCats.find((nbObjCat) => nbObjCat.catId === c.id)
          const nbObjPerCat = nbObjPerCat_ === undefined ? { catId: c.id, nbActivatedObj: 0, nbReservedObj: 0, nbDeletedObj: 0 } : nbObjPerCat_
          const nbObj = nbObjPerCat.nbActivatedObj + (isSearchReserved ? nbObjPerCat.nbReservedObj : 0) + (isSearchDeleted ? nbObjPerCat.nbDeletedObj : 0)
          const label = nbObjPerCat ? c.name + ' (' + nbObj + ')' : 'NONE'
          return (
            <CheckBox
              key={`${c.id}`}
              name={`${c.id}`}
              index={index}
              checked={c.isOn}
              handleFC={handleSelectedCat}
              label={label}
            />
          )
        })}
      </div>
    </div>
  )
}
