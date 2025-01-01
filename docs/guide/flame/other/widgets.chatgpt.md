# 小部件（Widgets）

使用 Flutter 开发游戏的一个优势是可以利用 Flutter 强大的 UI 构建工具集，Flame 通过引入专门为游戏设计的小部件来进一步扩展这一点。

在这里，您可以找到 Flame 提供的所有可用小部件。

您还可以查看所有在 [Dashbook](https://github.com/bluefireteam/dashbook) 沙盒中展示的小部件，详细信息请访问 [这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/widgets)。

## NineTileBoxWidget

Nine Tile Box 是一种使用网格精灵绘制的矩形。

该网格精灵是一个 3x3 的网格，由 9 个方块组成，代表 4 个角、4 条边和中间部分。

角落部分保持相同大小，边缘部分会在水平方向或垂直方向上拉伸，中间部分则会在两个方向上扩展。

`NineTileBoxWidget` 实现了一个使用这一标准的 `Container`。这种模式也作为 `NineTileBoxComponent` 被实现为一个组件，您可以将此功能直接添加到您的 `FlameGame` 中。有关此功能的更多信息，请查阅组件文档 [这里](../components.md#ninetileboxcomponent)。

以下是一个如何使用它的示例（不使用 `NineTileBoxComponent`）：

```dart
import 'package:flame/widgets';

NineTileBoxWidget(
    image: image, // dart:ui 图像实例
    tileSize: 16, // 网格图像中每个瓦片的宽度/高度
    destTileSize: 50, // 绘制瓦片时使用的尺寸
    child: SomeWidget(), // 任何 Flutter 小部件
)
```

## SpriteButton

`SpriteButton` 是一个简单的小部件，用于基于 Flame 精灵创建按钮。当您希望创建看起来不同于默认按钮的按钮时，这非常有用。例如，当您更容易通过图形编辑器绘制按钮，而不是直接在 Flutter 中创建时，使用它会更方便。

如何使用它：

```dart
SpriteButton(
    onPressed: () {
      print('Pressed');
    },
    label: const Text('Sprite Button', style: const TextStyle(color: const Color(0xFF5D275D))),
    sprite: _spriteButton,
    pressedSprite: _pressedSprite,
    height: _height,
    width: _width,
)
```

## SpriteWidget

`SpriteWidget` 是一个用于在小部件树中显示 [Sprite](../rendering/images.md#sprite) 的小部件。

如何使用它：

```dart
SpriteWidget(
    sprite: yourSprite,
    anchor: Anchor.center,
)
```

## SpriteAnimationWidget

`SpriteAnimationWidget` 是一个用于在小部件树中显示 [SpriteAnimations](../rendering/images.md#animation) 的小部件。

如何使用它：

```dart
SpriteAnimationWidget(
    animation: _animation,
    animationTicker: _animationTicker,
    playing: true,
    anchor: Anchor.center,
)
```