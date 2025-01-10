# 工具类文档

此页面记录了一些实用类和方法的用法。

---

## 设备类（Device Class）

```{warning}
此类中的许多方法仅适用于移动平台（Android 和 iOS）。

在其他平台上使用这些方法不会产生效果，并且在调试模式下运行时会在控制台打印警告。
```

可以通过 `Flame.device` 访问该类，使用它可以控制设备状态。例如，您可以更改屏幕方向或设置应用是否全屏显示。

### `Flame.device.fullScreen()`

调用后会禁用所有 `SystemUiOverlay`，使应用进入全屏模式。  
在主方法中调用时，应用会变为全屏（无顶部或底部导航栏）。

**注意:** 在 Web 平台上调用无效。

### `Flame.device.setLandscape()`

将整个应用（包括游戏）设置为横屏模式。根据操作系统和设备设置，可支持左横屏和右横屏方向。如需指定方向，请使用 `Flame.device.setLandscapeLeftOnly` 或 `Flame.device.setLandscapeRightOnly`。

**注意:** 在 Web 平台上调用无效。

### `Flame.device.setPortrait()`

将整个应用（包括游戏）设置为竖屏模式。根据操作系统和设备设置，可支持向上和向下的竖屏方向。如需指定方向，请使用 `Flame.device.setPortraitUpOnly` 或 `Flame.device.setPortraitDownOnly`。

**注意:** 在 Web 平台上调用无效。

### `Flame.device.setOrientation()` 和 `Flame.device.setOrientations()`

如果需要更精确地控制方向，可使用 `setOrientation`（接受单个 `DeviceOrientation` 参数）或 `setOrientations`（接受一个 `List<DeviceOrientation>` 参数）。

**注意:** 在 Web 平台上调用无效。

---

## 计时器（Timer）

Flame 提供了一个简单的计时器类，帮助您处理倒计时和计时状态的变化，例如事件触发。

### 倒计时示例：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyGame extends Game {
  final countdown = Timer(2);

  @override
  void update(double dt) {
    countdown.update(dt);
    if (countdown.finished) {
      // 倒计时结束后的处理
    }
  }
}
```

### 定时器间隔示例：

```dart
class MyGame extends Game {
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
}
```

`Timer` 也可以与 `TimerComponent` 一起用于 `FlameGame`。

### `TimerComponent` 示例：

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame {
  MyFlameGame() {
    add(
      TimerComponent(
        period: 10,
        repeat: true,
        onTick: () => print('10秒已过去'),
      )
    );
  }
}
```

---

## 时间缩放（Time Scale）

在许多游戏中，常需要根据某些事件创建慢动作或快进效果。  
通过使用 `HasTimeScale` 混入，可以更轻松地操控游戏时间或帧率。

```dart
import 'package:flame/components.dart';
import 'package:flame/game.dart';

class MyFlameGame extends FlameGame with HasTimeScale {
  void speedUp(){
    timeScale = 2.0;
  }

  void slowDown(){
    timeScale = 0.5;
  }
}
```

---

## 扩展方法

Flame 提供了一系列实用的扩展方法，这些方法旨在为开发者提供快捷方式和转换方法。以下是这些扩展方法的完整总结。

这些扩展方法可以通过 `package:flame/extensions.dart` 导入。

---

### Canvas 扩展

- **`scaleVector`**: 类似于 `Canvas` 的 `scale` 方法，但接受一个 `Vector2` 作为参数。
- **`translateVector`**: 类似于 `Canvas` 的 `translate` 方法，但接受一个 `Vector2` 作为参数。
- **`renderPoint`**: 在画布上渲染一个点（主要用于调试目的）。
- **`renderAt` 和 `renderRotated`**: 如果你直接在 `Canvas` 上渲染内容，可以使用这些函数方便地操作坐标，确保在正确的位置渲染内容。它们会临时更改 `Canvas` 的变换矩阵，但随后会重置。

---

### Color 扩展

- **方法**:
  - `darken`: 按 0 到 1 的值将颜色变暗。
  - `brighten`: 按 0 到 1 的值将颜色变亮。
- **工厂方法**:
  - `ColorExtension.fromRGBHexString`: 从有效的 RGB 十六进制字符串（如 `#1C1C1C`）解析颜色。
  - `ColorExtension.fromARGBHexString`: 从有效的 ARGB 十六进制字符串（如 `#FF1C1C1C`）解析颜色。

---

### Image 扩展

