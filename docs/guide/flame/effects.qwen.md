# 效果

效果是一种特殊的组件，可以附加到另一个组件上以修改其属性或外观。

例如，假设你正在制作一个带有收集型增益物品的游戏。你想让这些增益物品在地图的随机位置生成，并在一段时间后消失。显然，你可以为增益物品创建一个精灵组件并将其放置在地图上，但我们还可以做得更好！

让我们添加一个 `ScaleEffect`，当增益物品首次出现时，使其从 0% 增长到 100%。再添加另一个无限重复的交替 `MoveEffect`，以使物品轻微上下移动。然后添加一个 `OpacityEffect`，让物品闪烁三次，这个效果自带 30 秒的延迟（或你希望增益物品保持在原地的时间）。最后，添加一个 `RemoveEffect`，它会在指定时间后自动从游戏树中移除该物品（你可能希望在其 `OpacityEffect` 结束后立即触发）。

正如你所看到的，通过一些简单的效果，我们将一个简单的无生命的精灵转换成一个更加有趣的物品。更重要的是，这并没有导致代码复杂性增加：一旦添加了效果，它们将自动运行，并在完成后从游戏树中自行移除。

## 概述

`Effect` 的功能是在一段时间内改变某个组件的属性值。为了实现这一点，`Effect` 必须知道该属性的初始值、最终值以及随着时间的变化方式。初始值通常由效果自动确定，最终值则由用户显式提供，时间变化则由 `EffectController` 处理。

