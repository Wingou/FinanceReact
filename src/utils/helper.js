export const formatDate = d => {
  const date = new Date(d)
  return date.toLocaleDateString('fr-FR')
}

export const formatPrice = p => {
  return p!==0 ? p.toFixed(2) + ' €' : ''
}

export const formatPriceWithZero = p => {
  return p.toFixed(2) + ' €'
}

