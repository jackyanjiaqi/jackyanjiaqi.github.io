# FlameGame

`FlameGame` 类实现了一个基于 `Component` 的游戏。它拥有一个组件树，并调用所有已添加到游戏中的组件的 `update` 和 `render` 方法。

我们将这种基于组件的系统称为 Flame 组件系统（Flame Component System，简称 FCS）。在整个文档中，FCS 用来指代这个系统。

组件可以直接通过构造函数中的命名参数 `children` 添加到 `FlameGame`，或者通过 `add`/`addAll` 方法从任何地方添加。然而，大多数时候，您可能想将子组件添加到一个 `World` 中，默认的 `World` 存在于 `FlameGame.world` 下，您可以像添加到任何其他组件一样将组件添加到它。

以下是一个简单的 `FlameGame` 实现，其中通过 `onLoad` 和直接在构造函数中添加了两个组件：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flutter/widgets.dart';

/// 一个渲染箱子精灵的组件，大小为 16x16。
class MyCrate extends SpriteComponent {
  MyCrate() : super(size: Vector2.all(16));

  @override
  Future<void> onLoad() async {
    sprite = await Sprite.load('crate.png');
  }
}

class MyWorld extends World {
  @override
  Future<void> onLoad() async {
    await add(MyCrate());
  }
}

void main() {
  final myGame = FlameGame(world: MyWorld());
  runApp(
    GameWidget(game: myGame),
  );
}
```

```{note}
如果您在构建方法中实例化游戏，每次 Flutter 树被重建时，您的游戏都会被重新构建，这通常会比您希望的频率更高。为避免这种情况，您可以先创建一个游戏实例，并在小部件结构中引用它，或者使用 `GameWidget.controlled` 构造函数。
```

要从 `FlameGame` 的组件列表中移除组件，可以使用 `remove` 或 `removeAll` 方法。如果您只想移除一个组件，可以使用 `remove`，如果要移除多个组件，则可以使用 `removeAll`。这些方法适用于所有的 `Component`，包括世界。

## 游戏循环

`GameLoop` 模块是游戏循环概念的简单抽象。基本上，大多数游戏建立在两个方法上：

- `render` 方法用于获取画布并绘制当前游戏状态。
- `update` 方法接收自上次更新以来的增量时间（以微秒为单位），并允许您转到下一个状态。

`GameLoop` 被 Flame 所有的 `Game` 实现所使用。

## 调整大小

每当游戏需要调整大小时，例如，当屏幕方向更改时，`FlameGame` 会调用所有组件的 `onGameResize` 方法，并将此信息传递给相机和视口。

`FlameGame.camera` 控制视口中应对齐的坐标空间中的点，默认情况下，[0,0] 位于视口的中心 (`Anchor.center`)。

## 生命周期

`FlameGame` 的生命周期回调方法，如 `onLoad`、`render` 等，按以下顺序调用：

![a](/images/game_lifecycle.png)

当一个 `FlameGame` 被首次添加到 `GameWidget` 时，生命周期方法 `onGameResize`、`onLoad` 和 `onMount` 会按顺序调用。然后，`update` 和 `render` 会在每个游戏周期中按顺序调用。如果 `FlameGame` 从 `GameWidget` 中移除，则会调用 `onRemove`。如果 `FlameGame` 被添加到一个新的 `GameWidget` 中，则生命周期顺序将从 `onGameResize` 开始重复。

```{note}
`onGameResize` 和 `onLoad` 的顺序与其他 `Component` 不同。这是为了允许游戏元素的大小在加载或生成资源之前计算。
```

`onRemove` 回调方法可以用于清理子组件和缓存的数据：

```dart
  @override
  void onRemove() {
    // 根据游戏需求选择性地执行。
    removeAll(children);
    processLifecycleEvents();
    Flame.images.clearCache();
    Flame.assets.clearCache();
    // 其他在游戏被移除时要执行的代码。
  }
