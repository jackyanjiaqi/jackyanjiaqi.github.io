# HardwareKeyboardDetector
class HardwareKeyboardDetector
extends Component
The HardwareKeyboardDetector component allows you to directly listen to events from a hardware keyboard, bypassing the Focus widget in Flutter. It will not listen for events from any on-screen (software) keyboards.

This component can be placed anywhere in the component tree. For example, it can be attached to the root level of the Game class, or to the player being controlled. Multiple HardwareKeyboardDetector components can coexist within the same game, and they all will receive the key events.

The component provides the onKeyEvent event handler, which can either be overridden or passed as a parameter in the constructor. This event handler fires whenever the user presses or releases any key on a keyboard, and also when a key is being held.

The stream of key events will be normalized by Flutter, meaning that for every KeyDownEvent there will always be the corresponding KeyUpEvent, possibly with some KeyRepeatEvents in the middle. Depending on the platform, some of these events may be “synthesized”, i.e. created by the framework artificially in order to preserve the correct event sequence. See Flutter’s HardwareKeyboard for more details.

Similar normalization guarantee exists when this component is added to or removed from the component tree. If the user was holding any keys when the HardwareKeyboardDetector was mounted, then artificial KeyDownEvents will be fired; if the user was holding keys when this component was removed, then KeyUpEvents will be synthesized.

Use pauseKeyEvents property to temporarily halt/resume the delivery of onKeyEvents. The events will also stop being delivered when the component is removed from the component tree.

## Constructors
HardwareKeyboardDetector({void Function(KeyEvent)? onKeyEvent})

## Properties
physicalKeysPressed → `List<PhysicalKeyboardKey>`
The list of keys that are currently being pressed on the keyboard (or a keyboard-like device). The keys are listed in the order in which they were pressed, except for the modifier keys which may be listed out-of-order on some systems.

logicalKeysPressed → `Set<LogicalKeyboardKey>`
The set of logical keys that are currently being pressed on the keyboard. This set corresponds to the physicalKeysPressed list, and can be used to search for keys in a keyboard-layout-independent way.

isControlPressed → bool
True if the Ctrl key is currently being pressed.

isShiftPressed → bool
True if the Shift key is currently being pressed.

isAltPressed → bool
True if the Alt key is currently being pressed.

isNumLockOn → bool
True if Num Lock currently turned on.

isCapsLockOn → bool
True if Caps Lock currently turned on.

isScrollLockOn → bool
True if Scroll Lock currently turned on.

pauseKeyEvents ←→ bool
When true, delivery of key events will be suspended.

When this property is set to true, the system generates KeyUp events for all keys currently being held, as if the user has released them. Conversely, when this property is switched back to false, and the user was holding some keys at the time, the system will generate KeyDown events as if the user just started pressing those buttons.

## Methods
onKeyEvent(KeyEvent event)
Override this event handler if you want to get notified whenever any key on a keyboard is pressed, held, or released. The event will be one of KeyDownEvent, KeyRepeatEvent, or KeyUpEvent, respectively.