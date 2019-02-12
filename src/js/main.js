'use strict'

require('handsontable/dist/handsontable.full.min.css')

const Handsontable = require('handsontable')
const Papa = require('papaparse')

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
  const data = await fetchCSV(window.location.hash.substr(1))

  const tableElement = document.createElement('div')
  document.body.appendChild(tableElement)

  Handsontable(tableElement, {
    data: data.data,
    colHeaders: data.meta.fields,
    columnSorting: true
  })
}

window.addEventListener("DOMContentLoaded", (event) => {
  main()
})
