import drag_events from './inputs/drag_events';
import gesture_input from './inputs/gesture_input';
import hardware_keyboard_detector from './inputs/hardware_keyboard_detector';
import keyboard_input from './inputs/keyboard_input';
import other_inputs from './inputs/other_inputs';
import pointer_events from './inputs/pointer_events';
import tap_events from './inputs/tap_events';

export default {
    text: "| ▼ 输入(..键盘输入..)",
    collapsible: true,
    link: "/guide/flame/inputs/keyboard_input.chatgpt.md",
    children: [
        drag_events,
        gesture_input,
        keyboard_input,
        other_inputs,
        tap_events,
        pointer_events,
        hardware_keyboard_detector,
   ]
}