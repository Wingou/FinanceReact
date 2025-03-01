import React, { Component } from 'react'
import {PriceIdInput, BeginDateInput, EndDateInput} from '../components/searchMenuInputs'
// import Button from './affButton';
import { handlePriceId } from '../actions/search';

class SearchMenu extends Component {
  render () {

    const selectedPriceId = this.props.selectedPriceId;
    // const selectedBeginDate = this.props.selectedPrice.beginDate;
    // const selectedEndDate = this.props.selectedPrice.endDate;

    return (
      <div>
        { selectedPriceId }
        {/* <PriceIdInput props={selectedPriceId} onChange={(e) => { handlePriceId(e); }}/>
        <BeginDateInput />
        <EndDateInput />
          */}



     
         {/* <Button affText="Valider" onClick={() => {          }} />  */}
      </div>
    )
  }
}

export default SearchMenu
