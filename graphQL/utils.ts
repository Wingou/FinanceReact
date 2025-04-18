
export const setParamInSQL =  (sql:string, params:string[]):string => {
  let i = 0
  return sql.replace(/\?/g, () => {
    return params[i++] || '?'
  })
}