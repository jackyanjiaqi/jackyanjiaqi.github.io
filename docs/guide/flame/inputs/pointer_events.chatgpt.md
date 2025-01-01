# 指针事件 (Pointer Events)

```{note}
本文档描述了新的事件 API。旧的（传统）方法仍然受支持，可参考 [](gesture_input.md)。
```

**指针事件** 是 Flutter 中通用的“鼠标移动”类事件（适用于桌面或网页）。  

如果您希望在组件或游戏中与鼠标移动事件交互，可以使用 `PointerMoveCallbacks` 混入。

例如：

```dart
class MyComponent extends PositionComponent with PointerMoveCallbacks {
  MyComponent() : super(size: Vector2(80, 60));

  @override
  void onPointerMove(PointerMoveEvent event) {
    // 在鼠标移动时响应，例如更新坐标
  }
}
```

该混入会为组件添加两个可覆盖的方法：

- `onPointerMove`：当鼠标在组件内移动时调用  
- `onPointerMoveStop`：当鼠标离开组件后首次调用  

默认情况下，这些方法什么都不做，您需要覆盖它们以执行所需功能。

此外，组件必须实现 `containsLocalPoint()` 方法（此方法已在 `PositionComponent` 中实现，因此大多数情况下无需额外操作）-- 该方法允许 Flame 确定事件是否发生在组件内。

请注意，只有发生在组件内的鼠标事件会被传递。然而，当鼠标离开组件时，`onPointerMoveStop` 将在首次鼠标移动时触发，您可以在此方法中处理退出条件。


## HoverCallbacks

如果您希望明确知道组件是否被悬停（hovered），或者希望钩入悬停进入和退出事件，可以使用更专门的混入 `HoverCallbacks`。

例如：

```dart
class MyComponent extends PositionComponent with HoverCallbacks {

  MyComponent() : super(size: Vector2(80, 60));

  @override
  void update(double dt) {
    // 使用 `isHovered` 判断组件是否被悬停
  }

  @override
  void onHoverEnter() {
    // 当鼠标进入组件时执行某些操作
  }

  @override
  void onHoverExit() {
    // 当鼠标离开组件时执行某些操作
  }
}
```

您仍然可以监听原始的 `onPointerMove` 方法以实现额外功能，只需确保调用 `super` 版本以启用 `HoverCallbacks` 的行为。


### 示例

以下示例展示了指针悬停事件的实际效果。

```{flutter-app}
:sources: ../flame/examples
:page: pointer_events
:show: widget code
```