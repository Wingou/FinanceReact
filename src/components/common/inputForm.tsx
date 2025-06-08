import React from 'react'
import { InputDateProps, InputTextProps } from './inputForm.d'


interface CheckBoxProps {
    name: string,
    index: number,
    checked: boolean,
    handleFC: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string,
    isLabelBold?: boolean,
    isDisabled?: boolean
}
export const CheckBox: React.FC<CheckBoxProps> = ({ name, index, checked, handleFC, label, isLabelBold, isDisabled }) => {
    const checkboxLabelStyle = isLabelBold ? 'checkboxLabelBold' : 'checkboxLabel'
    const disableDiv = isDisabled ? 'disabledDiv' : ''
    return <div className={`checkboxWithLabel ${disableDiv}`} >
        <div key={`${name}Label_${index}`} className='checkbox'>
            <input
                key={`${name}Input_${index}`}
                type='checkbox'
                name={name}
                checked={checked}
                disabled={isDisabled}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFC(e)
                }}
            />
        </div>
        <div className={checkboxLabelStyle}>{label}</div>
    </div>
}


export const InputText: React.FC<InputTextProps> = ({ name, placeholder, handleFC, value, width }) => {
    return <input
        key={`Input_${name}`}
        className={`input_Text ${width}`}
        type='text'
        name={name}
        placeholder={placeholder}
        onChange={e => handleFC(e)}
        value={value}
    />
}


export const InputPrice: React.FC<InputTextProps> = ({ name, placeholder, value, handleFC }) => {

    const isPriceOK = /^-?\d*\.?\d{0,2}$/.test(value)
        && value !== '' && value !== '-'

    const valueNumber = value === 'NaN' ? '' : value

    return <div className='addInput_PriceAndCurrency'>
        <input
            key={'Input_Price'}
            className={`input_Price ${isPriceOK ? '' : 'invalidValue'}`}
            type='text'
            name={name}
            placeholder={placeholder}
            value={valueNumber}
            onChange={e => handleFC(e)}
            pattern='/^-?\d*\.?\d{0,2}$/'
        />
        <input
            key={'Currency'}
            className={`input_Currency ${isPriceOK ? '' : 'invalidValue'}`}
            type='text'
            defaultValue='€'
            disabled={true}
        />
    </div>
}

export const InputDate: React.FC<InputDateProps> = ({ name, value, handleFC }) => {
    return <input
        key={'Input_Date'}
        className='addInput_Date'
        type='date'
        name={name}
        value={value}
        onChange={e => handleFC(e)}
    />
}
