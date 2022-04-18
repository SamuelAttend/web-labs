import { Component } from 'react'
import './FunctionalComponent'

export function FunctionalComponent(props){
    return (
        <div>
            <button>
                {props.action}
            </button>
        </div>
    )
}