# 拖动事件 (Drag Events)

**拖动事件** 发生在用户在设备屏幕上滑动手指，或者在按住鼠标按钮的同时移动鼠标时。

如果用户使用多根手指，则可能会同时触发多个拖动事件。  
Flame 能正确处理此类情况，您甚至可以通过拖动事件的 `pointerId` 属性来跟踪各个事件。

要使组件响应拖动事件，可以为其添加 `DragCallbacks` 混入。

- 此混入会为组件添加四个可重写的方法：`onDragStart`、`onDragUpdate`、`onDragEnd` 和 `onDragCancel`。  
  默认情况下，这些方法不执行任何操作，必须重写这些方法才能实现功能。
- 此外，组件必须实现 `containsLocalPoint()` 方法（`PositionComponent` 已实现此方法，大多数情况下无需额外操作），  
  通过此方法，Flame 能判断事件是否发生在组件内。

```dart
class MyComponent extends PositionComponent with DragCallbacks {
  MyComponent() : super(size: Vector2(180, 120));

   @override
   void onDragStart(DragStartEvent event) {
     // 响应拖动事件
   }
}
```


## 示例

在以下示例中，您可以使用拖动手势将类似星星的形状拖动到屏幕上，或者在品红色矩形内绘制曲线。

```{flutter-app}
:sources: ../flame/examples
:page: drag_events
:show: widget code
```


## 拖动事件解析


### onDragStart

这是拖动序列中的第一个事件。通常，该事件会被传递给触摸点处最上层的具有 `DragCallbacks` 的组件。  
不过，如果将标志 `event.continuePropagation` 设置为 `true`，事件可以继续传递给下方的组件。

与此事件关联的 `DragStartEvent` 对象包含事件触发点的坐标。  
这些坐标有多个坐标系版本：  
- `devicePosition` 是设备整体的坐标系，  
- `canvasPosition` 是游戏画布的坐标系，  
- `localPosition` 是组件的本地坐标系。

任何接收到 `onDragStart` 的组件都会接收到同一 `pointerId` 对应的后续 `onDragUpdate` 和 `onDragEnd` 事件。


### onDragUpdate

当用户在屏幕上拖动手指时，会连续触发此事件。如果用户的手指保持静止，则不会触发该事件。

默认情况下，此事件会传递给接收到相同 `pointerId` 的 `onDragStart` 的所有组件。  
如果触摸点仍位于组件内，则 `event.localPosition` 会返回该点在组件本地坐标系中的位置。  
如果用户将手指移出了组件，则 `event.localPosition` 会返回包含 NaN 的坐标，而 `event.renderingTrace` 也会为空。  
不过，此时的 `event.canvasPosition` 和 `event.devicePosition` 属性仍然有效。

此外，`DragUpdateEvent` 包含 `delta` 属性，表示手指自上次 `onDragUpdate` 或自 `onDragStart` 以来移动的距离。

事件的 `event.timestamp` 属性表示自拖动开始以来的时间，可以用于计算移动速度等。


### onDragEnd

当用户抬起手指停止拖动时，会触发此事件。  
此事件不包含位置相关信息。


### onDragCancel

此事件触发的确切语义尚不明确，因此默认实现会将其转换为 `onDragEnd` 事件。


## 混入 (Mixins)


### DragCallbacks

`DragCallbacks` 混入可以添加到任意 `Component` 中，从而使组件接收拖动事件。

该混入添加了 `onDragStart`、`onDragUpdate`、`onDragEnd` 和 `onDragCancel` 方法，默认情况下这些方法不执行任何操作，但可以通过重写它们实现具体功能。

另一个关键细节是，组件只能接收起始于组件内部的拖动事件，这由 `containsLocalPoint()` 方法决定。  
常用的 `PositionComponent` 类基于其 `size` 属性提供了 `containsLocalPoint()` 方法的实现。因此，如果您的组件继承自 `PositionComponent`，请确保正确设置其尺寸。  
如果您的组件直接继承自基础 `Component`，则必须手动实现 `containsLocalPoint()` 方法。

如果组件属于更大的层级结构，则只有当其所有父级组件正确实现 `containsLocalPoint` 时，它才能接收拖动事件。

```dart
class MyComponent extends PositionComponent with DragCallbacks {
  MyComponent({super.size});

  final _paint = Paint();
  bool _isDragged = false;

  @override
  void onDragStart(DragStartEvent event) => _isDragged = true;

  @override
  void onDragUpdate(DragUpdateEvent event) => position += event.delta;

  @override
  void onDragEnd(DragEndEvent event) => _isDragged = false;

  @override
  void render(Canvas canvas) {
    _paint.color = _isDragged ? Colors.red : Colors.white;
    canvas.drawRect(size.toRect(), _paint);
  }
}
```