import React, { Component } from 'react'
// import Button from './affButton';
import { handlePriceId } from '../actions/search';

export class SearchMenu extends Component {
  render () {

    console.log("this.props : ",this.props )
    const selectedPriceId = this.props.selectedPriceId;
    // const selectedBeginDate = this.props.selectedPrice.beginDate;
    // const selectedEndDate = this.props.selectedPrice.endDate;

    return (
      <div>
        { selectedPriceId }
       {/* <PriceIdInput props={selectedPriceId} onChange={(e) => { handlePriceId(e); }}/> */}
        <BeginDateInput />
        <EndDateInput />
          



     
         {/* <Button affText="Valider" onClick={() => {          }} />  */}
      </div>
    )
  }
};




const PriceIdInput = () => (
  <div>
    PriceId : <input name='priceId' value={this.props.selectedPriceId} />
  </div>
)

const BeginDateInput = () => (
  <div>
    Begin Date : <input name='beginDate'  />
  </div>
)

const EndDateInput = () => (
  <div>
    End Date : <input name='endDate'  />
  </div>
)


