import React from 'react'
import {
  handleSelectedCat,
  handleUpdateAllCats,
  handleUpdateMultipleCats
} from '../../actions/search'
import { Categorie } from '../../types/common'
import { CheckBox } from '../common/inputForm'
import { ActivatedCatsInputProps, SearchInputCatProps } from '../board/boardView.d'

export const ActivatedCatsInput: React.FC<ActivatedCatsInputProps> = (props) => {
  const { displayedCats } = props
  return displayedCats.length === 0 ? <MsgNoCat /> : <SearchInputCat {...props} />
}

const MsgNoCat: React.FC = () => (
  <div className="MsgNoCatDiv">No category</div>
)

const SearchInputCat: React.FC<ActivatedCatsInputProps> = ({ isMultiCats, isAllCatsChecked, displayedCats }) => {
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
          return (
            <CheckBox
              key={`${c.id}`}
              name={`${c.id}`}
              index={index}
              checked={c.isOn}
              handleFC={handleSelectedCat}
              label={c.name}
            />
          )
        })}
      </div>
    </div>
  )
}
