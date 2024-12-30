# 相机组件

相机即组件（Camera-as-a-component）是游戏结构的一种新方式，这种做法允许你在游戏中更灵活地放置相机，甚至可以同时使用多个相机。

为了理解这种方法的工作原理，想象一下你的游戏世界是一个独立于应用程序存在的实体*某处*。想象你的游戏只是一个窗口，通过它可以观察这个世界。你可以随时关闭这个窗口，而游戏世界仍然存在。或者反过来，你可以打开多个窗口，它们同时查看同一个（或不同的）世界。

有了这种思维方式，我们现在可以理解相机即组件的工作原理。

首先，有一个[World](#world)类，它包含你游戏世界中的所有组件。`World`组件可以挂载在任何地方，例如你的游戏类的根部，就像内置的`World`一样。

然后是一个[CameraComponent](#cameracomponent)类，它“观察”[World](#world)。`CameraComponent`内部有一个[Viewport](#viewport)和一个[Viewfinder](#viewfinder)，允许你在屏幕上的任何位置渲染世界，并且控制视图的位置和角度。`CameraComponent`还包含一个静态渲染在世界下方的[backdrop](#backdrop)组件。

## World

这个组件用于托管构成你游戏世界的其他所有组件。`World`类的主要属性是它不通过传统方式渲染——而是由一个或多个[CameraComponent](#cameracomponent)“观察”世界来渲染。在`FlameGame`类中有一个名为`world`的默认`World`实例，与默认的`CameraComponent`（名为`camera`）配对。

游戏可以有多个`World`实例，这些实例可以同时或不同时间进行渲染。例如，如果你有两个世界A和B以及一个相机，那么将该相机的目标从A切换到B会立即切换视图至世界B而无需卸载A再挂载B。

与大多数`Component`一样，可以通过在其构造函数中使用`children`参数或使用`add`或`addAll`方法将子组件添加到`World`中。

对于许多游戏，你可能希望扩展世界并在其中创建逻辑，这种游戏结构可以如下所示：

```dart
void main() {
  runApp(GameWidget(FlameGame(world: MyWorld())));
}

class MyWorld extends World {
  @override
  Future<void> onLoad() async {
    // 加载在这个世界中所需的所有资源
    // 并添加组件等。
  }
}
```

## CameraComponent

这是一个通过`World`进行渲染的组件。在构造时需要引用一个`World`实例；然而，稍后可以将目标世界替换为另一个世界。多个相机可以同时观察同一个世界。

在`FlameGame`类中有一个名为`camera`的默认`CameraComponent`与默认的`world`配对，因此如果你的游戏不需要，你无需创建或添加自己的`CameraComponent`。

一个`CameraComponent`内部有两个其他组件：[Viewport](#viewport)和[Viewfinder](#viewfinder)。不同于`World`对象，相机拥有视口和取景器，这意味着这些组件是相机的子组件。

还有静态属性`CameraComponent.currentCamera`，它仅在渲染阶段不为空，并返回当前正在执行渲染的相机对象。这仅用于某些高级用例，其中组件的渲染依赖于相机设置。例如，某些组件可能会决定如果它们超出了相机视口，则跳过自身及其子组件的渲染。

`FlameGame`类在其构造函数中有一个`camera`字段，因此你可以设置你想要的默认相机类型，如下所示：

```dart
void main() {
  runApp(
    GameWidget(
      FlameGame(
        camera: CameraComponent.withFixedResolution(width: 800, height: 600),
      ),
    ),
  );
}
```

### CameraComponent.withFixedResolution()

这个工厂构造函数允许你假装用户的设备具有你选择的固定分辨率。例如：

```dart
final camera = CameraComponent.withFixedResolution(
  world: myWorldComponent,
  width: 800,
  height: 600,
);
```

这将创建一个视口，居中显示在屏幕上，并尽可能多地占据空间同时保持800:600的纵横比，并显示800x600的游戏世界区域。

“固定分辨率”非常简单易用，但如果设备的像素比例与你选择的尺寸不同，则会浪费用户的可用屏幕空间。

## Viewport

`Viewport`是观察`World`的一个窗口。这个窗口在屏幕上具有一定的大小、形状和位置。有多种类型的视口可用，你可以随时实现自己的视口。

`Viewport`是一个组件，这意味着你可以向其添加其他组件。这些子组件会受到视口位置的影响，但不受剪辑遮罩的影响。因此，如果视口是游戏世界的“窗口”，那么它的子组件就是可以放在窗口顶部的东西。

将元素添加到视口中是一种实现“HUD”组件的便捷方式。

以下可用的视口包括：

- `MaxViewport`（默认）——此视口会扩展到游戏允许的最大大小，即其大小等于游戏画布的大小。
- `FixedResolutionViewport`——保持分辨率和纵横比固定，在不匹配纵横比时在两侧显示黑条。
- `FixedSizeViewport`——一个具有预定义尺寸的简单矩形视口。
- `FixedAspectRatioViewport`——一个矩形视口，扩展以适应游戏画布但保留其纵横比。
- `CircularViewport`——圆形、固定大小的视口。

如果你向`Viewport`添加子组件，它们将作为位于世界前面的静态HUD出现。

## Viewfinder

相机的这一部分负责知道我们当前正在观察的游戏世界的哪个位置。`Viewfinder`还控制缩放级别和视图的角度。

`Viewfinder`的`anchor`属性允许你指定视口中哪个点充当相机的“逻辑中心”。例如，在侧滚动作游戏中，通常会将相机焦点放在显示在屏幕左下角而不是中央的主要角色上。这个偏心位置就是由`Viewfinder`的`anchor`控制的相机“逻辑中心”。

如果你向`Viewfinder`添加子组件，它们将位于世界前面但视口后面，并且应用了与世界相同的变换，因此这些组件不是静态的。

你还可以向视图器添加行为组件作为子组件，例如[effects](effects.md)或其他控制器。例如，如果你添加了一个`ScaleEffect`，就可以在游戏实现平滑缩放。

## Backdrop

为了在世界后面添加静态组件，可以将它们添加到`backdrop`组件中或替换`backdrop`组件。例如，如果你想在游戏中有一个位于世界下方的静态`ParallaxComponent`，可以自由地移动它。

示例：

```dart
camera.backdrop.add(MyStaticBackground());
```

或者

```dart
camera.backdrop = MyStaticBackground();
```

## 相机控制

有几种方法可以在运行时修改相机的设置：

  1. 手动进行。你总是可以重写`CameraComponent.update()`方法（或视图器或视口上的相同方法），并在其中更改视图器的位置或缩放，根据需要来调整。在某些情况下这种方法可能是可行的，但通常不推荐。

  2. 将效果和/或行为应用于相机的`Viewfinder`或`Viewport`。效果和行为是特殊类型的组件，其目的是修改所附加组件的一些属性。

  3. 使用特殊的相机函数，如`follow()`、`moveBy()`和`moveTo()`。在内部，这种方法使用的是（2）中的相同的效果/行为。

相机有几种方法用于控制其行为：

- `Camera.follow()`会强制相机跟踪提供的目标。
    可选地可以限制相机移动的最大速度，或仅允许水平/垂直移动。

- `Camera.stop()`会撤销先前调用的效果并使相机停在当前位置。

- `Camera.moveBy()`可用于按指定偏移量移动相机。
    如果相机已经在跟随另一个组件或正向某个方向移动，则这些行为会被自动取消。

- `Camera.moveTo()`可用于将相机移动到世界地图上的指定点。
    如果相机已经在跟随另一个组件或正向另一个点移动，则这些行为会被自动取消。

- `Camera.setBounds()`允许你添加相机可以去的地方的限制。这些限制以`Shape`的形式出现，通常是矩形，也可以是任何其他形状。

### visibleWorldRect

相机暴露了一个名为`visibleWorldRect`的属性，它描述了当前通过相机可见的游戏区域。
此区域可用于避免渲染屏幕外的组件或较少地更新远离玩家的对象。

`visibleWorldRect`是一个缓存属性，并在相机移动或视口更改其大小时自动更新。

### 检查从相机视角是否可以看到某个组件

`CameraComponent`有一个名为`canSee`的方法，可以用来检查从相机视角是否可以看到某个组件。
这在剔除不可见的组件时非常有用。

```dart
if (!camera.canSee(component)) {
   component.removeFromParent(); // 剔除该组件
}
```