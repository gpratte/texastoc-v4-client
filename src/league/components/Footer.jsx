import React from "react";
import './league.css'
import {VERSION} from '../../utils/constants'

const Footer = (props) => {
  return (
    <div className={'shim'}>
      <p>V{VERSION}</p>
    </div>
  )
}

export default Footer