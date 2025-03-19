export const formatDate = d => {
  const date = new Date(d)
  return date.toLocaleDateString('fr-FR')
}

export const formatPrice = p => {
  return p.toFixed(2) + ' €'
}
