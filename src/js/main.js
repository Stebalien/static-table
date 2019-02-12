'use strict'

require('handsontable/dist/handsontable.full.min.css')

const Handsontable = require('handsontable')
const Papa = require('papaparse')
const querystring = require('querystring')

async function fetchCSV (url) {
  const result = await window.fetch(new window.Request(url))
  if (!result.ok) {
    throw new Error(result.status)
  }

  const data = await result.blob()

  return new Promise((resolve, reject) => {
    Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      error: (error, _) => { reject(error) },
      complete: (result, _) => { resolve(result) }
    })
  })
}

async function main () {
  const params = querystring.parse(window.location.hash.substr(1))
  const src = params['src']
  const title = params['title'] || 'CSV Viewer'

  document.title = title

  const titleElement = document.createElement('h1')
  document.body.appendChild(titleElement)
  titleElement.innerText = title

  const tableElement = document.createElement('div')
  document.body.appendChild(tableElement)
  if (!src) {
    tableElement.innerText = 'No data source specified.'
    return
  }
  tableElement.innerText = `Loading: ${src}`

  const data = await fetchCSV(src)

  Handsontable(tableElement, {
    data: data.data,
    colHeaders: data.meta.fields,
    columnSorting: true
  })
}

main()
