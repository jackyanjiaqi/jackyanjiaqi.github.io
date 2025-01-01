# HardwareKeyboardDetector（硬件键盘检测器）

`HardwareKeyboardDetector` 是一个组件，允许你直接监听来自硬件键盘的事件，而无需通过 Flutter 的 `Focus` 小部件。它不会监听任何屏幕键盘（软件键盘）的事件。

此组件可以放置在组件树的任何位置。例如，它可以附加在 `Game` 类的根级别，也可以附加到玩家控制的角色上。同一个游戏中可以同时存在多个 `HardwareKeyboardDetector` 组件，所有这些组件都会接收到键盘事件。

组件提供了 `onKeyEvent` 事件处理器，可以通过重写或在构造函数中传递来使用。当用户按下、释放或长按键盘上的任何按键时，都会触发该事件处理器。

键盘事件流将由 Flutter 进行规范化处理，即对于每个 `KeyDownEvent` 都会有相应的 `KeyUpEvent`，中间可能包含一些 `KeyRepeatEvent`。根据平台的不同，一些事件可能是“合成的”，即由框架人为生成，以确保事件顺序正确。有关更多详细信息，请参阅 Flutter 的 [HardwareKeyboard](https://api.flutter.dev/flutter/services/HardwareKeyboard-class.html)。

当该组件被添加到或移除出组件树时，也会有类似的规范化保证。如果用户在 `HardwareKeyboardDetector` 挂载时按住了某些按键，那么会触发人工生成的 `KeyDownEvent`；如果用户在组件移除时仍在按住按键，则会生成 `KeyUpEvent`。

可以使用 `pauseKeyEvents` 属性暂时停止或恢复 `onKeyEvent` 的事件传递。当组件从组件树中移除时，事件传递也会停止。

---

## 构造函数

```dart
HardwareKeyboardDetector({void Function(KeyEvent)? onKeyEvent})
```

---

## 属性

### `physicalKeysPressed` → `List<PhysicalKeyboardKey>`
当前被按下的键的物理键列表（或键盘类设备）。这些按键按被按下的顺序列出，但某些系统上的修饰键可能会乱序。

### `logicalKeysPressed` → `Set<LogicalKeyboardKey>`
当前被按下的逻辑键集合。该集合对应于 `physicalKeysPressed` 列表，可用于以键盘布局无关的方式搜索按键。

### `isControlPressed` → `bool`
如果当前按下了 `Ctrl` 键，则返回 `true`。

### `isShiftPressed` → `bool`
如果当前按下了 `Shift` 键，则返回 `true`。

### `isAltPressed` → `bool`
如果当前按下了 `Alt` 键，则返回 `true`。

### `isNumLockOn` → `bool`
如果当前开启了 `Num Lock`，则返回 `true`。

### `isCapsLockOn` → `bool`
如果当前开启了 `Caps Lock`，则返回 `true`。

### `isScrollLockOn` → `bool`
如果当前开启了 `Scroll Lock`，则返回 `true`。

### `pauseKeyEvents` ←→ `bool`
如果为 `true`，键盘事件的传递将被暂停。

当该属性设置为 `true` 时，系统会为所有正在按住的按键生成 `KeyUp` 事件，就像用户释放了这些按键一样。相反，当属性重新设置为 `false` 时，如果用户仍在按住某些按键，系统会生成 `KeyDown` 事件，就像用户刚开始按下这些按键一样。

---

## 方法

### `onKeyEvent(KeyEvent event)`
当键盘上的任何按键被按下、长按或释放时，可以重写此事件处理器以接收通知。事件类型可能是 `KeyDownEvent`、`KeyRepeatEvent` 或 `KeyUpEvent`。