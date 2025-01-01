# 工具

在此页面，您可以找到一些工具类和方法的文档。

## 设备类

这个类可以通过 `Flame.device` 访问，并且提供一些方法来控制设备的状态。例如，您可以更改屏幕方向，设置应用程序是否为全屏等。

### `Flame.device.fullScreen()`

调用此方法时，会禁用所有 `SystemUiOverlay`，使应用程序全屏显示。  
在主方法中调用时，它会使应用程序全屏（无顶部或底部的条）。  

**注意：** 在网页端调用时没有效果。

### `Flame.device.setLandscape()`

此方法将整个应用程序（实际上也包括游戏）的方向设置为横屏，具体行为根据操作系统和设备设置可能支持左右横屏方向。  
如果您想将应用程序的方向设置为特定方向的横屏，可以使用 `Flame.device.setLandscapeLeftOnly` 或 `Flame.device.setLandscapeRightOnly`。

**注意：** 在网页端调用时没有效果。

### `Flame.device.setPortrait()`

此方法将整个应用程序（实际上也包括游戏）的方向设置为竖屏，具体行为根据操作系统和设备设置可能支持上下竖屏方向。  
如果您想将应用程序的方向设置为特定方向的竖屏，可以使用 `Flame.device.setPortraitUpOnly` 或 `Flame.device.setPortraitDownOnly`。

**注意：** 在网页端调用时没有效果。

### `Flame.device.setOrientation()` 和 `Flame.device.setOrientations()`

如果需要更精细地控制允许的方向（无需直接操作 `SystemChrome`），可以使用 `setOrientation`（接受单个 `DeviceOrientation` 作为参数）和 `setOrientations`（接受一个 `List<DeviceOrientation>` 来指定可能的方向）。

**注意：** 在网页端调用时没有效果。

## 定时器

Flame 提供了一个简单的工具类来帮助您处理倒计时和定时器状态变化事件。

倒计时示例：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flutter/material.dart';

class MyGame extends Game {
  final TextPaint textPaint = TextPaint(
    style: const TextStyle(color: Colors.white, fontSize: 20),
  );

  final countdown = Timer(2);

  @override
  void update(double dt) {
    countdown.update(dt);
    if (countdown.finished) {
      // 优先使用定时器回调，但在某些情况下，这更好
    }
  }

  @override
  void render(Canvas canvas) {
    textPaint.render(
      canvas,
      "Countdown: ${countdown.current.toString()}",
      Vector2(10, 100),
    );
  }
}
```

间隔示例：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flutter/material.dart';

class MyGame extends Game {
  final TextPaint textPaint = TextPaint(
    style: const TextStyle(color: Colors.white, fontSize: 20),
  );
  Timer interval;

  int elapsedSecs = 0;

  MyGame() {
    interval = Timer(
      1,
      onTick: () => elapsedSecs += 1,
      repeat: true,
    );
  }

  @override
  void update(double dt) {
    interval.update(dt);
  }

  @override
  void render(Canvas canvas) {
    textPaint.render(canvas, "Elapsed time: $elapsedSecs", Vector2(10, 150));
  }
}
```

`Timer` 实例还可以通过使用 `TimerComponent` 类在 `FlameGame` 游戏中使用。

`TimerComponent` 示例：

```dart
import 'package:flame/timer.dart';
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame {
  MyFlameGame() {
    add(
      TimerComponent(
        period: 10,
        repeat: true,
        onTick: () => print('10秒已过'),
      )
    );
  }
}
```

## 时间缩放

在许多游戏中，通常希望基于游戏中的一些事件来创建慢动作或快进效果。实现这些效果的一种常见方法是操控游戏内时间或滴答频率。

为简化这种操作，Flame 提供了一个 `HasTimeScale` 混合类。该混合类可以附加到任何 Flame `Component`，并提供简单的 `timeScale` 的获取和设置 API。`timeScale` 的默认值是 `1`，表示组件的游戏时间与现实时间的速度相同。将其设置为 `2` 将使组件的滴答速度加倍，而设置为 `0.5` 会使组件的滴答速度减半。该混合类还提供了 `pause` 和 `resume` 方法，您可以使用这些方法代替手动将 `timeScale` 设置为 `0` 和 `1`。

由于 `FlameGame` 本身也是一个 `Component`，因此您也可以将此混合类附加到 `FlameGame`。这样，您就可以从一个地方控制游戏中所有组件的时间缩放。

