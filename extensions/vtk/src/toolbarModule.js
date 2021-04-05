import SlabThicknessToolbarComponent from './toolbarComponents/SlabThicknessToolbarComponent';
import VTKMPRToolbarButton from './toolbarComponents/VTKMPRToolbarButton';

const TOOLBAR_BUTTON_TYPES = {
  COMMAND: 'command',
  SET_TOOL_ACTIVE: 'setToolActive',
};

const definitions = [
  {
    id: 'Crosshairs',
    label: 'Crosshairs',
    icon: 'crosshairs',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableCrosshairsTool',
    commandOptions: {},
  },
  {
    id: 'WWWC',
    label: 'W/L',
    icon: 'level',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableLevelTool',
    commandOptions: {},
  },
  {
    id: 'Reset',
    label: 'Reset',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetMPRView',
    commandOptions: {},
  },
  {
    id: 'Rotate',
    label: 'Rotacionar',
    icon: '3d-rotate',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableRotateTool',
    commandOptions: {},
  },
  {
    id: 'setBlendModeToComposite',
    label: 'MIP Off',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToComposite',
    commandOptions: {},
  },
  {
    id: 'setBlendModeToMaximumIntensity',
    label: 'MIP On',
    icon: 'soft-tissue',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToMaximumIntensity',
    commandOptions: {},
  },

  {
    id: 'increaseSlabThickness',
    label: 'Aumentar',
    icon: 'caret-up',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'increaseSlabThickness',
    commandOptions: {},
  },
  {
    id: 'decreaseSlabThickness',
    label: 'Diminuir',
    icon: 'caret-down',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'decreaseSlabThickness',
    commandOptions: {},
  },
  {
    id: 'changeSlabThickness',
    label: 'Espaçamento',
    icon: 'soft-tissue',
    CustomComponent: SlabThicknessToolbarComponent,
    commandName: 'setSlabThickness',
    actionButton: {
      id: 'setSlabThickness',
      label: 'slider',
      type: TOOLBAR_BUTTON_TYPES.COMMAND,
      commandName: 'setSlabThickness',
      commandOptions: {},
    },
    deactivateButton: {
      id: 'setBlendModeToComposite',
      type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
      commandName: 'setBlendModeToComposite',
      commandOptions: {},
    },
    operationButtons: [
      {
        id: 'setBlendModeToMaximumIntensity',
        label: 'MIP',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToMaximumIntensity',
        commandOptions: {},
      },
      {
        id: 'setBlendModeToMinimumIntensity',
        label: 'MinIP',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToMinimumIntensity',
        commandOptions: {},
      },
      {
        id: 'setBlendModeToAverageIntensity',
        label: 'AvgIP',
        type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
        commandName: 'setBlendModeToAverageIntensity',
        commandOptions: {},
      },
    ],
  },
  {
    id: '2DMPR',
    label: '2D MPR',
    icon: 'cube',
    //
    CustomComponent: VTKMPRToolbarButton,
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'mpr2d',
    context: 'ACTIVE_VIEWPORT::CORNERSTONE',
  },
];

const definitionsM = [
  {
    id: 'Crosshairs',
    label: 'Crosshairs',
    icon: 'crosshairs',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableCrosshairsTool',
    commandOptions: {},
  },
  {
    id: 'WWWC',
    label: 'W/L',
    icon: 'level',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableLevelTool',
    commandOptions: {},
  },
  {
    id: 'Reset',
    label: 'Reset',
    icon: 'reset',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'resetMPRView',
    commandOptions: {},
  },
  {
    id: 'Rotate',
    label: 'Rotacionar',
    icon: '3d-rotate',
    //
    type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
    commandName: 'enableRotateTool',
    commandOptions: {},
  },
  {
    id: 'setBlendModeToComposite',
    label: 'MIP Off',
    icon: 'times',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToComposite',
    commandOptions: {},
  },
  {
    id: 'setBlendModeToMaximumIntensity',
    label: 'MIP On',
    icon: 'soft-tissue',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'setBlendModeToMaximumIntensity',
    commandOptions: {},
  },

  {
    id: 'increaseSlabThickness',
    label: 'Aumentar',
    icon: 'caret-up',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'increaseSlabThickness',
    commandOptions: {},
  },
  {
    id: 'decreaseSlabThickness',
    label: 'Diminuir',
    icon: 'caret-down',
    //
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'decreaseSlabThickness',
    commandOptions: {},
  },
  // {
  //   id: 'changeSlabThickness',
  //   label: 'Espaçamento',
  //   icon: 'soft-tissue',
  //   CustomComponent: SlabThicknessToolbarComponent,
  //   commandName: 'setSlabThickness',
  //   actionButton: {
  //     id: 'setSlabThickness',
  //     label: 'slider',
  //     type: TOOLBAR_BUTTON_TYPES.COMMAND,
  //     commandName: 'setSlabThickness',
  //     commandOptions: {},
  //   },
  //   deactivateButton: {
  //     id: 'setBlendModeToComposite',
  //     type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
  //     commandName: 'setBlendModeToComposite',
  //     commandOptions: {},
  //   },
  //   operationButtons: [
  //     {
  //       id: 'setBlendModeToMaximumIntensity',
  //       label: 'MIP',
  //       type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
  //       commandName: 'setBlendModeToMaximumIntensity',
  //       commandOptions: {},
  //     },
  //     {
  //       id: 'setBlendModeToMinimumIntensity',
  //       label: 'MinIP',
  //       type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
  //       commandName: 'setBlendModeToMinimumIntensity',
  //       commandOptions: {},
  //     },
  //     {
  //       id: 'setBlendModeToAverageIntensity',
  //       label: 'AvgIP',
  //       type: TOOLBAR_BUTTON_TYPES.SET_TOOL_ACTIVE,
  //       commandName: 'setBlendModeToAverageIntensity',
  //       commandOptions: {},
  //     },
  //   ],
  // },
  {
    id: '2DMPR',
    label: '2D MPR',
    icon: 'cube',
    //
    CustomComponent: VTKMPRToolbarButton,
    type: TOOLBAR_BUTTON_TYPES.COMMAND,
    commandName: 'mpr2d',
    context: 'ACTIVE_VIEWPORT::CORNERSTONE',
  },
];

export default {
  definitions,
  definitionsM,
  defaultContext: 'ACTIVE_VIEWPORT::VTK',
};
