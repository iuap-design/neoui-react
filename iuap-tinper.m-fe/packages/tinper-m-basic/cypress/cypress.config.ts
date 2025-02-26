import { defineConfig } from 'cypress';
// import os from "os";
import baseConfig from './base.config';
// import ownerMap from './cypress/owner-constants'
const ownerMap = require('./owner-constants.js')
let specPattern: string[] = [];
const { cy, comp: comps } = process.env;
const components = comps && comps.split?.(',')  || null;
console.log('comps===', components);
// 全量
if (components && components?.length) {
  // 定量
  if (cy === 'server') {
    components.forEach(comp => {
      specPattern = specPattern.concat([`./src/components/**/__tests__/${comp}.cy.{jsx,tsx}`]);
      specPattern = specPattern.concat(`./cypress/component/**/${comp}.cy.{jsx,tsx}`)
    })
  } else {
    specPattern = ownerMap[cy as string].reduce((a: string[], b: string) => components.includes(b) ? [...a, `./src/components/${b}/__tests__/*.cy.{jsx,tsx}`] : a, [])
    specPattern = specPattern.concat(ownerMap[cy as string].reduce((a: string[], b: string) => components.includes(b) ? [...a, `./src/components/${b}/__tests__/*.cy.{jsx,tsx}`] : a, []))
    components.forEach(comp => {
      specPattern = specPattern.concat(`./cypress/component/${cy}/${comp}.cy.{jsx,tsx}`)
    })
    // specPattern = specPattern.concat(`./cypress/component/${cy}/treeSelect.cy.{jsx,tsx}`)
  }
  console.log(specPattern)
} else {
  if (cy === 'server') {
   
    specPattern = specPattern.concat(['./src/components/**/__tests__/*.cy.{jsx,tsx}']);
    specPattern = specPattern.concat('./cypress/component/**/*.cy.{jsx,tsx}')
  } else {
    specPattern = ownerMap[cy as string].map((_: string) => `./src/components/${_}/__tests__/*.cy.{jsx,tsx}`)
    specPattern = specPattern.concat(ownerMap[cy as string].map((_: string) => `./cypress/component/${_}.cy.{jsx,tsx}`))
    specPattern = specPattern.concat(`./cypress/component/${cy}/*.cy.{jsx,tsx}`)
    // specPattern = specPattern.concat(`./cypress/component/${cy}/treeSelect.cy.{jsx,tsx}`)
  }
   
}


baseConfig.component.specPattern = specPattern

// import webpackConfig from './webpack.cypress';
// const getCompareSnapshotsPlugin = require('cypress-image-diff-js/dist/plugin')
export default defineConfig(baseConfig);
