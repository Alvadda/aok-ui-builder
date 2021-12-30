const userPresets = () => {
  const USER_PRESETS = 'USER_PRESETS'

  let presets = JSON.parse(localStorage.getItem(USER_PRESETS) || '[]')
  console.log(presets)

  const getLastPreset = () => {
    return presets[0]
  }

  const savePreset = (preset) => {
    const newPresets = [preset]
    localStorage.setItem(USER_PRESETS, JSON.stringify(newPresets))
    presets = newPresets
  }

  return {
    savePreset,
    getLastPreset,
  }
}
