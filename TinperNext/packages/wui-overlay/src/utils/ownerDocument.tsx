import ownerDocument from 'dom-helpers/ownerDocument';
import { Component } from 'react';
import ReactDOM from 'react-dom';

export default function(componentOrElement: HTMLElement | Component) {
    return ownerDocument(ReactDOM.findDOMNode(componentOrElement));
}
