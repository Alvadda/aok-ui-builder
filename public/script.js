const MODIFIER = 1
const TO_FULL_HD = 1.4286
const GAME_HEIGHT = 1080
const GAME_WIDTH = 1920

const frames = document.querySelectorAll('.frame')
const outputAlly = document.querySelector('.output-ally')
const outputEnemy = document.querySelector('.output-emeny')
const copyAlly = document.querySelector('.copy-ally')
const copyEnemy = document.querySelector('.copy-enemy')
const ui = document.querySelector('.ui')
const switchGrid = document.querySelector('#grid-switch')
const switchPlayer = document.querySelector('#player-switch')

let selectedFrame =  null;
let mousdown = false;

let allyPositions = []
let enemyPositions = []

const getAxis = (element) => {
    const x = window.getComputedStyle(element).left
    const y = window.getComputedStyle(element).bottom

    return {
        x,
        y
    }
}

const getSwitchValue = (switchEle) => {
    return switchEle.children[0].checked
}

const setGrid = () => {
    ui.style.backgroundImage = getSwitchValue(switchGrid) ? "url('./images/game_grid.webp')" : "url('./images/game.webp')";
}

const calcOffset = (pixel, from, to) => {
    return Math.round((parseInt(pixel) / from) * to)
}

const addToClipboard = (text) => {
    var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })];
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

        if (frame.id.includes('ALLY')) {
            allyPositions.push(`"${frame.id}_HIDDEN": "false",`)
            allyPositions.push(`"${frame.id}_X_OFFSET": "${calcOffset(x, ui.offsetWidth, GAME_WIDTH)}",`)
            allyPositions.push(`"${frame.id}_Y_OFFSET": "${calcOffset(y ,ui.offsetHeight, GAME_HEIGHT)}",`)
        }

        if (frame.id.includes('ENEMY')) {
            
            enemyPositions.push(`"${frame.id}_HIDDEN": "false",`)
            enemyPositions.push(`"${frame.id}_X_OFFSET": "${calcOffset(x, ui.offsetWidth, GAME_WIDTH)}",`)
            enemyPositions.push(`"${frame.id}_Y_OFFSET": "${calcOffset(y ,ui.offsetHeight, GAME_HEIGHT)}",`)
        }

    })
    outputAlly.value = allyPositions.join('\n')
    outputEnemy.value = enemyPositions.join('\n')
}

updatePositions()
setGrid()

ui.onmousedown = (event) =>  {
    mousdown = true
    if (!event.target.classList.contains('frame')) {
        removeSelection()
    }
}
ui.onmouseup = () => mousdown = false
ui.onmousemove = (event) => {
    if (selectedFrame && mousdown) {
        selectedFrame.style.left = `${event.offsetX}px`
        selectedFrame.style.bottom = `${(ui.offsetHeight - event.offsetY)}px`
        updatePositions()
    }
}

frames.forEach((frame) => {
    frame.onclick = (event) => {
        removeSelection()
        selectedFrame = event.target
        selectedFrame.classList.add('selected')
    }
});

switchGrid.onclick = setGrid

copyAlly.onclick = () => {
    addToClipboard(outputAlly.value)
}

copyEnemy.onclick = () => {
    addToClipboard(outputEnemy.value)
}

window.addEventListener('keydown', (event) => {
    const { style } = selectedFrame
    const { x, y } = getAxis(selectedFrame)

    style.left = x
    style.bottom = y

    switch (event.key) {
        case 'ArrowUp':
            style.bottom = `${parseInt(style.bottom) + MODIFIER}px`
            break;
        case 'ArrowDown':
            style.bottom = `${parseInt(style.bottom) - MODIFIER}px`
            break;
        case 'ArrowLeft':
            style.left = `${parseInt(style.left) - MODIFIER}px`
            break;
        case 'ArrowRight':
            style.left = `${parseInt(style.left) + MODIFIER}px`
            break;
        case 'Escape':
            selectedFrame = null
            removeSelection()
            break;
        default:
            break;
    }
    updatePositions()
})