```

```{note}
`FlameGame` 中的子组件和资源清理不会自动进行，必须明确添加到 `onRemove` 回调中。
```

## 调试模式

Flame 的 `FlameGame` 类提供了一个名为 `debugMode` 的变量，默认为 `false`。但您可以将其设置为 `true`，以启用游戏组件的调试功能。**请注意**，当组件被添加到游戏中时，这个变量的值会传递给它们，因此，如果您在运行时更改 `debugMode`，默认情况下，它不会影响已经添加的组件。

要了解更多关于 Flame 中 `debugMode` 的内容，请参考 [调试文档](other/debug.md)。

## 更改背景颜色

要更改 `FlameGame` 的背景颜色，您需要重写 `backgroundColor()` 方法。

在下面的示例中，背景颜色设置为完全透明，以便可以看到 `GameWidget` 后面的部件。默认的背景颜色是不透明的黑色。

```dart
class MyGame extends FlameGame {
  @override
  Color backgroundColor() => const Color(0x00000000);
}
```

请注意，背景颜色不能在游戏运行时动态更改，但如果您希望它动态更改，可以绘制一个覆盖整个画布的背景。

## SingleGameInstance 混入

如果您正在制作单一游戏应用程序，可以选择应用 `SingleGameInstance` 混入。这是构建游戏时常见的场景：应用中有一个全屏的 `GameWidget`，它托管一个单一的 `Game` 实例。

添加这个混入会在某些场景下提供性能优势。特别是，组件的 `onLoad` 方法保证会在该组件添加到父组件时启动，即使父组件尚未挂载。因此，`await` 等待 `parent.add(component)` 总是能确保组件加载完成。

使用这个混入非常简单：

```dart
class MyGame extends FlameGame with SingleGameInstance {
  // ...
}
```

## 低级游戏 API

![1](/images/lowlevel.png)

抽象类 `Game` 是一个低级 API，当您想实现游戏引擎结构的功能时可以使用。比如，`Game` 并没有实现任何 `update` 或 `render` 函数。

该类还具有生命周期方法 `onLoad`、`onMount` 和 `onRemove`，这些方法会在游戏加载、挂载或移除时从 `GameWidget`（或其他父组件）调用。`onLoad` 只会在类第一次添加到父组件时调用，但 `onMount`（在 `onLoad` 后调用）每次添加到新父组件时都会调用。`onRemove` 在类从父组件移除时调用。

```{note}
`Game` 类提供了更多自由来实现功能，但如果使用它，您将错过 Flame 中的所有内置功能。
```

一个 `Game` 实现的示例：

```dart
class MyGameSubClass extends Game {
  @override
  void render(Canvas canvas) {
    // ...
  }

  @override
  void update(double dt) {
    // ...
  }
}

void main() {
  final myGame = MyGameSubClass();
  runApp(
    GameWidget(
      game: myGame,
    )
  );
}
```

## 暂停/恢复/逐步执行游戏

Flame 的 `Game` 可以通过两种方式暂停和恢复：

- 使用 `pauseEngine` 和 `resumeEngine` 方法。
- 通过更改 `paused` 属性。

当暂停 `Game` 时，`GameLoop` 会暂停，这意味着在恢复之前不会发生任何更新或渲染。

当游戏暂停时，可以使用 `stepEngine` 方法逐帧推进它。虽然这在最终的游戏中可能用处不大，但在开发周期中逐步检查游戏状态时非常有用。

### 后台处理

当应用被发送到后台时，游戏会自动暂停，当它回到前台时，游戏会恢复。可以通过将 `pauseWhenBackgrounded` 设置为 `false` 来禁用此行为。

```dart
class MyGame extends FlameGame {
  MyGame() {
    pauseWhenBackgrounded = false;
  }
}
```

在当前的 Flutter 稳定版本（3.13）中，这个标志在非移动平台（包括 Web）上被忽略。

## HasPerformanceTracker 混入

在优化游戏时，跟踪每帧更新和渲染所花费的时间可能很有用。这些数据可以帮助您发现运行效率低的代码区域，也可以帮助检测游戏中渲染最耗时的视觉区域。

要获取更新和渲染时间，只需将 `HasPerformanceTracker` 混入添加到游戏类中：

```dart
class MyGame extends FlameGame with HasPerformanceTracker {
  // 访问 `updateTime` 和

 `renderTime` 获取器。
}
```