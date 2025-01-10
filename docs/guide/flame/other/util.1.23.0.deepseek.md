# 工具类

在本页中，您可以找到一些工具类的文档。

## Device 类

```{warning}
此类的某些方法仅适用于移动平台（Android 和 iOS）。

在其他平台上使用这些方法将不会生效，并且在调试模式下运行时会在控制台打印警告。
```

此类可以通过 `Flame.device` 访问，并包含一些可以用来控制设备状态的方法。例如，您可以更改屏幕方向并将应用程序设置为全屏。

### `Flame.device.fullScreen()`

调用此方法会禁用所有 `SystemUiOverlay`，使应用进入全屏模式。在主方法中调用时，会使您的应用全屏（没有顶部或底部的栏）。

**注意：** 该方法在 Web 上无效。

### `Flame.device.setLandscape()`

此方法将应用程序的整体方向设置为横向，并根据操作系统和设备设置允许左横屏和右横屏两种方向。要在特定方向上设置应用方向，请使用 `Flame.device.setLandscapeLeftOnly` 或 `Flame.device.setLandscapeRightOnly`。

**注意：** 该方法在 Web 上无效。

### `Flame.device.setPortrait()`

此方法将应用程序的整体方向设置为纵向，并根据操作系统和设备设置允许竖屏向上和向下两种方向。要在特定方向上设置应用方向，请使用 `Flame.device.setPortraitUpOnly` 或 `Flame.device.setPortraitDownOnly`。

**注意：** 该方法在 Web 上无效。

### `Flame.device.setOrientation()` 和 `Flame.device.setOrientations()`

如果需要更精细的控制方向，可以使用 `setOrientation`（接受一个 `DeviceOrientation` 参数）和 `setOrientations`（接受一个 `List<DeviceOrientation>` 参数）。

**注意：** 该方法在 Web 上无效。

## Timer

Flame 提供了一个简单的工具类来处理倒计时和其他时间状态变化事件。

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
      // Prefer the timer callback, but this is better in some cases
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

`Timer` 实例也可以在 `FlameGame` 游戏中使用 `TimerComponent` 类。

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
        onTick: () => print('10 seconds elapsed'),
      )
    );
  }
}
```

## Time Scale

在许多游戏中，创建慢动作或快进效果通常是出于某些游戏事件。为了更容易实现这些效果，Flame 提供了一个 `HasTimeScale` mixin。此 mixin 可以附加到任何 Flame `Component`，并提供一个简单的 get/set API 来控制 `timeScale`。默认情况下，`timeScale` 为 `1`，表示组件的运行速度与现实时间相同。将其设置为 `2` 会使组件的速度加倍，设置为 `0.5` 会使其速度减半。此 mixin 还提供 `pause` 和 `resume` 方法，可以用来代替手动将 `timeScale` 设置为 0 和 1。

由于 `FlameGame` 也是一个 `Component`，因此也可以将其附加到 `FlameGame` 上。这样做可以从一个地方控制游戏的所有组件的时间尺度。

```{note}
HasTimeScale 无法单独控制 `BodyComponent` 的移动速度（来自 `flame_forge2d`）。它只适用于整个游戏或 Forge2DWorld 的时间缩放。
```

示例：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame with HasTimeScale {
  void speedUp(){
    timeScale = 2.0;
  }

  void slowDown(){
    timeScale = 1.0;
  }
}
```

## Extensions

Flame 提供了一组实用的扩展方法，这些扩展旨在帮助开发人员简化快捷方式和转换方法。它们都可以从 `package:flame/extensions.dart` 导入。

### Canvas

方法：

- `scaleVector`：类似于 `canvas scale` 方法，但接受一个 `Vector2` 作为参数。
- `translateVector`：类似于 `canvas translate` 方法，但接受一个 `Vector2` 作为参数。
- `renderPoint`：在画布上渲染单个点（主要用于调试目的）。
- `renderAt` 和 `renderRotated`：如果您直接在 `Canvas` 上渲染，可以使用这些函数轻松操作坐标以在正确位置渲染内容。它们会改变 `Canvas` 的变换矩阵，但随后会恢复。

### Color

方法：

- `darken`：将颜色的阴影变暗一个介于 0 到 1 之间的量。
- `brighten`：将颜色的阴影提亮一个介于 0 到 1 之间的量。

工厂：

- `ColorExtension.fromRGBHexString`：从有效的十六进制字符串（例如，#1C1C1C）中解析 RGB 颜色。
- `ColorExtension.fromARGBHexString`：从有效的十六进制字符串（例如，#FF1C1C1C）中解析 ARGB 颜色。

### Image

方法：

