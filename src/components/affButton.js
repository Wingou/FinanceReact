import React from "react"

const Button = ({ affText, onClick}) => (
  <button onClick={onClick}> {`${affText}`}</button>
);

export default Button
