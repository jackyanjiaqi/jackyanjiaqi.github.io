 # 相机与世界

[教学笔记: 加群可访问](https://immvpc32u2.feishu.cn/docx/QjHbd9ikvo9f87xr1EgcLMrdnte?from=from_copylink)

一个简单的游戏结构示例：

```text
FlameGame
├── 世界
│   ├── 玩家
│   └── 敌人
└── CameraComponent
    ├── Viewfinder
    │   ├── HudButton
    │   └── FpsTextComponent
    └── Viewport
```

为了理解 `CameraComponent` 的工作原理，想象你的游戏世界是一个独立于应用程序存在的实体。想象你的游戏只是一个窗口，通过它可以看这个世界。你可以随时关闭这个窗口，但游戏世界仍然存在。或者，相反地，你可以打开多个窗口，它们都看着相同的世界（或不同的世界）。

有了这种思维方式，我们现在可以理解 `CameraComponent` 的工作原理了。

首先，有一个 [World](#world) 类，它包含了游戏中所有的组件。`World` 组件可以安装在游戏类的根部，就像内置的 `World` 一样。

然后是一个“看向”[World](#world) 的 [CameraComponent](#cameracomponent) 类。`CameraComponent` 有一个 [Viewport](#viewport) 和一个 [Viewfinder](#viewfinder) 在里面，允许在世界屏幕上的任何位置渲染世界，并控制观看位置和角度。`CameraComponent` 还包含一个 [backdrop](#backdrop) 组件，它静态地呈现在世界下方。

## 世界

这个组件应该用来托管游戏中所有的组件，这些组件构成了你的游戏世界。`World` 类的主要属性是它不通过传统方式渲染——而是由一个或多个 [CameraComponent](#cameracomponent) 渲染以“看向”世界。在 `FlameGame` 类中有一个名为 `world` 的 `World`，它是默认添加的，并与默认的 `CameraComponent` 称为 `camera` 配对。

一个游戏可以有多个 `World` 实例，它们可以在同一时间或不同时间渲染。例如，如果你有两个世界 A 和 B 和一个单一的相机，那么切换相机的目标从 A 到 B 会立即切换到世界 B 的视图，而不需要卸载 A 然后再挂载 B。

就像大多数 `Component` 一样，可以通过构造函数中的 `children` 参数或使用 `add` 和 `addAll` 方法向 `World` 添加子组件。

对于许多游戏，你希望扩展世界并在其中创建逻辑，这样的游戏结构可能如下所示：

```dart
void main() {
  runApp(GameWidget(FlameGame(world: MyWorld())));
}

class MyWorld extends World {
  @override
  Future<void> onLoad() async {
    // Load all the assets that are needed in this world
    // and add components etc.
  }
}
```

## CameraComponent

这是一个“看向”`World` 的组件。多个相机可以同时观察相同的世界。

在 `FlameGame` 类中有一个默认的 `CameraComponent` 称为 `camera`，它与默认的 `world` 配对，所以如果你不需要创建或添加自己的 `CameraComponent`，则不必这样做。

一个 `CameraComponent` 有两个其他组件：一个 [Viewport](#viewport) 和一个 [Viewfinder](#viewfinder)，这些组件总是相机的孩子。

`FlameGame` 类在其构造函数中有一个 `camera` 字段，所以你可以设置你想要的默认相机的类型，例如具有固定分辨率的相机：

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

还有一个静态属性 `CameraComponent.currentCamera`，它返回当前执行渲染的相机对象。这在某些高级用例中是必需的，例如某些组件可能会决定在相机视口之外时不渲染自己及其子组件。

### 具有固定分辨率的 CameraComponent

这个命名构造函数允许你假装用户的设备具有你所选择的固定分辨率。例如：

```dart
final camera = CameraComponent.withFixedResolution(
  world: myWorldComponent,
  width: 800,
  height: 600,
);
```

这将创建一个视口居中的相机，尽可能地占据屏幕空间，同时保持4:3（800x600）的宽高比，并在游戏中显示一个大小为800 x 600的世界区域。

具有固定分辨率非常简单易用，但如果用户的设备没有与你选择的尺寸相同的纵横比，它将不会充分利用用户可用的屏幕空间。

## Viewport

`Viewport` 是一个透过它的 `World` 被看到的窗口。这个窗口有特定的大小、形状和位置。有多种类型的视口可用，你可以随时实现你自己的视口。

`Viewport` 是一个组件，这意味着你可以向它添加其他组件。这些子组件会受到视口的位移影响，但不会受其裁剪蒙版的影响。因此，如果一个视口是“看向”游戏世界的窗口，那么它的孩子就是你能放在窗口上面的东西。

将元素添加到视口中是一种方便的方法来实现“HUD”组件。以下视口可用：

- `MaxViewport`（默认）——这个视口扩展到游戏中允许的最大尺寸，即它将与游戏的画布大小相等。
- `FixedResolutionViewport`——保持分辨率和纵横比固定，如果不匹配则有黑条。
- `FixedSizeViewport`——一个具有预定义大小的简单矩形视口。
- `FixedAspectRatioViewport`——一个扩展以适应游戏画布的矩形视口，但保留其纵横比。
- `CircularViewport`——一个圆形形状的视口，固定大小。

如果你向 `Viewport` 添加子组件，它们将作为静态 HUD 出现在世界前面。

## Viewfinder

这是相机的一部分，负责知道我们在底层游戏世界的哪个位置进行查看。`Viewfinder` 还控制缩放级别和视角的旋转角度。

`Viewfinder` 的 `anchor` 属性允许你指定视口中哪个点作为相机的“逻辑中心”。例如，在侧向滚动动作游戏中，通常将相机集中在主角上，这个主角并不在屏幕中心，而是在更靠近左下角的位置。这种偏心的位置就是相机的“逻辑中心”，由 `Viewfinder` 的 `anchor` 控制。

如果你向 `Viewfinder` 添加子组件，它们将出现在世界前面，但位于视口和世界之后，与世界的变换相同，因此这些组件不是静态的。

你还可以向 `Viewfinder` 添加行为组件作为孩子，例如 [效果](effects.md) 或其他控制器。例如，如果你添加一个 `ScaleEffect`，你可以实现平滑缩放在你的游戏中。

## Backdrop

为了在世界的后面添加静态组件，可以将它们添加到 `backdrop` 组件中，或者替换 `backdrop` 组件。这对于希望有一个静态的 `ParallaxComponent` 以显示在包含可以移动玩家的世界上非常有用。

示例：

```dart
camera.backdrop.add(MyStaticBackground());
```

或

```dart
camera.backdrop = MyStaticBackground();
```

## 相机控制

有几种方法可以在运行时修改相机的设置：

1. 使用相机函数，如 `follow()`、`moveBy()` 和 `moveTo()`。这些方法底层使用了与 (2) 相同的效应/行为。
2. 应用效果和/或行为到相机的 `Viewfinder` 或 `Viewport`。效果和行为是特殊类型的组件，其目的是随时间修改某个组件的属性。
3. 手动操作。你可以随时重写 `CameraComponent.update()` 方法（或者视口或视点的相同方法），并在其中更改视点位置或缩放。虽然这在某些情况下可能适用，但通常不推荐这样做。

`CameraComponent` 有几种控制其行为的方法：

- `follow()` 将强制相机跟随提供的目标。你还可以选择限制相机的最大移动速度，或者只允许它水平/垂直移动。
- `stop()` 会撤销上一次调用的效果，并停止相机在其当前位置。
- `moveBy()` 可以用来按指定偏移量移动相机。如果相机已经在跟随另一个组件或正在移动，这些行为将自动取消。
- `moveTo()` 可以用来将相机移动到世界地图上的指定点。如果相机已经在跟随另一个组件或正向另一个点移动，这些行为将自动取消。
- `setBounds()` 允许你为相机的活动范围添加限制。这些限制通常是形状（如矩形），但也可以是其他任何形状。

### visibleWorldRect

相机暴露属性 `visibleWorldRect`，这是一个描述当前通过相机可见的世界区域的矩形。这个区域可以用来避免渲染不在视口内的组件，或更少地更新远离玩家的对象。

`visibleWorldRect` 是一个缓存属性，每当相机移动或视口大小改变时都会自动更新。

### canSee

`CameraComponent` 有一个名为 `canSee` 的方法，可以用来检查一个组件是否从相机的角度可见。这在例如为了剔除不在视野中的组件时非常有用。

```dart
if (!camera.canSee(component)) {
   component.removeFromParent(); // 剔除组件
}
```

