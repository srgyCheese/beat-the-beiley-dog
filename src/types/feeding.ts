export const categories = ['nature',
  'city',
  'technology', 'food',
  'still_life',
  'abstract', 'wildlife'] as const

export type Category = typeof categories[number]

export type Item = {
  url: string,
  id: number,
  category: Category
}

function weightedRandom(options: any) {
  var i;

  var weights = [options[0].weight];

  for (i = 1; i < options.length; i++)
    weights[i] = options[i].weight + weights[i - 1];

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++)
    if (weights[i] > random)
      break;

  return options[i].item;
}

export const getRandomCategory = () => {
  return weightedRandom([
    {
      item: 'nature',
      weight: 5
    },
    {
      item: 'city',
      weight: 5
    },
    {
      item: 'technology',
      weight: 20
    },
    {
      item: 'food',
      weight: 40
    },
    {
      item: 'still_life',
      weight: 5
    },
    {
      item: 'abstract',
      weight: 5
    },
    {
      item: 'wildlife',
      weight: 30
    },
  ]) as Category
}

const categoriesChances = {
  nature: 0.3,
  city: 0.2,
  technology: 0.3,
  food: 0.9,
  still_life: 0.2,
  abstract: 0.1,
  wildlife: 0.8,
}

export const rollCategory = (category: Category) => {
  const randomNum = Math.random()

  if (randomNum < categoriesChances[category]) {
    return true
  }

  return false
}