const presets = () => {
  const ALLY_1_PARTY_FRAME_X_OFFSET = 'ALLY_1_PARTY_FRAME_X_OFFSET'
  const ALLY_1_PARTY_FRAME_Y_OFFSET = 'ALLY_1_PARTY_FRAME_Y_OFFSET'
  const ALLY_2_PARTY_FRAME_X_OFFSET = 'ALLY_2_PARTY_FRAME_X_OFFSET'
  const ALLY_2_PARTY_FRAME_Y_OFFSET = 'ALLY_2_PARTY_FRAME_Y_OFFSET'
  const ALLY_3_PARTY_FRAME_X_OFFSET = 'ALLY_3_PARTY_FRAME_X_OFFSET'
  const ALLY_3_PARTY_FRAME_Y_OFFSET = 'ALLY_3_PARTY_FRAME_Y_OFFSET'

  const ENEMY_1_PARTY_FRAME_X_OFFSET = 'ENEMY_1_PARTY_FRAME_X_OFFSET'
  const ENEMY_1_PARTY_FRAME_Y_OFFSET = 'ENEMY_1_PARTY_FRAME_Y_OFFSET'
  const ENEMY_2_PARTY_FRAME_X_OFFSET = 'ENEMY_2_PARTY_FRAME_X_OFFSET'
  const ENEMY_2_PARTY_FRAME_Y_OFFSET = 'ENEMY_2_PARTY_FRAME_Y_OFFSET'
  const ENEMY_3_PARTY_FRAME_X_OFFSET = 'ENEMY_3_PARTY_FRAME_X_OFFSET'
  const ENEMY_3_PARTY_FRAME_Y_OFFSET = 'ENEMY_3_PARTY_FRAME_Y_OFFSET'

  const emptyPreset = {
    [ALLY_1_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_1_PARTY_FRAME_Y_OFFSET]: 0,
    [ALLY_2_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_2_PARTY_FRAME_Y_OFFSET]: 0,
    [ALLY_3_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_3_PARTY_FRAME_Y_OFFSET]: 0,

    [ENEMY_1_PARTY_FRAME_X_OFFSET]: 0,
    [ENEMY_1_PARTY_FRAME_Y_OFFSET]: 0,
    [ENEMY_2_PARTY_FRAME_X_OFFSET]: 0,
    [ENEMY_2_PARTY_FRAME_Y_OFFSET]: 0,
    [ENEMY_3_PARTY_FRAME_X_OFFSET]: 0,
    [ENEMY_3_PARTY_FRAME_Y_OFFSET]: 0,
  }

  const defaultPreset = {
    [ALLY_1_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_1_PARTY_FRAME_Y_OFFSET]: 0,
    [ALLY_2_PARTY_FRAME_X_OFFSET]: 225,
    [ALLY_2_PARTY_FRAME_Y_OFFSET]: 0,
    [ALLY_3_PARTY_FRAME_X_OFFSET]: 450,
    [ALLY_3_PARTY_FRAME_Y_OFFSET]: 0,

    [ENEMY_1_PARTY_FRAME_X_OFFSET]: 1190,
    [ENEMY_1_PARTY_FRAME_Y_OFFSET]: 0,
    [ENEMY_2_PARTY_FRAME_X_OFFSET]: 1415,
    [ENEMY_2_PARTY_FRAME_Y_OFFSET]: 0,
    [ENEMY_3_PARTY_FRAME_X_OFFSET]: 1640,
    [ENEMY_3_PARTY_FRAME_Y_OFFSET]: 0,
  }

  const farPreset = {
    [ALLY_1_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_1_PARTY_FRAME_Y_OFFSET]: 650,
    [ALLY_2_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_2_PARTY_FRAME_Y_OFFSET]: 525,
    [ALLY_3_PARTY_FRAME_X_OFFSET]: 0,
    [ALLY_3_PARTY_FRAME_Y_OFFSET]: 400,

    [ENEMY_1_PARTY_FRAME_X_OFFSET]: 1640,
    [ENEMY_1_PARTY_FRAME_Y_OFFSET]: 650,
    [ENEMY_2_PARTY_FRAME_X_OFFSET]: 1640,
    [ENEMY_2_PARTY_FRAME_Y_OFFSET]: 525,
    [ENEMY_3_PARTY_FRAME_X_OFFSET]: 1640,
    [ENEMY_3_PARTY_FRAME_Y_OFFSET]: 400,
  }

  const closePreset = {
    [ALLY_1_PARTY_FRAME_X_OFFSET]: 680,
    [ALLY_1_PARTY_FRAME_Y_OFFSET]: 315,
    [ALLY_2_PARTY_FRAME_X_OFFSET]: 680,
    [ALLY_2_PARTY_FRAME_Y_OFFSET]: 250,
    [ALLY_3_PARTY_FRAME_X_OFFSET]: 680,
    [ALLY_3_PARTY_FRAME_Y_OFFSET]: 185,

    [ENEMY_1_PARTY_FRAME_X_OFFSET]: 950,
    [ENEMY_1_PARTY_FRAME_Y_OFFSET]: 315,
    [ENEMY_2_PARTY_FRAME_X_OFFSET]: 950,
    [ENEMY_2_PARTY_FRAME_Y_OFFSET]: 250,
    [ENEMY_3_PARTY_FRAME_X_OFFSET]: 950,
    [ENEMY_3_PARTY_FRAME_Y_OFFSET]: 185,
  }

  return {
    defaultPreset,
    farPreset,
    closePreset,
    emptyPreset,
  }
}
