# 调色板（Palette）

在游戏开发中，你会在很多地方需要使用颜色。`dart:ui` 提供了两个相关的类：`Color` 和 `Paint`。

## **`Color` 类**

`Color` 类以十六进制整数格式表示 ARGB 颜色。要创建一个 `Color` 实例，只需要以 ARGB 格式将颜色作为整数传递即可。

你可以使用 Dart 的十六进制表示法来简化操作。例如：`0xFF00FF00` 表示完全不透明的绿色（格式为 `0xAARRGGBB`）。

**注意：** 与常规（非 A）RGB 不同，前两个十六进制数字用于表示 alpha 通道（透明度）。`FF`（255）表示完全不透明，`00`（0）表示完全透明。

在 Flutter 的 Material 包中，有一个 `Colors` 类提供了一些常用颜色的常量，例如：

```dart
import 'package:flutter/material.dart' show Colors;

const black = Colors.black;
```

---

## **`Paint` 类**

一些更复杂的方法可能需要使用 `Paint` 对象。`Paint` 是一个更全面的结构，可以配置与描边、颜色、滤镜以及混合相关的属性。

通常，在使用复杂的 API 时，你可能只需要一个表示单一纯色的 `Paint` 实例。例如：

```dart
Paint green = Paint()..color = const Color(0xFF00FF00);
```

**注意：** 我们不建议每次需要特定 `Paint` 时都新建一个对象，因为这可能会导致大量不必要的对象被创建。更好的方法是：

1. 定义一个可以复用的 `Paint` 对象（但要注意 `Paint` 类是可变的，与 `Color` 不同）。
2. 使用 `Palette` 类，统一定义游戏中使用的所有颜色。

---

## **Flame 的 `Palette` 类**

为了帮助你管理颜色并保持游戏调色板的一致性，Flame 提供了 `Palette` 类。通过它，你可以轻松地访问 `Color` 和 `Paint`，并将游戏中使用的颜色定义为常量，避免混淆。

### **`BasicPalette` 类**

`BasicPalette` 是一个简单的调色板示例，提供了黑色和白色。例如，可以通过以下方式访问黑色或白色：

- 使用 `color` 属性：

```dart
TextConfig regular = TextConfig(color: BasicPalette.white.color);
```

- 使用 `paint` 属性：

```dart
canvas.drawRect(rect, BasicPalette.black.paint);
```

### **自定义调色板**

通常情况下，你会根据 `BasicPalette` 的示例创建自己的调色板，并定义游戏的颜色方案。这样，你就可以在组件和类中静态访问任何颜色。

以下是一个自定义 `Palette` 的示例，来自 [示例游戏 BGUG](https://github.com/bluefireteam/bgug/blob/master/lib/palette.dart)：

```dart
import 'dart:ui';

import 'package:flame/palette.dart';

class Palette {
  static PaletteEntry white = BasicPalette.white;

  static PaletteEntry toastBackground = PaletteEntry(Color(0xFFAC3232));
  static PaletteEntry toastText = PaletteEntry(Color(0xFFDA9A00));

  static PaletteEntry grey = PaletteEntry(Color(0xFF404040));
  static PaletteEntry green = PaletteEntry(Color(0xFF54a286));
}
```

---

### **`PaletteEntry` 类**

`PaletteEntry` 是一个 `const` 类，用于保存颜色信息。它包含以下成员：

- **`color`**：返回指定的 `Color`。
- **`paint`**：创建一个具有指定颜色的新 `Paint`。`Paint` 是一个非 `const` 类，因此每次调用此方法都会创建一个全新的实例，适合在渲染时动态调整属性。