import ownerWindow from 'dom-helpers/ownerWindow';
import { Component } from 'react';
import ReactDOM from 'react-dom';

export default function(componentOrElement: HTMLElement | Component) {
    return ownerWindow(ReactDOM.findDOMNode(componentOrElement));
}
