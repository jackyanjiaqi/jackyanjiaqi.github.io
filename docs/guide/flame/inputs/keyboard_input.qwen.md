# 键盘输入

本部分包括键盘输入的文档。

关于其他输入的文档，请参阅：

- [手势输入](gesture_input.md): 适用于鼠标和触摸指针手势
- [其他输入](other_inputs.md): 适用于摇杆、游戏手柄等


## 简介

Flame 中的键盘 API 基于 Flutter 的 [Focus 小部件](https://api.flutter.dev/flutter/widgets/Focus-class.html)。

要自定义焦点行为，请参阅[控制焦点](#controlling-focus)。

游戏可以通过两种方式响应按键：在游戏级别和组件级别。
对于每种情况，我们都有一个可以添加到 `Game` 或 `Component` 类的 mixin。


### 在游戏级别接收键盘事件

为了让 `Game` 子类对按键敏感，请将其与 `KeyboardEvents` 混合。

之后，可以重写 `onKeyEvent` 方法。

该方法接收两个参数：首先是触发回调的 [`KeyEvent`](https://api.flutter.dev/flutter/services/KeyEvent-class.html)；其次是当前按下的 [`LogicalKeyboardKey`](https://api.flutter.dev/flutter/services/LogicalKeyboardKey-class.html) 集合。

返回值是 [`KeyEventResult`](https://api.flutter.dev/flutter/widgets/KeyEventResult.html)。

`KeyEventResult.handled` 将告诉框架该按键事件在 Flame 内部已解决，并跳过 `GameWidget` 以外的任何其他键盘处理小部件。

`KeyEventResult.ignored` 将告诉框架继续测试此事件，以查看在 `GameWidget` 之外的任何其他键盘处理小部件中是否可以解决。如果没有任何处理程序解决该事件，框架将触发 `SystemSoundType.alert`。

`KeyEventResult.skipRemainingHandlers` 类似于 `.ignored`，除了它会跳过任何其他处理程序并直接播放警报声音。

最小示例：

```dart
class MyGame extends FlameGame with KeyboardEvents {
  // ...
  @override
  KeyEventResult onKeyEvent(
    KeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    final isKeyDown = event is KeyDownEvent;

    final isSpace = keysPressed.contains(LogicalKeyboardKey.space);

    if (isSpace && isKeyDown) {
      if (keysPressed.contains(LogicalKeyboardKey.altLeft) ||
          keysPressed.contains(LogicalKeyboardKey.altRight)) {
        this.shootHarder();
      } else {
        this.shoot();
      }
      return KeyEventResult.handled;
    }
    return KeyEventResult.ignored;
  }
}
```


### 在组件级别接收键盘事件

为了直接在组件中接收键盘事件，可以使用 `KeyboardHandler` mixin。

与 `TapCallbacks` 和 `DragCallbacks` 类似，`KeyboardHandler` 可以混合到 `Component` 的任何子类中。

`KeyboardHandlers` 必须仅添加到与 `HasKeyboardHandlerComponents` 混合的游戏。

> ⚠️ 注意：如果使用了 `HasKeyboardHandlerComponents`，则必须从游戏 mixin 列表中移除 `KeyboardEvents` 以避免冲突。

应用 `KeyboardHandler` 后，可以重写 `onKeyEvent` 方法。

该方法接收两个参数。首先是触发回调的 [`KeyEvent`](https://api.flutter.dev/flutter/services/KeyEvent-class.html)；其次是当前按下的 [`LogicalKeyboardKey`](https://api.flutter.dev/flutter/services/LogicalKeyboardKey-class.html) 集合。

返回值应为 `true` 以允许按键事件在其他组件之间持续传播。要阻止任何其他组件接收该事件，返回 `false`。

Flame 还提供了一个默认实现 `KeyboardListenerComponent`，可用于处理键盘事件。与其他任何组件一样，它可以作为子组件添加到 `FlameGame` 或另一个 `Component` 中：

例如，假设有一个具有沿 X 和 Y 轴移动的方法的 `PositionComponent`，则可以使用以下代码将这些方法绑定到按键事件：

```dart
add(
  KeyboardListenerComponent(
    keyUp: {
      LogicalKeyboardKey.keyA: (keysPressed) { ... },
      LogicalKeyboardKey.keyD: (keysPressed) { ... },
      LogicalKeyboardKey.keyW: (keysPressed) { ... },
      LogicalKeyboardKey.keyS: (keysPressed) { ... },
    },
    keyDown: {
      LogicalKeyboardKey.keyA: (keysPressed) { ... },
      LogicalKeyboardKey.keyD: (keysPressed) { ... },
      LogicalKeyboardKey.keyW: (keysPressed) { ... },
      LogicalKeyboardKey.keyS: (keysPressed) { ... },
    },
  ),
);
```


### 控制焦点

在小部件级别，可以使用 [`FocusNode`](https://api.flutter.dev/flutter/widgets/FocusNode-class.html) API 来控制游戏是否获得焦点。

`GameWidget` 具有一个可选的 `focusNode` 参数，允许外部控制其焦点。

默认情况下，`GameWidget` 的 `autofocus` 设置为 true，这意味着一旦挂载，它将获得焦点。要重写此行为，请将 `autofocus` 设置为 false。

有关更完整的示例，请参阅[此处](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/keyboard_example.dart)。