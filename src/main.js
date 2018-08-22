import React from 'react'
import ReactDom from 'react-dom'
import './assets/main.css'
import ContentsContainer from './component/ContentsContainer'
document.write('<div id="root"></div>')
ReactDom.render(
    <ContentsContainer/>,
    document.getElementById('root')
)
