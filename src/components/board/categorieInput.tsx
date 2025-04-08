import React from 'react'
import {
  handleFilteredCat,
  handleUpdateAllCats,
  handleUpdateMultipleCats
} from '../../actions/search'
import { Categorie } from '../../types/common'


// Props du composant
interface ActivatedCatsInputProps {
  activatedCats: Categorie[]
  isMultiCats: boolean
  isAllCatsChecked: boolean
}

export const ActivatedCatsInput: React.FC<ActivatedCatsInputProps> = (props) => {
  const { activatedCats } = props
  return activatedCats.length === 0 ? <MsgNoCat /> : <InputDiv props={props} />
}

const MsgNoCat: React.FC = () => (
  <div className="MsgNoCatDiv">Pas de catégorie</div>
)

// Typage des props imbriqués (tu passais tout en `props`)
interface InputDivProps {
  props: ActivatedCatsInputProps
}

const InputDiv: React.FC<InputDivProps> = ({ props }) => {
  return (
    <div className="InputDiv">
      <label key="multipleCatsLabel" className="CheckboxLabel HeadLabel">
        <input
          key="multipleCatsInput"
          className="CheckboxInput"
          type="checkbox"
          name="multipleCats"
          checked={props.isMultiCats}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateMultipleCats(e)
          }}
        />
        MULTI
      </label>

      <label key="allCatsLabel" className="CheckboxLabel HeadLabel">
        <input
          key="allCatsInput"
          className="CheckboxInput"
          type="checkbox"
          name="allCats"
          checked={props.isAllCatsChecked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleUpdateAllCats(e)
          }}
        />
        ALL -
      </label>

      {props.activatedCats.map((c, index) => (
        <label key={index} className="CheckboxLabel">
          <input
            className="Checkbox"
            type="checkbox"
            checked={c.filtered}
            name={`${c.id}`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleFilteredCat(e)
            }
          />
          {c.catName + ' '}
        </label>
      ))}
    </div>
  )
}
