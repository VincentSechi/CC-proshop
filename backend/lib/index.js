function slugify(str) {
  return str
    .toString()
    .normalize('NFD')                     // décompose accents
    .replace(/[\u0300-\u036f]/g, '')     // supprime les accents
    .toLowerCase()
    .trim()
    .replace(/&/g, 'et')                  // remplace & par "et"
    .replace(/[^a-z0-9]+/g, '-')         // remplace tout ce qui n'est pas lettre ou chiffre par un tiret
    .replace(/^-+|-+$/g, '');             // supprime les tirets au début et fin
}


module.exports = {
    slugify
}