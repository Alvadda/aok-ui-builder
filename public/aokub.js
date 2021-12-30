;(function () {
  const MODIFIER = 1
  const GAME_HEIGHT = 1080
  const GAME_WIDTH = 1920

  const frames = document.querySelectorAll('.frame')
  const outputAlly = document.querySelector('.output-ally')
  const outputEnemy = document.querySelector('.output-emeny')
  const ui = document.querySelector('.ui')
  const controllContainer = document.querySelector('.controll')

  const switchGrid = document.querySelector('#grid-switch')

  const buttonCopyAlly = document.querySelector('.copy-ally')
  const buttonCopyEnemy = document.querySelector('.copy-enemy')
  const buttonDefaultPreset = document.querySelector('#set-default-preset')
  const buttonFarPreset = document.querySelector('#set-far-preset')
  const buttonClosePreset = document.querySelector('#set-close-preset')
  const buttonSavePreset = document.querySelector('#save-preset')
  const buttonLoadPreset = document.querySelector('#load-preset')

  const { defaultPreset, farPreset, closePreset } = presets()
  const { getLastPreset, savePreset } = userPresets()

  let selectedFrame = null
  let mousdown = false
  let lastUiXPosition
  let lastUiYPosition
  let allyPositions = []
  let enemyPositions = []
  let currentPositions = presets().emptyPreset

  const getAxis = (element) => {
    const x = window.getComputedStyle(element).left
    const y = window.getComputedStyle(element).bottom

    return {
      x,
      y,
    }
  }

  const getSwitchValue = (switchEle) => {
    return switchEle.children[0].checked
  }

  const setGrid = () => {
    ui.style.backgroundImage = getSwitchValue(switchGrid) ? "url('./images/game_grid.webp')" : "url('./images/game.webp')"
  }

  const calcOffset = (pixel, from, to) => {
    return Math.round((parseInt(pixel) / from) * to)
  }

  const addToClipboard = (text) => {
    var data = [new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) })]
    navigator.clipboard.write(data)
  }

  const removeSelection = () => {
    frames.forEach((frame) => {
      frame.classList.remove('selected')
    })
    mousdown = false
  }

  const updatePositions = () => {
    allyPositions = []
    enemyPositions = []

    frames.forEach((frame) => {
      const { x, y } = getAxis(frame)
      const frameKeyX = `${frame.id}_X_OFFSET`
      const frameKeyY = `${frame.id}_Y_OFFSET`
      const frameValueX = calcOffset(x, ui.offsetWidth, GAME_WIDTH)
      const frameValueY = calcOffset(y, ui.offsetHeight, GAME_HEIGHT)

      if (frame.id.includes('ALLY')) {
        allyPositions.push(`"${frame.id}_HIDDEN": "false",`)
        allyPositions.push(`"${frameKeyX}": "${frameValueX}",`)
        allyPositions.push(`"${frameKeyY}": "${frameValueY}",`)
      }

      if (frame.id.includes('ENEMY')) {
        enemyPositions.push(`"${frame.id}_HIDDEN": "false",`)
        enemyPositions.push(`"${frameKeyX}": "${frameValueX}",`)
        enemyPositions.push(`"${frameKeyY}": "${frameValueY}",`)
      }

      currentPositions[`${frameKeyX}`] = frameValueX
      currentPositions[`${frameKeyY}`] = frameValueY
    })

    outputAlly.value = allyPositions.join('\n')
    outputEnemy.value = enemyPositions.join('\n')
  }

  const setPreset = (preset) => {
    const uiSize = getComputedStyle(document.documentElement).getPropertyValue('--ui-size')

    frames.forEach((frame) => {
      const { style } = frame
      style.left = `${preset[`${frame.id}_X_OFFSET`] * uiSize}px`
      style.bottom = `${preset[`${frame.id}_Y_OFFSET`] * uiSize}px`
    })

    updatePositions()
  }

  updatePositions()
  setGrid()

  ui.onmousedown = (event) => {
    mousdown = true
    if (!event.target.classList.contains('frame')) {
      removeSelection()
    }
  }
  ui.onmouseup = () => (mousdown = false)
  ui.onmousemove = (event) => {
    if (selectedFrame && mousdown) {
      if (!event.target.classList.contains('frame')) {
        lastUiXPosition = event.offsetX
        lastUiYPosition = ui.offsetHeight - event.offsetY

        selectedFrame.style.left = `${lastUiXPosition}px`
        selectedFrame.style.bottom = `${lastUiYPosition}px`
      } else {
        selectedFrame.style.left = `${lastUiXPosition + event.offsetX}px`
        selectedFrame.style.bottom = `${lastUiYPosition + (event.target.clientHeight - event.offsetY)}px`
      }
      updatePositions()
    }
  }

  frames.forEach((frame) => {
    frame.onclick = (event) => {
      removeSelection()
      selectedFrame = event.target
      selectedFrame.classList.add('selected')
    }
  })

  switchGrid.onclick = setGrid

  buttonDefaultPreset.onclick = () => {
    setPreset(defaultPreset)
  }

  buttonFarPreset.onclick = () => {
    setPreset(farPreset)
  }

  buttonClosePreset.onclick = () => {
    setPreset(closePreset)
  }

  buttonSavePreset.onclick = () => {
    savePreset(currentPositions)
  }

  buttonLoadPreset.onclick = () => {
    setPreset(getLastPreset())
  }

  buttonCopyAlly.onclick = () => {
    addToClipboard(outputAlly.value)
  }

  buttonCopyEnemy.onclick = () => {
    addToClipboard(outputEnemy.value)
  }

  window.addEventListener('keydown', (event) => {
    if (!selectedFrame) return

    const { style } = selectedFrame
    const { x, y } = getAxis(selectedFrame)

    style.left = x
    style.bottom = y

    switch (event.key) {
      case 'ArrowUp':
        style.bottom = `${parseInt(style.bottom) + MODIFIER}px`
        break
      case 'ArrowDown':
        style.bottom = `${parseInt(style.bottom) - MODIFIER}px`
        break
      case 'ArrowLeft':
        style.left = `${parseInt(style.left) - MODIFIER}px`
        break
      case 'ArrowRight':
        style.left = `${parseInt(style.left) + MODIFIER}px`
        break
      case 'Escape':
        selectedFrame = null
        removeSelection()
        break
      default:
        break
    }
    updatePositions()
  })
})()
