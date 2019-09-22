import getFavoriteWines from './getFavoriteWines.query.gql'

export const resolvers = {
  Wine: {
    isInFavorites: (wine, _, { cache }) => {
      const { favoriteWines } = cache.readQuery({ query: getFavoriteWines })
      return favoriteWines.includes(wine.id)
    }
  },

  Mutation: {
    addOrRemoveFromFavorites: (_, { id }, { cache }) => {
      const { favoriteWines } = cache.readQuery({ query: getFavoriteWines })
      const data = {
        favoriteWines: favoriteWines.includes(id)
          ? favoriteWines.filter(i => i !== id)
          : [...favoriteWines, id]
      }
      cache.writeQuery({ query: getFavoriteWines, data })
      return data.favoriteWines
    }
  }
}
