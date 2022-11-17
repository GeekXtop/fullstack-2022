const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, b) => sum + b.likes, 0)
}

const mostLikes = (blogs) => {
  const max = blogs.reduce((a, b) => Math.max(a, b), -Infinity)
  return max
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
}
