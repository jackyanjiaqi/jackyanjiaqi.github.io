# 键盘输入

本文档涵盖键盘输入的相关内容。

有关其他输入的文档，请参见：

- [手势输入](gesture_input.md)：鼠标和触控手势
- [其他输入](other_inputs.md)：手柄、游戏控制器等


## 简介

Flame 的键盘 API 依赖于  
[Flutter 的 Focus 小部件](https://api.flutter.dev/flutter/widgets/Focus-class.html)。

要自定义焦点行为，请参阅 [控制焦点](#controlling-focus)。

游戏可以通过两种方式响应按键输入：在游戏级别或组件级别。
对于每种方式，我们提供了一个可以添加到 `Game` 或 `Component` 类的 mixin。


### 在游戏级别接收键盘事件

要让 `Game` 子类响应按键输入，可以将其与 `KeyboardEvents` mixin 一起使用。

之后，就可以重写 `onKeyEvent` 方法。

此方法接收两个参数：  
第一个是触发回调的  
[`KeyEvent`](https://api.flutter.dev/flutter/services/KeyEvent-class.html)。  
第二个是当前按下的键集合  
[`LogicalKeyboardKey`](https://api.flutter.dev/flutter/services/LogicalKeyboardKey-class.html)。

返回值是  
[`KeyEventResult`](https://api.flutter.dev/flutter/widgets/KeyEventResult.html)。

- `KeyEventResult.handled`：告诉框架该按键事件已在 Flame 内部处理，不会传递到其他键盘处理小部件。
- `KeyEventResult.ignored`：告诉框架继续将事件传递给其他键盘处理小部件。如果没有处理程序解决事件，框架将触发 `SystemSoundType.alert`。
- `KeyEventResult.skipRemainingHandlers`：类似于 `.ignored`，但会跳过所有其他处理程序并直接播放警报声音。

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

要在组件中直接接收键盘事件，可以使用 `KeyboardHandler` mixin。

与 `TapCallbacks` 和 `DragCallbacks` 类似，`KeyboardHandler` 可以混入任何 `Component` 子类中。

`KeyboardHandler` 只能添加到与 `HasKeyboardHandlerComponents` 混合的游戏中。

> ⚠️ 注意：如果使用了 `HasKeyboardHandlerComponents`，必须从游戏的 mixin 列表中移除 `KeyboardEvents`，以避免冲突。

应用 `KeyboardHandler` 后，可以重写 `onKeyEvent` 方法。

此方法接收两个参数：  
第一个是触发回调的  
[`KeyEvent`](https://api.flutter.dev/flutter/services/KeyEvent-class.html)。  
第二个是当前按下的键集合  
[`LogicalKeyboardKey`](https://api.flutter.dev/flutter/services/LogicalKeyboardKey-class.html)。

返回值应为 `true` 以允许事件继续传播到其他组件。如果不希望其他组件接收该事件，返回 `false`。

Flame 还提供了一个默认实现 `KeyboardListenerComponent`，可用于处理键盘事件。像其他组件一样，它可以作为子组件添加到 `FlameGame` 或其他 `Component` 中：

例如，假设有一个 `PositionComponent`，其中包含用于在 X 和 Y 轴上移动的方法，可以使用以下代码将这些方法绑定到键盘事件：

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

在小部件级别，可以使用  
[`FocusNode`](https://api.flutter.dev/flutter/widgets/FocusNode-class.html) API 来控制游戏是否获得焦点。

`GameWidget` 提供了一个可选的 `focusNode` 参数，用于外部控制其焦点。

默认情况下，`GameWidget` 的 `autofocus` 设置为 `true`，即组件挂载后会自动获取焦点。要更改此行为，可将 `autofocus` 设置为 `false`。

更完整的示例请参见  
[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/keyboard_example.dart)。