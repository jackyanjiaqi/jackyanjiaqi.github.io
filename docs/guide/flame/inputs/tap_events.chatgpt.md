# 点击事件 (Tap Events)

```{note}
本文档描述了新的事件 API。旧的（传统）方法仍然受支持，可参考 [](gesture_input.md)。
```

**点击事件** 是与 Flame 游戏交互的最基本方式之一。这些事件在用户用手指触碰屏幕、用鼠标点击或使用触控笔点按时触发。  
点击可以是“长按”，但在手势过程中手指不能移动。因此，触碰屏幕后移动手指再松开并不算点击，而是拖拽。同样，鼠标移动时点击也会被注册为拖拽。

多个点击事件可以同时发生，尤其是在用户使用多指操作的情况下。Flame 会正确处理这些情况，您甚至可以通过事件的 `pointerId` 属性来跟踪它们。

要使组件对点击事件作出响应，可以添加 `TapCallbacks` 混入。

- 此混入会为组件添加四个可覆盖的方法：`onTapDown`、`onTapUp`、`onTapCancel` 和 `onLongTapDown`。默认情况下，这些方法什么都不做，需要覆盖它们以实现功能。
- 此外，组件必须实现 `containsLocalPoint()` 方法（`PositionComponent` 已实现此方法，因此大多数情况下无需额外操作）-- 此方法允许 Flame 判断事件是否发生在组件内。

示例：

```dart
class MyComponent extends PositionComponent with TapCallbacks {
  MyComponent() : super(size: Vector2(80, 60));

  @override
  void onTapUp(TapUpEvent event) {
    // 响应点击事件
  }
}
```


## 点击事件解析

### onTapDown

每个点击以“按下”事件开始，您可以通过 `void onTapDown(TapDownEvent)` 处理器接收该事件。  
事件将传递到触碰点第一个带有 `TapCallbacks` 混入的组件。通常，事件会停止传播。但您可以通过将 `event.continuePropagation` 设置为 true 强制将事件传递给底层组件。

`TapDownEvent` 对象包含事件的相关信息。例如，`event.localPosition` 包含事件在当前组件本地坐标系统中的坐标，而 `event.canvasPosition` 是游戏画布坐标系统中的位置。

所有收到 `onTapDown` 事件的组件最终会收到同一 `pointerId` 的 `onTapUp` 或 `onTapCancel`。


### onLongTapDown

如果用户长时间按住屏幕（时间由 `MultiTapDispatcher` 的 `.longTapDelay` 属性配置），将触发“长按”事件。  
此事件调用 `void onLongTapDown(TapDownEvent)` 处理器，针对先前接收到 `onTapDown` 事件的组件。

默认情况下，`.longTapDelay` 设置为 300 毫秒，可以通过设置 `TapConfig.longTapDelay` 更改此值，以满足特定的无障碍需求。


### onTapUp

此事件表示点击序列成功完成。它只会传递给先前收到相同 `pointerId` 的 `onTapDown` 事件的组件。

`TapUpEvent` 对象包含有关事件的信息，包括事件的坐标（即用户松开手指前触碰屏幕的位置）和事件的 `pointerId`。

请注意，点击抬起事件的设备坐标与相应的点击按下事件的设备坐标相同（或非常接近）。但本地坐标可能不同，特别是当组件在点击过程中移动时。本地坐标可能会有明显差异。

在极端情况下，当组件从触碰点移动走时，不会生成 `onTapUp` 事件，而是生成 `onTapCancel`。需要注意的是，在这种情况下，`onTapCancel` 是在用户松开或移动手指时生成的，而不是在组件离开触碰点时生成的。


### onTapCancel

当点击失败时触发此事件。最常见的情况是用户移动了手指，将手势从“点击”转换为“拖拽”。  
也可能发生在被点击的组件移动到用户手指之外，或者其他组件覆盖了游戏组件，甚至设备关闭等情况。