Flame 提供了多种效果，并且你还可以[创建自己的效果](#creating-new-effects)。以下是一些包含的效果：

- [`MoveByEffect`](#movebyeffect)
- [`MoveToEffect`](#movetoeffect)
- [`MoveAlongPathEffect`](#movealongpatheffect)
- [`RotateEffect.by`](#rotateeffectby)
- [`RotateEffect.to`](#rotateeffectto)
- [`ScaleEffect.by`](#scaleeffectby)
- [`ScaleEffect.to`](#scaleeffectto)
- [`SizeEffect.by`](#sizeeffectby)
- [`SizeEffect.to`](#sizetoffectto)
- [`AnchorByEffect`](#anchorbyeffect)
- [`AnchorToEffect`](#anchortoeffect)
- [`OpacityToEffect`](#opacitytoeffect)
- [`OpacityByEffect`](#opacitybyeffect)
- [`ColorEffect`](#coloreffect)
- [`SequenceEffect`](#sequenceeffect)
- [`RemoveEffect`](#removeeffect)

`EffectController` 是一个描述效果如何随着时间演变的对象。如果你将效果的初始值视为 0% 的进度，最终值视为 100% 的进度，那么 `EffectController` 的作用就是将“物理”时间（以秒为单位测量）映射到从 0 到 1 的“逻辑”时间。

Flame 框架还提供了多种效果控制器：

- [`EffectController`](#effectcontroller)
- [`LinearEffectController`](#lineareffectcontroller)
- [`ReverseLinearEffectController`](#reverselineareffectcontroller)
- [`CurvedEffectController`](#curvedeffectcontroller)
- [`ReverseCurvedEffectController`](#reversecurvedeffectcontroller)
- [`PauseEffectController`](#pauseeffectcontroller)
- [`RepeatedEffectController`](#repeatedeffectcontroller)
- [`InfiniteEffectController`](#infiniteeffectcontroller)
- [`SequenceEffectController`](#sequenceeffectcontroller)
- [`SpeedEffectController`](#speedeffectcontroller)
- [`DelayedEffectController`](#delayedeffectcontroller)
- [`NoiseEffectController`](#noiseeffectcontroller)
- [`RandomEffectController`](#randomeffectcontroller)
- [`SineEffectController`](#sineeffectcontroller)
- [`ZigzagEffectController`](#zigzageffectcontroller)

## 内置效果

### `Effect`

基础的 `Effect` 类本身无法单独使用（它是抽象的），但它为所有其他效果提供了通用功能。这包括：

- 使用 `effect.pause()` 和 `effect.resume()` 方法暂停/恢复效果。你可以通过 `effect.isPaused` 检查效果是否当前处于暂停状态。
- 属性 `removeOnFinish` （默认值为 true）将在效果完成后使效果组件从游戏树中移除并进行垃圾回收。如果你计划在完成效果后重用该效果，请将其设置为 false。
- 可选的用户提供的 `onComplete`，当效果执行完毕但尚未从游戏中移除时将被调用。
- 一个 `completed` future，在效果完成后完成。
- 方法 `reset()` 将效果恢复到其原始状态，使其可以再次运行。

### `MoveByEffect`

此效果应用于 `PositionComponent` 并按照指定的 `offset` 偏移量进行移动。该偏移量相对于目标组件当前位置：

```dart
final effect = MoveByEffect(
  Vector2(0, -10),
  EffectController(duration: 0.5),
);
```

如果组件当前位于 `Vector2(250, 200)`，则在效果结束后其位置将为 `Vector2(250, 190)`。

可以在同一组件上同时应用多个移动效果。结果将是所有个别效果的叠加。

### `MoveToEffect`

此效果使 `PositionComponent` 从当前位置直线移动到指定的目标点。

```dart
final effect = MoveToEffect(
  Vector2(100, 500),
  EffectController(duration: 3),
);
```

可以将此类效果附加到同一组件上，但这不推荐。

### `MoveAlongPathEffect`

此效果使 `PositionComponent` 沿着相对于组件当前位置的指定路径移动。该路径可以具有非线性段，但必须是单连通的。建议从 `Vector2.zero()` 开始路径以避免组件位置出现突然跳跃。

```dart
final effect = MoveAlongPathEffect(
  Path()..quadraticBezierTo(100, 0, 50, -50),
  EffectController(duration: 1.5),
);
```

可选标志 `absolute: true` 将效果中的路径声明为绝对。也就是说，目标将在开始时“跳”到路径的起点，然后像画布上绘制的曲线一样遵循该路径。

另一个标志 `oriented: true` 指示目标不仅沿曲线移动，还要在每个点旋转自身以匹配曲线的方向。使用此标志，效果同时兼具移动和旋转的效果。

### `RotateEffect.by`

相对于当前方向顺时针旋转目标指定的角度。角度以弧度为单位。例如，以下效果将目标顺时针旋转 90º（=[tau]/4 弧度）：

```dart
final effect = RotateEffect.by(
  tau/4,
  EffectController(duration: 2),
);
```

### `RotateEffect.to`

顺时针旋转目标到指定的角度。例如，以下效果将目标旋转至向东方向（0º 是北方，90º=[tau]/4 东方，180º=tau/2 南方，而 270º=tau*3/4 西方）：

```dart
final effect = RotateEffect.to(
  tau/4,
  EffectController(duration: 2),
);
```

### `ScaleEffect.by`

此效果将目标的缩放量按指定数量进行更改。例如，这会使组件放大 50%：

```dart
final effect = ScaleEffect.by(
  Vector2.all(1.5),
  EffectController(duration: 0.3),
);
```

### `ScaleEffect.to`

此效果类似于 `ScaleEffect.by`，但它设置目标缩放量的绝对值。

```dart
final effect = ScaleEffect.to(
  Vector2.all(0.5),
  EffectController(duration: 0.5),
);
```

### `SizeEffect.by`

此效果将根据其当前大小更改目标组件的尺寸。例如，如果目标具有尺寸 `Vector2(100, 100)`，则在应用并完成以下效果后，新尺寸将是 `Vector2(120, 50)`：

```dart
final effect = SizeEffect.by(
   Vector2(-15, 30),
   EffectController(duration: 1),
);
```

`PositionComponent` 的尺寸不能为负数。如果某个效果尝试将尺寸设置为负值，则尺寸将被固定在零。

请注意，要使此效果生效，目标组件必须实现 `SizeProvider` 接口并在渲染时考虑其 `size`。内置的少数组件实现了此 API，但你可以通过向类声明添加 `implements SizeEffect` 使自己的组件与大小效果兼容。

`SizeEffect` 的另一种选择是 `ScaleEffect`，它更通用且同时缩放目标组件及其子组件。

### `SizeEffect.to`

将目标组件的尺寸更改为指定尺寸。目标尺寸不能为负数：

```dart
final effect = SizeEffect.to(
  Vector2(90, 80),
  EffectController(duration: 1),
);
```

### `AnchorByEffect`

按指定偏移量更改目标锚点的位置。此效果也可以通过 `AnchorEffect.by()` 创建。

```dart
final effect = AnchorByEffect(
  Vector2(0.1, 0.1),
  EffectController(speed: 1),
);
```

### `AnchorToEffect`

更改目标锚点的位置。此效果也可以通过 `AnchorEffect.to()` 创建。

```dart
final effect = AnchorToEffect(
  Anchor.center,
  EffectController(speed: 1),
);
```

### `OpacityToEffect`

此效果将随着时间改变目标的透明度至指定的 alpha 值。仅可应用于实现 `OpacityProvider` 的组件。

```dart
final effect = OpacityEffect.to(
  0.2,
  EffectController(duration: 0.75),
);
```

如果组件使用多个画笔，可以通过 `target` 参数针对一个或多个这些画笔。`HasPaint` 混合实现了 `OpacityProvider` 并暴露了轻松创建所需 paintIds 提供程序的 API。对于单个 paintId 可以使用 `opacityProviderOf`，对于多个 paintIds 可以使用 `opacityProviderOfList`。

```dart
final effect = OpacityEffect.to(
  0.2,
  EffectController(duration: 0.75),
  target: component.opacityProviderOfList(
    paintIds: const [paintId1, paintId2],
  ),
);
```

透明度值为 0 对应完全透明的组件，而透明度值为 1 则是完全不透明。便捷构造函数 `OpacityEffect.fadeOut()` 和 `OpacityEffect.fadeIn()` 将分别使目标动画化至全透明/全可见状态。

### `OpacityByEffect`

此效果将根据指定的 alpha 值相对地改变目标的透明度。例如，以下效果将把目标的透明度改变 90%：

```dart
final effect = OpacityEffect.by(
  0.9,
  EffectController(duration: 0.75),
);
```

目前，此效果仅可应用于具有 `HasPaint` 混合的组件。如果目标组件使用多个画笔，可以通过 `paintId` 参数针对任何单个颜色。

### GlowEffect

```{note}
此效果当前处于实验阶段，其 API 可能会在未来更改。
```

此效果将根据指定的 `glow-strength` 周围应用发光阴影。阴影的颜色为目标组件的画笔颜色。例如，以下效果将以强度 10 应用发光阴影：

```dart
final effect = GlowEffect(
  10.0,
  EffectController(duration: 3),
);
```

目前此效果仅可应用于具有 `HasPaint` 混合的组件。

### `SequenceEffect`

该效果可用于顺序运行多个其他效果。构成的效果可以有不同的类型。

序列效果也可以是交替的（首先正向运行，然后反向运行）；并且还可以重复特定次数或无限次。

```dart
final effect = SequenceEffect([
  ScaleEffect.by(
    Vector2.all(1.5),
    EffectController(
      duration: 0.2,
      alternate: true,
    ),
  ),
  MoveEffect.by(
    Vector2(30, -50),
    EffectController(
      duration: 0.5,
    ),
  ),
  OpacityEffect.to(
    0,
    EffectController(
      duration: 0.3,
    ),
  ),
  RemoveEffect(),
]);
```

### `RemoveEffect`

这是一个简单的效果，可附加到一个组件上，使其在指定延迟后从游戏树中移除：

```dart
final effect = RemoveEffect(delay: 3.0);
```

## ColorEffect

此效果将更改画笔的基础颜色，使渲染的组件被提供的颜色在给定范围内着色。

使用示例：

```dart
final effect = ColorEffect(
  const Color(0xFF00FF00),
  EffectController(duration: 1.5),
  opacityFrom: 0.2,
  opacityTo: 0.8,
);
```

`opacityFrom` 和 `opacityTo` 参数将确定应用到组件的颜色“多少”。在此示例中，效果将以 20% 开始并增加到 80%。

**注意：** 由于此效果的实现方式以及 Flutter 的 `ColorFilter` 类的工作原理，在组件上添加多个 `ColorEffect` 时，仅最后一个会生效。


## 创建新的效果

尽管 Flame 提供了广泛内置的效果，但最终你可能会发现它们不足。幸运的是，创建新效果非常简单。

每个效果都扩展自基础的 `Effect` 类，可能是通过一个或多个更专门的抽象子类（如 `ComponentEffect<T>` 或 `Transform2DEffect`）。

`Effect` 类的构造函数需要一个 `EffectController` 实例作为参数。在大多数情况下，你可能希望从自己的构造函数中传递该控制器。幸运的是，效果控制器封装了效果实现的大部分复杂性，因此你不需要担心重新创建该功能。

最后，你需要实现一个单一的方法 `apply(double progress)`，该方法将在效果处于活动状态时每次更新调用。在这个方法中，你应该对效果的目标做出更改。

此外，如果需要在效果开始或结束时执行某些操作，你可能希望实现回调 `onStart()` 和 `onFinish()`。

当实现 `apply()` 方法时，我们建议仅使用相对更新。也就是说，通过增量/减量当前值来改变目标属性，而不是直接将该属性设置为固定值。这样多个效果就可以在同一组件上作用而不会相互干扰。

## 效果控制器

### `EffectController`

基础的 `EffectController` 类提供了一个工厂构造函数，能够创建多种常见的控制器。构造函数的语法如下：

```dart
EffectController({
    required double duration,
    Curve curve = Curves.linear,
    double? reverseDuration,
    Curve? reverseCurve,
    bool alternate = false,
    double atMaxDuration = 0.0,
    double atMinDuration = 0.0,
    int? repeatCount,
    bool infinite = false,
    double startDelay = 0.0,
    VoidCallback? onMax,
    VoidCallback? onMin,
});
```

- *`duration`* -- 效果主要部分的长度，即从 0 到 100% 所需的时间。此参数不能为负数，但可以为零。如果仅指定了此参数，则效果将在 `duration` 秒内线性增长。

- *`curve`* -- 如果给出，则创建一个非线性效果，根据提供的 [曲线](https://api.flutter.dev/flutter/animation/Curves-class.html) 从 0 到 100% 增长。

- *`reverseDuration`* -- 如果提供，则添加控制器的附加步骤：在 `duration` 秒内从 0 增长到 100%，之后再从 100% 返回到 0 持续 `reverseDuration` 秒。此外，效果将在进度级别为 0 时完成（通常情况下，效果在进度 1 处完成）。

- *`reverseCurve`* -- 效果的“反向”步骤使用的曲线。如果未提供，默认为 `curve.flipped`。

- *`alternate`* -- 设置为 true 等同于将 `reverseDuration` 设置为与 `duration` 相等。如果已设置 `reverseDuration`，则此标志无效。

- *`atMaxDuration`* -- 如果非零，则在效果达到最大进度后插入一个暂停，在反向阶段之前保持 100% 进度的时间。如果没有反向阶段，则这只是一个暂停，然后将效果标记为已完成。

- *`atMinDuration`* -- 如果非零，则在达到最低进度（0）时的反向阶段结束处插入一个暂停，期间效果进度为 0%。如果没有反向阶段，则无论是否存在“at-max”暂停，该暂停将在“at-max”暂停后或前进阶段之后插入。此外，效果现在将在进度级别 0 处完成。

- *`repeatCount`* -- 如果大于一，将导致效果按照指定次数重复自身。每次迭代将包括前进阶段、最大暂停、反向阶段，然后是最低暂停（跳过未指定的阶段）。

- *`infinite`* -- 如果为 true，则效果将无限次重复且永远不会完成，这相当于将 `repeatCount` 设置为无穷大。

- *`startDelay`* -- 在效果开始前插入的附加等待时间。即使效果在重复，此等待时间也仅执行一次。在此期间，`.started` 属性返回 false。效果的 `onStart()` 回调将在等待期结束后执行。

  使用此参数是创建按顺序（或重叠）执行的效果链最简单的方法。

- *`onMax`* -- 在达到最大进度后、可选暂停和反向阶段之前将被调用的回调函数。

- *`onMin`* -- 在反向阶段结束时达到最低进度后、可选暂停和前进阶段之前将被调用的回调函数。

此工厂构造函数返回的效果控制器由以下描述的一些更简单的效果控制器组合而成。如果此构造函数对你的需求来说过于有限，你可以总是从相同的构建块中创建自己的组合。

除了工厂构造函数外，`EffectController` 类定义了所有效果控制器通用的一系列属性。这些属性包括：

- `.started` -- 如果效果已开始，则为 true。对于大多数效果控制器，该属性始终为 true。唯一例外是 `DelayedEffectController`，它在效果处于等待阶段时返回 false。

- `.completed` -- 当效果控制器完成执行时变为 true。

- `.progress` -- 效果控制器的当前值，0 到 1 的浮点数。此变量是效果控制器的主要“输出”值。

- `.duration` -- 效果的总持续时间，或如果无法确定持续时间（例如，如果持续时间为随机或无限）则为 null。

### `LinearEffectController`

这是最简单的效果控制器，在指定的 `duration` 内从 0 线性增长到 1：

```dart
final ec = LinearEffectController(3);
```

### `ReverseLinearEffectController`

类似于 `LinearEffectController`，但它反向进行并在线性时间内从 1 增长到 0：

```dart
final ec = ReverseLinearEffectController(1);
```

### `CurvedEffectController`

此效果控制器根据指定的 `duration` 和提供的 `curve` 非线性地从 0 增长到 1：

```dart
final ec = CurvedEffectController(0.5, Curves.easeOut);
```

### `ReverseCurvedEffectController`

类似于 `CurvedEffectController`，但控制器根据提供的 `curve` 从 1 减少到 0：

```dart
final ec = ReverseCurvedEffectController(0.5, Curves.bounceInOut);
```

### `PauseEffectController`

此效果控制器将进度保持在指定的时间持续时间内恒定值。通常，`progress` 将为 0 或 1：

```dart
final ec = PauseEffectController(1.5, progress: 0);
```

### `RepeatedEffectController`

这是一个复合效果控制器。它采用另一个效果控制器作为子组件，并多次重复它，在每次下一个周期开始之前重置。

```dart
final ec = RepeatedEffectController(LinearEffectController(1), 10);
```

子效果控制器不能是无限的。如果子组件是随机的，则将在每次迭代时使用新的随机值重新初始化。

### `InfiniteEffectController`

类似于 `RepeatedEffectController`，但无限期地重复其子控制器。

```dart
final ec = InfiniteEffectController(LinearEffectController(1));
```

### `SequenceEffectController`

按顺序执行效果控制器列表。控制器列表不能为空。

```dart
final ec = SequenceEffectController([
  LinearEffectController(1),
  PauseEffectController(0.2),
  ReverseLinearEffectController(1),
]);
```

### `SpeedEffectController`

更改其子效果控制器的持续时间，以便效果以预定义速度进行。子 EffectController 的初始持续时间无关紧要。子控制器必须是 `DurationEffectController` 的子类。

`SpeedEffectController` 只能应用于定义了速度概念的效果。此类效果必须实现 `MeasurableEffect` 接口。例如，以下效果符合要求：[`MoveByEffect`](#movebyeffect)，[`MoveToEffect`](#movetoeffect)，[`MoveAlongPathEffect`](#movealongpatheffect)，[`RotateEffect.by`](#rotateeffectby)，[`RotateEffect.to`](#rotateeffectto)。

参数 `speed` 的单位为秒每单位，其中“单位”的概念取决于目标效果。例如，对于移动效果，它们指的是行进的距离；而对于旋转效果，则以弧度为单位。

```dart
final ec1 = SpeedEffectController(LinearEffectController(0), speed: 1);
final ec2 = EffectController(speed: 1); // 与 ec1 相同
```

### `DelayedEffectController`

在指定的 `delay` 后执行其子控制器的效果控制器。当控制器处于“延迟”阶段时，效果将被视为“未开始”，即 `.started` 属性将返回 `false`。

```dart
final ec = DelayedEffectController(LinearEffectController(1), delay: 5);
```

### `NoiseEffectController`

此效果控制器表现出噪声行为，即在零周围随机振荡。此类效果控制器可用于实现各种晃动效果。

```dart
final ec = NoiseEffectController(duration: 0.6, frequency: 10);
```

### `RandomEffectController`

此控制器包装另一个控制器并使其持续时间随机。每次重置时实际的持续时间值都会重新生成，这使得该控制器在重复上下文中特别有用，例如 [#repeatedeffectcontroller](#repeatedeffectcontroller) 或 [#infiniteeffectcontroller](#infiniteeffectcontroller)。

```dart
final ec = RandomEffectController.uniform(
  LinearEffectController(0),  // 这里的持续时间无关紧要
  min: 0.5,
  max: 1.5,
);
```

用户可以控制使用的 `Random` 源以及生成的随机持续时间的确切分布。包含两种分布——`.uniform` 和 `.exponential`，任何其他都可以由用户实现。

### `SineEffectController`

表示正弦函数单个周期的效果控制器。用于创建自然和谐振荡效果。两个相互垂直且具有不同周期的 `SineEffectControllers` 驱动的效果将生成 [利萨茹曲线]。

```dart
final ec = SineEffectController(period: 1);
```

### `ZigzagEffectController`

简单的交替效果控制器。在一次 `period` 内，此控制器将线性地从 0 增加到 1，然后减少到 -1，并返回到 0。用于起始位置应为振荡中心而非极端（与标准交替的 `EffectController` 提供的效果不同）的振荡效果。

```dart
final ec = ZigzagEffectController(period: 2);
```

## 参考

- [各种效果示例](https://examples.flame-engine.org/)。


[tau]: https://en.wikipedia.org/wiki/Tau_(mathematical_constant)
[利萨茹曲线]: https://en.wikipedia.org/wiki/Lissajous_curve