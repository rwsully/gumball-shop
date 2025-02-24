export function getRandomProductImage(productName: string, width = 400, height = 400): string {
  // Generate a consistent "random" number based on the product name
  const seed = productName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