`TapCancelEvent` 对象仅包含之前 `TapDownEvent` 的 `pointerId`，不包含位置数据。


### 示例

通过以下示例了解点击事件的实际效果。

中间蓝色矩形是包含 `TapCallbacks` 混入的组件。在该组件上点击会在触碰点生成圆圈。  
具体来说，`onTapDown` 事件开始绘制圆圈。圆圈的线条粗细与点击持续时间成比例；在 `onTapUp` 后，线条粗细不再增长。当触发 `onLongTapDown` 时，会出现一道细白线。最后，移动手指触发 `onTapCancel` 时，圆圈会收缩并消失。

```{flutter-app}
:sources: ../flame/examples
:page: tap_events
:show: widget code
```


## 混入 (Mixins)

以下部分更详细地描述了处理点击事件所需的几个混入。


### TapCallbacks

`TapCallbacks` 混入可添加到任何 `Component` 上，使该组件可以接收点击事件。

此混入为组件添加了 `onTapDown`、`onLongTapDown`、`onTapUp` 和 `onTapCancel` 方法，这些方法默认不执行任何操作，但可以覆盖它们以实现实际功能。  
无需覆盖所有方法。例如，您可以只覆盖 `onTapUp` 来响应“真实”点击。

关键点是，组件只能接收发生在组件范围内的点击事件，这由 `containsLocalPoint()` 函数决定。常用的 `PositionComponent` 类通过其 `size` 属性提供了一个基于大小的实现。因此，如果您的组件继承自 `PositionComponent`，请确保正确设置其大小。如果您的组件继承自基本的 `Component`，则必须手动实现 `containsLocalPoint()` 方法。

```dart
class MyComponent extends Component with TapCallbacks {
  final _rect = const Rect.fromLTWH(0, 0, 100, 100);
  final _paint = Paint();
  bool _isPressed = false;

  @override
  bool containsLocalPoint(Vector2 point) => _rect.contains(point.toOffset());

  @override
  void onTapDown(TapDownEvent event) => _isPressed = true;

  @override
  void onTapUp(TapUpEvent event) => _isPressed = false;

  @override
  void onTapCancel(TapCancelEvent event) => _isPressed = false;

  @override
  void render(Canvas canvas) {
    _paint.color = _isPressed ? Colors.red : Colors.white;
    canvas.drawRect(_rect, _paint);
  }
}
```


### DoubleTapCallbacks

Flame 还提供了 `DoubleTapCallbacks` 混入，用于接收双击事件。  
要在组件中接收双击事件，请将 `DoubleTapCallbacks` 混入到您的 `PositionComponent` 中。

```dart
class MyComponent extends PositionComponent with DoubleTapCallbacks {
  @override
  void onDoubleTapUp(DoubleTapEvent event) {
    // 执行双击后的操作
  }

  @override
  void onDoubleTapCancel(DoubleTapCancelEvent event) {
    // 双击取消时执行操作
  }

  @override
  void onDoubleTapDown(DoubleTapDownEvent event) {
    // 双击开始时执行操作
  }
}
```


## 迁移

如果您的现有游戏使用了 `Tappable`/`Draggable` 混入，则可以按以下步骤过渡到本文档描述的新 API：

- 将所有使用这些混入的组件替换为 `TapCallbacks`/`DragCallbacks`。
- 需要调整以下方法以适配新 API：
  - 形参 `(int pointerId, TapDownDetails details)` 替换为单一事件对象 `TapDownEvent event`。
  - 不再有返回值。如果需要使组件透传点击到下层组件，请在 `onTapDown` 事件中将 `event.continuePropagation` 设置为 true。其他事件会自动透传。
  - 如果组件需要知道触碰点的坐标，请使用 `event.localPosition`，而非手动计算。此外，`event.canvasPosition` 和 `event.devicePosition` 属性也可用。
  - 如果组件附属于自定义父组件，请确保父组件也正确实现了 `containsLocalPoint()`。