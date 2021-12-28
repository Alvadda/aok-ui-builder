const MODIFIER = 1
const TO_FULL_HD = 1.4286

const frames = document.querySelectorAll('.frame')
const outputAlly = document.querySelector('.output-ally')
const outputEnemy = document.querySelector('.output-emeny')
const copyAlly = document.querySelector('.copy-ally')
const copyEnemy = document.querySelector('.copy-enemy')
const ui = document.querySelector('.ui')
let selectedFrame =  null;
let mousdown = false;

const getAxis = (element) => {
    const x = window.getComputedStyle(element).left
    const y = window.getComputedStyle(element).bottom

    return {
        x,
        y
    }
}

const calcOffset = (pixel) => {
    return Math.round(parseInt(pixel) * TO_FULL_HD)
}

const addToClipboard = (text) => {
    var data = [new ClipboardItem({ "text/plain": new Blob([text], { type: "text/plain" }) })];
    navigator.clipboard.write(data)
}

const removeSelection = () => {
    frames.forEach((frame) => {
        frame.classList.remove('selected')
    })
}

const getPositions = () => {
    const allyPositions = []
    const enemyPositions = []
    frames.forEach((frame) => {
        const { x, y } = getAxis(frame)

        if (frame.id.includes('ALLY')) {
            
            allyPositions.push(`"${frame.id}_HIDDEN": "false",`)
            allyPositions.push(`"${frame.id}_X_OFFSET": "${calcOffset(x)}",`)
            allyPositions.push(`"${frame.id}_Y_OFFSET": "${calcOffset(y)}",`)
        }

        if (frame.id.includes('ENEMY')) {
            
            enemyPositions.push(`"${frame.id}_HIDDEN": "false",`)
            enemyPositions.push(`"${frame.id}_X_OFFSET": "${calcOffset(x)}",`)
            enemyPositions.push(`"${frame.id}_Y_OFFSET": "${calcOffset(y)}",`)
        }

    })
    outputAlly.value = allyPositions.join('\n')
    outputEnemy.value = enemyPositions.join('\n')
}

getPositions()



ui.onmousedown = () =>  mousdown = true
ui.onmouseup = () => mousdown = false
ui.onmousemove = (event) => {
    if (selectedFrame && mousdown) {
        selectedFrame.style.left = `${event.offsetX}px`
        selectedFrame.style.bottom = `${(ui.offsetHeight - event.offsetY)}px`
        getPositions()
    }
}

frames.forEach((frame) => {
    frame.addEventListener('click', (event) => {
        removeSelection()
        selectedFrame = event.target
        selectedFrame.classList.add('selected')
    });
  });

copyAlly.addEventListener('click', () => {
    addToClipboard(outputAlly.value)
})

copyEnemy.addEventListener('click', () => {
    addToClipboard(outputEnemy.value)
})


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
    getPositions()
})