```{note}
HasTimeScale 不能单独控制 `flame_forge2d` 中的 `BodyComponent` 的移动。  
只有在整个游戏或 Forge2DWorld 需要进行时间缩放时，它才有用。
```

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame with HasTimeScale {
  void speedUp() {
    timeScale = 2.0;
  }

  void slowDown() {
    timeScale = 1.0;
  }
}
```

## 扩展

Flame 提供了一些有用的扩展，这些扩展旨在帮助开发者提供快捷方式和转换方法。以下是这些扩展的概述。

所有扩展都可以从 `package:flame/extensions.dart` 导入。

### Canvas

方法：

- `scaleVector`：与 `canvas scale` 方法相似，但接受 `Vector2` 作为参数。
- `translateVector`：与 `canvas translate` 方法相似，但接受 `Vector2` 作为参数。
- `renderPoint`：在画布上渲染一个点（主要用于调试）。
- `renderAt` 和 `renderRotated`：如果直接向 `Canvas` 渲染，可以使用这些函数轻松调整坐标，以便在正确的位置渲染内容。它们会改变 `Canvas` 的转换矩阵，但会在之后重置。

### 颜色

方法：

- `darken`：将颜色的色调按 0 到 1 之间的值变暗。
- `brighten`：将颜色的色调按 0 到 1 之间的值变亮。

工厂方法：

- `ColorExtension.fromRGBHexString`：从有效的十六进制字符串（如 #1C1C1C）解析 RGB 颜色。
- `ColorExtension.fromARGBHexString`：从有效的十六进制字符串（如 #FF1C1C1C）解析 ARGB 颜色。

### 图像

方法：

- `pixelsInUint8`：以 `Uint8List` 的形式检索图像的像素数据，格式为 `ImageByteFormat.rawRgba`。
- `getBoundingRect`：获取图像的边界矩形，返回 `Rect`。
- `size`：获取图像的大小，返回 `Vector2`。
- `darken`：将图像中的每个像素按 0 到 1 之间的值变暗。
- `brighten`：将图像中的每个像素按 0 到 1 之间的值变亮。

### 偏移量

方法：

- `toVector2`：将 `Offset` 转换为 `Vector2`。
- `toSize`：将 `Offset` 转换为 `Size`。
- `toPoint`：将 `Offset` 转换为 `Point`。
- `toRect`：创建一个从 (0,0) 开始的矩形，右下角为该 `Offset`。

### 矩形

方法：

- `toOffset`：将 `Rect` 转换为 `Offset`。
- `toVector2`：将 `Rect` 转换为 `Vector2`，从 (0,0) 到矩形的大小。
- `containsPoint`：检查该矩形是否包含给定的 `Vector2` 点。
- `intersectsSegment`：检查由两个 `Vector2` 组成的线段是否与该矩形相交。
- `intersectsLineSegment`：检查 `LineSegment` 是否与矩形相交。
- `toVertices`：将矩形的四个角转换为 `Vector2` 列表。
- `toFlameRectangle`：将该 `Rect` 转换为 Flame 的 `Rectangle`。
- `toMathRectangle`：将该 `Rect` 转换为 `math.Rectangle`。
- `toGeometryRectangle`：将该 `Rect` 转换为来自 flame-geom 的 `Rectangle`。
- `transform`：使用 `Matrix4` 转换 `Rect`。

工厂方法：

- `RectExtension.getBounds`：构造一个表示 `Vector2` 列表边界的 `Rect`。
- `RectExtension.fromCenter`：根据中心点（使用 `Vector2`）构造一个 `Rect`。

### math.Rectangle

方法：

- `toRect`：将 `math.Rectangle` 转换为 `ui.Rect`。

### Size

方法：

- `toVector2`：将 `Size` 转换为 `Vector2`。
- `toOffset`：将 `Size` 转换为 `Offset`。
- `toPoint`：将 `Size` 转换为 `Point`。
- `toRect`：将 `Size` 转换为从 (0,0) 开始的 `Rect`，大小为 `Size`。

### Vector2

该类来自 `vector_math` 包，并且我们在其基础上添加了一些有用的扩展方法。

方法：

- `toOffset`：将 `Vector2` 转换为 `Offset`。
- `toPoint`：将 `Vector2` 转换为 `Point`。
- `toRect`：将 `Vector2` 转换为从 (0,0) 开始的 `Rect`，大小为 `Vector2`。
- `toPositionedRect`：将 `Vector2` 中的 [x, y] 作为起点，创建一个 `Rect`，其大小为 `Vector2` 参数的大小。
- `lerp`：将 `Vector2` 向另一个 `Vector2` 线性插值。
- `rotate`：用弧度指定的角度旋转 `Vector2`，可以选择定义旋转中心。
- `scaleTo`：将 `Vector2` 的长度改变为指定的长度，而不改变方向。
- `moveToTarget`：将 `Vector2` 平滑地移动到目标方向指定的距离。

工厂方法：

- `Vector2Extension.fromInts`：使用整数输入创建 `Vector2`。

运算符：

- `&`：将两个 `Vector2` 组合成一个矩形，左边为原点，右边为大小。
- `%`：对两个 `Vector2` 的 x 和 y 分别执行取模/余数运算。

### Matrix4

该类来自 `vector_math` 包，我们在其基础上添加了一些扩展方法。

方法：

- `translate2`：通过给定的 `Vector2` 平移 `Matrix4`。
- `transform2`：通过 `Matrix4` 转换给定的 `Vector2`，返回一个新的 `Vector2`。
- `transformed2`：将输入的 `Vector2` 转换为输出的 `Vector2`。

获取器：

- `m11`：矩阵的第一行第一列。
- `m12`：矩阵的第一行第二列。
- `m13`：矩阵的第一行第三列。
- `m14`：矩阵的第一行第四列。
- `m21`：矩阵的第二行第一列。
- `m22`：矩阵的第二行第二列。
- `m23`：矩阵的第二行第三列。
- `m24`：矩阵的第二行第四列。
- `m31`：矩阵的第三行第一列。
- `m32`：矩阵的第三行第二列。
- `m33`：矩阵的第三行第三列。
- `m34`：矩阵的第三行第四列。
- `m41`：矩阵的第四行第一列。
- `m42`：矩阵的第四行第二列。
- `m43`：矩阵的第四行第三列。
- `m44`：矩阵的第四行第四列。

工厂方法：

- `Matrix4Extension.scale`：创建一个缩放的 `Matrix4`，可以传递一个 `Vector4` 或 `Vector2` 作为第一个参数，或者传递三个 `double` 类型的 x、y、z 参数。
