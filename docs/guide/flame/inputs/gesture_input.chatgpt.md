# 手势输入 (Gesture Input)

以下是直接附加到游戏类的手势输入的文档。不过，大多数情况下，您可能更希望在组件上检测输入。例如，可以参考 [TapCallbacks](tap_events.md) 和 [DragCallbacks](drag_events.md) 的用法。

其他输入相关文档：

- [键盘输入](keyboard_input.md)：处理按键事件  
- [其他输入](other_inputs.md)：处理摇杆、游戏手柄等输入


## 简介

在 `package:flame/gestures.dart` 中，提供了一整套可以混入到游戏类实例中的 `mixin`，用于接收触摸输入事件。以下是这些 `mixin` 和对应方法的完整列表：


## 触摸和鼠标检测器

```text
- TapDetector
  - onTap
  - onTapCancel
  - onTapDown
  - onLongTapDown
  - onTapUp

- SecondaryTapDetector
  - onSecondaryTapDown
  - onSecondaryTapUp
  - onSecondaryTapCancel

- TertiaryTapDetector
  - onTertiaryTapDown
  - onTertiaryTapUp
  - onTertiaryTapCancel

- DoubleTapDetector
  - onDoubleTap

- LongPressDetector
  - onLongPress
  - onLongPressStart
  - onLongPressMoveUpdate
  - onLongPressUp
  - onLongPressEnd

- VerticalDragDetector
  - onVerticalDragDown
  - onVerticalDragStart
  - onVerticalDragUpdate
  - onVerticalDragEnd
  - onVerticalDragCancel

- HorizontalDragDetector
  - onHorizontalDragDown
  - onHorizontalDragStart
  - onHorizontalDragUpdate
  - onHorizontalDragEnd
  - onHorizontalDragCancel

- ForcePressDetector
  - onForcePressStart
  - onForcePressPeak
  - onForcePressUpdate
  - onForcePressEnd

- PanDetector
  - onPanDown
  - onPanStart
  - onPanUpdate
  - onPanEnd
  - onPanCancel

- ScaleDetector
  - onScaleStart
  - onScaleUpdate
  - onScaleEnd

- MultiTouchTapDetector
  - onTap
  - onTapCancel
  - onTapDown
  - onTapUp

- MultiTouchDragDetector
  - onReceiveDrag
```

仅鼠标事件：

```text
 - MouseMovementDetector
  - onMouseMove
 - ScrollDetector
  - onScroll
```

无法同时混用同类型的高级检测器 (`MultiTouch*`) 和基本检测器，因为高级检测器会在 *手势竞争区* 中获胜，而基本检测器将无法触发。例如，不能同时使用 `MultiTouchTapDetector` 和 `PanDetector`，否则后者将不会接收到任何事件（Flame 也会对此抛出断言错误）。

Flame 的手势 API 基于 Flutter 的手势组件，包括 [GestureDetector 组件](https://api.flutter.dev/flutter/widgets/GestureDetector-class.html)、  
[RawGestureDetector 组件](https://api.flutter.dev/flutter/widgets/RawGestureDetector-class.html) 和 [MouseRegion 组件](https://api.flutter.dev/flutter/widgets/MouseRegion-class.html)。  
可以阅读更多关于 Flutter 手势的内容 [这里](https://api.flutter.dev/flutter/gestures/gestures-library.html)。


## PanDetector 和 ScaleDetector

如果同时添加了 `PanDetector` 和 `ScaleDetector`，Flutter 会抛出一条看似难以理解的断言：

```{note}
同时存在平移手势检测器和缩放手势检测器是多余的；缩放是平移的超集。

只需使用缩放手势检测器即可。
```

这看似奇怪，但实际上 `onScaleUpdate` 不仅在需要调整缩放时触发，还会在所有平移/拖动事件中触发。因此，如果需要同时处理这两种检测器，则必须在 `onScaleUpdate`（加上 `onScaleStart` 和 `onScaleEnd`）中处理两者的逻辑。

例如，如果希望在平移事件中移动摄像机，在缩放事件中调整缩放，可以这样实现：

```dart
  late double startZoom;

  @override
  void onScaleStart(_) {
    startZoom = camera.zoom;
  }

  @override
  void onScaleUpdate(ScaleUpdateInfo info) {
    final currentScale = info.scale.global;
    if (!currentScale.isIdentity()) {
      camera.zoom = startZoom * currentScale.y;
    } else {
      camera.translateBy(-info.delta.global);
      camera.snap();
    }
  }
```

在以上示例中，平移事件使用 `info.delta` 处理，而缩放事件使用 `info.scale` 处理，尽管它们理论上都来自底层的缩放事件。

您可以在 [缩放示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/camera_and_viewport/zoom_example.dart) 中查看更多内容。


## 鼠标光标

可以更改 `GameWidget` 区域显示的鼠标光标。以下代码可以在 `Game` 类中实现：

```dart
mouseCursor.value = SystemMouseCursors.move;
```

也可以在初始化 `GameWidget` 时直接设置自定义光标：

```dart
GameWidget(
  game: MouseCursorGame(),
  mouseCursor: SystemMouseCursors.move,
);
```


## 事件坐标系

对于包含位置的事件（如 `Tap*` 或 `Drag`），`eventPosition` 属性包括两个字段：`global` 和 `widget`。以下是它们的简要说明：


### global

事件在整个屏幕上的位置，与 Flutter 原生事件的 `globalPosition` 相同。


### widget

事件相对于 `GameWidget` 的位置和尺寸的坐标，与 Flutter 原生事件的 `localPosition` 相同。


## 示例

```dart
class MyGame extends FlameGame with TapDetector {
  // 省略其他方法

  @override
  bool onTapDown(TapDownInfo info) {
    print("玩家点击位置 ${info.eventPosition.widget}");
    return true;
  }

  @override
  bool onTapUp(TapUpInfo info) {
    print("玩家抬起点击位置 ${info.eventPosition.widget}");
    return true;
  }
}
```

更多完整示例可以查看 [这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/input/)。


### GestureHitboxes

`GestureHitboxes` 混入用于更准确地识别组件上的手势。例如，如果您有一个相当圆的 `SpriteComponent` 岩石，  
不希望在图像的角落（岩石未显示）注册输入，因为 `PositionComponent` 默认是矩形的。  
在这种情况下，可以使用 `GestureHitboxes` 混入定义更准确的圆形、多边形（或其他形状）输入区域，以便事件只在组件的指定区域内注册。

可以像下面的 `Collidable` 示例一样，将新的检测区域添加到具有 `GestureHitboxes` 混入的组件中。

有关如何定义检测区域的更多信息，请参阅 [碰撞检测](../collision_detection.md#shapehitbox) 文档的相关部分。

您可以在 [示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/gesture_hitboxes_example.dart) 中查看具体用法。