- **方法**:
  - `pixelsInUint8`: 获取图像的像素数据，格式为 `ImageByteFormat.rawRgba`，返回一个 `Uint8List`。
  - `getBoundingRect`: 获取图像的边界矩形，返回 `Rect`。
  - `size`: 返回图像的尺寸，以 `Vector2` 表示。
  - `darken`: 按 0 到 1 的值将图像每个像素变暗。
  - `brighten`: 按 0 到 1 的值将图像每个像素变亮。

---

### Offset 扩展

- **方法**:
  - `toVector2`: 将 `Offset` 转换为 `Vector2`。
  - `toSize`: 将 `Offset` 转换为 `Size`。
  - `toPoint`: 将 `Offset` 转换为 `Point`。
  - `toRect`: 创建一个以 (0,0) 为起点、以该 `Offset` 为右下角的 `Rect`。

---

### Rect 扩展

- **方法**:
  - `toOffset`: 创建一个 `Offset`，等于矩形的左上角点。
  - `toVector2`: 创建一个 `Vector2`，等于矩形的宽高。
  - `containsPoint`: 检查 `Rect` 是否包含一个 `Vector2` 点。
  - `intersectsSegment`: 检查由两个 `Vector2` 组成的线段是否与 `Rect` 相交。
  - `intersectsLineSegment`: 检查 `LineSegment` 是否与 `Rect` 相交。
  - `toVertices`: 将矩形的四个角转换为 `Vector2` 列表。
  - `toFlameRectangle`: 将 `Rect` 转换为 Flame 的 `Rectangle`。
  - `toMathRectangle`: 将 `Rect` 转换为 `math.Rectangle`。
  - `toGeometryRectangle`: 将 `Rect` 转换为 `flame-geom` 中的 `Rectangle`。
  - `transform`: 使用 `Matrix4` 转换 `Rect`。
- **工厂方法**:
  - `RectExtension.getBounds`: 根据一组 `Vector2` 创建包含它们的最小边界矩形。
  - `RectExtension.fromCenter`: 从中心点（以 `Vector2` 表示）创建矩形。

---

### math.Rectangle 扩展

- **方法**:
  - `toRect`: 将 `math.Rectangle` 转换为 Flutter 的 `Rect`。

---

### Size 扩展

- **方法**:
  - `toVector2`: 将 `Size` 转换为 `Vector2`。
  - `toOffset`: 将 `Size` 转换为 `Offset`。
  - `toPoint`: 将 `Size` 转换为 `Point`。
  - `toRect`: 创建一个从 (0,0) 开始，以该 `Size` 的宽高定义的 `Rect`。

---

### Vector2 扩展

`Vector2` 是 `vector_math` 包中的类，Flame 提供了以下扩展方法：

- **方法**:
  - `toOffset`: 将 `Vector2` 转换为 `Offset`。
  - `toPoint`: 将 `Vector2` 转换为 `Point`。
  - `toRect`: 创建一个从 (0,0) 开始的矩形，其宽高等于 `Vector2`。
  - `toPositionedRect`: 从 `Vector2` 的 (x, y) 位置开始，创建一个宽高等于另一个 `Vector2` 的矩形。
  - `lerp`: 将当前 `Vector2` 按线性插值方式移动到另一个 `Vector2`。
  - `rotate`: 按指定角度（以弧度为单位）围绕中心点旋转 `Vector2`。
  - `scaleTo`: 调整 `Vector2` 的长度为指定值，同时保持方向不变。
  - `moveToTarget`: 以给定距离平滑地移动到目标方向。
- **工厂方法**:
  - `Vector2Extension.fromInts`: 使用整数值创建 `Vector2`。
- **运算符**:
  - `&`: 将两个 `Vector2` 组合成一个矩形，左操作数为起点，右操作数为尺寸。
  - `%`: 对两个 `Vector2` 的 x 和 y 分别进行取模运算。

---

### Matrix4 扩展

`Matrix4` 是来自 `vector_math` 包的类，Flame 提供了以下扩展方法：

- **方法**:
  - `translate2`: 使用 `Vector2` 对 `Matrix4` 进行平移操作。
  - `transform2`: 使用 `Matrix4` 转换 `Vector2`，并返回新的 `Vector2`。
  - `transformed2`: 将输入 `Vector2` 使用 `Matrix4` 转换为输出 `Vector2`。
- **属性**:
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
- **工厂方法**:
  - `Matrix4Extension.scale`: 创建一个缩放矩阵，可以接受 `Vector2` 或 x、y、z 值作为参数。

---