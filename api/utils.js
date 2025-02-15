function escapeApostrophe (value) {
  if (value !== null) {
    return value.replace("'", "''")
  }
}

function dateForSQL (value) {
  return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
}

function setParamInSQL (sql, params) {
  let i = 0
  return sql.replace(/\?/g, () => {
    return params[i++] || '?'
  })
}

module.exports = { escapeApostrophe, dateForSQL, setParamInSQL }
