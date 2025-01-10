# 相机与世界

[教学笔记: 加群可访问](https://immvpc32u2.feishu.cn/docx/QjHbd9ikvo9f87xr1EgcLMrdnte?from=from_copylink)

以下是一个简单游戏结构的示例：

```text
FlameGame
├── World
│   ├── Player
│   └── Enemy
└── CameraComponent
    ├── Viewfinder
    │   ├── HudButton
    │   └── FpsTextComponent
    └── Viewport
```

为了理解 `CameraComponent` 的工作原理，可以想象你的游戏世界是一个独立存在的实体，独立于你的应用程序之外。想象你的游戏只是一扇窗户，通过这扇窗户你可以看到那个世界。你可以随时关闭这扇窗户，游戏世界依然存在。或者相反，你可以同时打开多扇窗户来观察同一个世界（或不同的世界）。

基于这个概念，我们可以深入理解 `CameraComponent` 的工作原理。

首先，有一个 [World](#world) 类，它包含游戏世界内的所有组件。`World` 组件可以被挂载在任何地方，例如在你的游戏类的根部，就像内置的 `World` 那样。

然后是 [CameraComponent](#cameracomponent) 类，它“观察”[World](#world)。`CameraComponent` 包含 [Viewport](#viewport) 和 [Viewfinder](#viewfinder)，提供了在屏幕上任意位置渲染世界的灵活性，并控制观察位置和角度。此外，`CameraComponent` 还包含一个 [backdrop](#backdrop) 组件，用于在世界下方静态渲染内容。

---

## World

此组件用于容纳构成游戏世界的所有其他组件。`World` 类的主要特性是它并不通过传统方式渲染，而是通过一个或多个 [CameraComponent](#cameracomponent) 来“观察”世界。在 `FlameGame` 类中，默认有一个 `World`，名为 `world`，它与默认的 `CameraComponent`（名为 `camera`）配对。

一个游戏可以包含多个 `World` 实例，可以同时渲染或分时渲染。例如，如果你有两个世界 A 和 B，并且只有一个相机，那么将相机的目标从 A 切换到 B 会即时切换视图，而无需卸载 A 再加载 B。

与大多数 `Component` 一样，可以通过构造函数中的 `children` 参数，或者使用 `add` 和 `addAll` 方法向 `World` 添加子组件。

对于许多游戏，你可能需要扩展 `World` 并在其中创建逻辑，例如：

```dart
void main() {
  runApp(GameWidget(FlameGame(world: MyWorld())));
}

class MyWorld extends World {
  @override
  Future<void> onLoad() async {
    // 加载此世界需要的所有资源，并添加组件等
  }
}
```

---

## CameraComponent

这是一个用于渲染 `World` 的组件。多个相机可以同时观察同一个世界。

在 `FlameGame` 类中，默认有一个 `CameraComponent`，名为 `camera`，它与默认的 `world` 配对，因此如果你的游戏不需要自定义相机，你不需要创建或添加自己的 `CameraComponent`。

`CameraComponent` 内有两个其他组件：[Viewport](#viewport) 和 [Viewfinder](#viewfinder)，它们始终是相机的子组件。

通过 `FlameGame` 类的构造函数中的 `camera` 字段，你可以设置默认相机的类型，例如以下具有[固定分辨率](#cameracomponent-with-fixed-resolution)的相机：

```dart
void main() {
  runApp(
    GameWidget(
      FlameGame(
        camera: CameraComponent.withFixedResolution(
          width: 800,
          height: 600,
        ),
        world: MyWorld(),
      ),
    ),
  );
}
```

`CameraComponent` 还提供一个静态属性 `CameraComponent.currentCamera`，返回当前执行渲染的相机对象。这通常用于某些高级用例，例如根据相机设置决定是否渲染某些组件。

---

### 固定分辨率的 CameraComponent

此命名构造函数允许你假设用户的设备具有固定的分辨率，例如：

```dart
final camera = CameraComponent.withFixedResolution(
  world: myWorldComponent,
  width: 800,
  height: 600,
);
```

这将创建一个相机，其视口位于屏幕中央，占用尽可能多的空间，同时保持 4:3（800x600）的宽高比，并显示大小为 800 x 600 的游戏世界区域。

“固定分辨率”易于处理，但如果用户设备的宽高比与所选分辨率不同，则会浪费屏幕空间。

---

## Viewport

`Viewport` 是观察 `World` 的窗口。这个窗口有一定的大小、形状和屏幕上的位置。你可以选择多种视口类型，或者实现自己的视口。

`Viewport` 是一个组件，这意味着你可以向其中添加其他组件。这些子组件会受到视口位置的影响，但不会受到其裁剪区域的影响。因此，如果视口是“窗口”，那么其子组件就是“窗口前”可以看到的内容。

将元素添加到 `Viewport` 是实现“HUD”组件的一种便捷方式。

以下视口类型可用：

- `MaxViewport`（默认）——视口扩展到游戏允许的最大大小，即等于游戏画布的大小。
- `FixedResolutionViewport`——保持固定的分辨率和宽高比，宽高比不匹配时用黑边填充。
- `FixedSizeViewport`——简单的固定大小矩形视口。
- `FixedAspectRatioViewport`——保持宽高比的矩形视口。
- `CircularViewport`——固定大小的圆形视口。

如果向 `Viewport` 添加子组件，它们会以静态 HUD 的形式显示在世界前面。

---

## Viewfinder

`Viewfinder` 负责确定当前观察的游戏世界位置，同时控制缩放级别和视图旋转角度。

`Viewfinder` 的 `anchor` 属性允许你指定视口内作为相机“逻辑中心”的点。例如，在横向滚动的动作游戏中，相机通常聚焦在主角身上，但主角可能显示在屏幕左下角附近，而不是屏幕中央。

向 `Viewfinder` 添加子组件时，这些组件会显示在世界的前面，但在视口后面，并与世界应用相同的变换，因此它们不是静态的。

你还可以向 `Viewfinder` 添加行为组件，例如[特效](effects.md)或控制器。例如，添加一个 `ScaleEffect` 可以实现平滑的缩放效果。

---

## Backdrop

如果要在世界后方添加静态组件，可以将其添加到 `backdrop` 组件中，或者替换 `backdrop` 组件。例如，添加一个静态 `ParallaxComponent`，显示在拥有移动玩家的世界后面：

```dart
camera.backdrop.add(MyStaticBackground());
```

或

```dart
camera.backdrop = MyStaticBackground();
```

---

## 相机控制

可以通过以下几种方式在运行时修改相机的设置：

1. 使用相机函数，例如 `follow()`、`moveBy()` 和 `moveTo()`。
   这些函数底层使用与方法 (2) 相同的效果/行为。

2. 对相机的 `Viewfinder` 或 `Viewport` 应用效果和/或行为。
   效果和行为是专门用于随时间修改组件某些属性的特殊组件。

3. 手动操作。你可以覆盖 `CameraComponent.update()` 方法（或视口或取景器上的同名方法），并在其中根据需要更改取景器的位置或缩放级别。这种方法可能适用于某些情况，但通常不推荐。

`CameraComponent` 提供了一些方法用于控制其行为：

- `follow()` 使相机跟随指定目标。可以选择限制相机移动的最大速度，或者仅允许水平/垂直移动。

- `stop()` 取消之前的跟随操作并停止相机在当前位置。

- `moveBy()` 将相机按指定偏移移动。如果相机已经在跟随其他组件或移动中，这些行为将自动取消。

- `moveTo()` 将相机移动到世界地图上的指定点。如果相机已经在跟随其他组件或移动到其他点，这些行为将自动取消。

- `setBounds()` 限制相机的移动范围。这些范围由一个 `Shape` 定义，通常是矩形，但也可以是其他形状。

---

### visibleWorldRect

相机提供了属性 `visibleWorldRect`，描述了通过相机当前可见的世界区域。此区域可用于避免渲染视图外的组件，或减少更新远离玩家的对象的频率。

`visibleWorldRect` 是一个缓存属性，会在相机移动或视口大小改变时自动更新。

---

### canSee

`CameraComponent` 有一个方法 `canSee`，可以用来检查某个组件是否在相机视野中。这对于剔除视图外的组件非常有用。

```dart
if (!camera.canSee(component)) {
   component.removeFromParent(); // 剔除组件
}
```