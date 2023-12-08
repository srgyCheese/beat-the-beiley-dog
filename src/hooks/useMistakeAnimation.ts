const useMistakeAnimation = () => {
  return {
    successAnimation: () => {
      document.body.classList.add('transition-all', 'duration-400', 'bg-green-300')

      setTimeout(() => document.body.classList.remove('bg-green-300'), 400)
    },
    mistakeAnimation: () => {
      document.body.classList.add('transition-all', 'duration-400', 'bg-red-300')

      setTimeout(() => document.body.classList.remove('bg-red-300'), 400)
    }
  }
}

export default useMistakeAnimation