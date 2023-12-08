import { Category } from "./feeding"

const verySecretApiKey = 'xt7iJmpaZL3udJp9qlTwtQ==8icH39lHwRg4CwXr'

export const getRandomImage = async (category: Category) => {
  const response = await fetch(`https://api.api-ninjas.com/v1/randomimage?category=${category}&height=150&width=200`, {
    headers: {
      'X-Api-Key': verySecretApiKey,
    }
  })

  const data = await response.text()

  return data
}