- `pixelsInUint8`：检索图像的像素数据为 `Uint8List`，以 `ImageByteFormat.rgba8888` 格式。
- `getBoundingRect`：获取图像的边界矩形作为 `Rect`。
- `size`：图像的大小作为 `Vector2`。
- `darken`：将图像的每个像素变暗一个介于 0 到 1 之间的量。
- `brighten`：将图像的每个像素提亮一个介于 0 到 1 之间的量。

### Offset

方法：

- `toVector2`：从 `Offset` 创建 `Vector2`。
- `toSize`：从 `Offset` 创建 `Size`。
- `toPoint`：从 `Offset` 创建 `Point`。
- `toRect`：从 `Offset` 创建一个以 (0,0) 为原点并以该 `Offset` 为右下角的 `Rect`。

### Rect

方法：

- `toOffset`：从 `Rect` 创建 `Offset`。
- `toVector2`：从 `Rect` 创建一个以 (0,0) 为原点并以 `Rect` 的大小为 `Vector2`。
- `containsPoint`：判断此 `Rect` 是否包含一个 `Vector2` 点。
- `intersectsSegment`：判断由两个 `Vector2` 形成的线段是否与此 `Rect` 相交。
- `intersectsLineSegment`：判断 `LineSegment` 是否与此 `Rect` 相交。
- `toVertices`：将此 `Rect` 的四个角转换为 `Vector2` 列表。
- `toFlameRectangle`：将此 `Rect` 转换为 Flame `Rectangle`。
- `toMathRectangle`：将此 `Rect` 转换为 `math.Rectangle`。
- `toGeometryRectangle`：将此 `Rect` 转换为 `flame-geom` 的 `Rectangle`。
- `transform`：使用 `Matrix4` 变换此 `Rect`。

工厂：

- `RectExtension.getBounds`：构造一个表示一组 `Vector2` 边界范围的 `Rect`。
- `RectExtension.fromCenter`：从中心点（使用 `Vector2`）构造一个 `Rect`。

### math.Rectangle

方法：

- `toRect`：将此数学 `Rectangle` 转换为 UI `Rect`。

### Size

方法：

- `toVector2`：从 `Size` 创建 `Vector2`。
- `toOffset`：从 `Size` 创建 `Offset`。
- `toPoint`：从 `Size` 创建 `Point`。
- `toRect`：从 `Size` 创建一个以 (0,0) 为原点并以该 `Size` 为大小的 `Rect`。

### Vector2

此类来自 `vector_math` 包，我们对包中提供的内容进行了一些有用的扩展方法。

方法：

- `toOffset`：从 `Vector2` 创建 `Offset`。
- `toPoint`：从 `Vector2` 创建 `Point`。
- `toRect`：从 `Vector2` 创建一个以 (0,0) 为原点并以该 `Vector2` 为大小的 `Rect`。
- `toPositionedRect`：从 `Vector2` 创建一个以 [x, y] 为原点并以该 `Vector2` 为大小的 `Rect`。
- `lerp`：线性插值两个 `Vector2`。
- `rotate`：使用指定的弧度旋转 `Vector2`，可以选择围绕定义的 `Vector2` 或中心旋转。
- `scaleTo`：将 `Vector2` 的长度更改为提供的 长度，而不改变方向。
- `moveToTarget`：平滑地将 `Vector2` 移动到目标方向指定的距离。

工厂：

- `Vector2Extension.fromInts`：创建一个具有整数输入的 `Vector2`。

操作符：

- `&`：将两个 `Vector2` 组合成一个 `Rect`，原点应在左侧，大小应在右侧。
- `%`：分别对 x 和 y 进行 `Vector2` 取模/余数。

### Matrix4

此类来自 `vector_math` 包。我们对包中已经提供的内容进行了一些扩展方法。

方法：

- `translate2`：通过给定的 `Vector2` 平移 `Matrix4`。
- `transform2`：使用 `Matrix4` 转换给定的 `Vector2`，创建一个新的 `Vector2`。
- `transformed2`：将输入的 `Vector2` 变换为输出 `Vector2`。

获取器：

- `m11`：第一行和第一列。
- `m12`：第一行和第二列。
- `m13`：第一行和第三列。
- `m14`：第一行和第四列。
- `m21`：第二行和第一列。
- `m22`：第二行和第二列。
- `m23`：第二行和第三列。
- `m24`：第二行和第四列。
- `m31`：第三行和第一列。
- `m32`：第三行和第二列。
- `m33`：第三行和第三列。
- `m34`：第三行和第四列。
- `m41`：第四行和第一列。
- `m42`：第四行和第二列。
- `m43`：第四行和第三列。
- `m44`：第四行和第四列。

工厂：

- `Matrix4Extension.scale`：通过传递一个 `Vector4` 或 `Vector2` 作为第一个参数，或者 x, y, z 双 输入来创建缩放的 `Matrix4`。