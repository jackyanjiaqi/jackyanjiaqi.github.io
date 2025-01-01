# 图像

首先，您需要有一个合适的文件夹结构，并将文件添加到 `pubspec.yaml` 文件中，如下所示：

```yaml
flutter:
  assets:
    - assets/images/player.png
    - assets/images/enemy.png
```

图像可以是 Flutter 支持的任何格式，包括：JPEG、WebP、PNG、GIF、动画 GIF、动画 WebP、BMP 和 WBMP。其他格式需要额外的库。例如，SVG 图像可以通过 `flame_svg` 库加载。

---

## 加载图像

Flame 提供了一个名为 `Images` 的实用类，可以轻松地从资源目录加载和缓存图像到内存中。

Flutter 有许多与图像相关的类型，从本地资源转换为可以在 Canvas 上绘制的 `Image` 稍显复杂。这个类允许您获得可以通过 `drawImageRect` 方法在 `Canvas` 上绘制的 `Image`。

`Images` 类会自动缓存通过文件名加载的任何图像，因此可以安全地多次调用。

用于加载和清除缓存的方法包括：`load`、`loadAll`、`clear` 和 `clearCache`。这些方法返回加载图像的 `Future`，在使用图像之前必须等待这些 `Future` 完成。如果您不想立即等待这些 `Future`，可以启动多个 `load()` 操作，然后使用 `Images.ready()` 方法一次性等待所有操作完成。

如果需要同步检索之前缓存的图像，可以使用 `fromCache` 方法。如果缓存中不存在对应键的图像，会抛出异常。

要将已经加载的图像添加到缓存中，可以使用 `add` 方法，并指定缓存中图像的键。通过 `keys` 属性，可以获取缓存中的所有键。

您还可以使用 `ImageExtension.fromPixels()` 在游戏中动态创建图像。

对于 `clear` 和 `clearCache`，请注意，这些操作会为每个从缓存中移除的图像调用 `dispose`，因此请确保之后不再使用这些图像。

---

### 独立使用

可以通过实例化来手动使用 `Images` 类：

```dart
import 'package:flame/cache.dart';
final imagesLoader = Images();
Image image = await imagesLoader.load('yourImage.png');
```

但 Flame 提供了两种无需自己实例化的使用方式。

---

### Flame.images

`Flame` 类提供了一个单例，作为全局图像缓存使用。

示例：

```dart
import 'package:flame/flame.dart';
import 'package:flame/sprite.dart';

// 在异步上下文中
Image image = await Flame.images.load('player.png');

final playerSprite = Sprite(image);
```

---

### Game.images

`Game` 类也提供了加载图像的实用方法。它包含一个 `Images` 类的实例，用于加载游戏中需要的图像资源。当游戏组件从组件树中移除时，缓存会自动释放。

可以在 `Game` 类的 `onLoad` 方法中加载初始资源。

示例：

```dart
class MyGame extends Game {

  Sprite player;

  @override
  Future<void> onLoad() async {
    // 也可以使用 Sprite.load
    final playerImage = await images.load('player.png');
    player = Sprite(playerImage);
  }
}
```

在游戏运行时，也可以通过 `images.fromCache` 检索已加载的资源。例如：

```dart
class MyGame extends Game {

  // 省略属性

  @override
  Future<void> onLoad() async {
    // 省略其他加载
    await images.load('bullet.png');
  }

  void shoot() {
    // 示例中，每次射击都实例化一个新的 [Sprite]，实际游戏中可能并不推荐这样做。
    final bulletSprite = Sprite(images.fromCache('bullet.png'));
    _bullets.add(bulletSprite);
  }
}
```

---

## 从网络加载图像

Flame 核心包不提供内置的方法来从网络加载图像。

原因是 Flutter/Dart 没有内置的 HTTP 客户端，这需要使用外部包。由于有多个可用的 HTTP 包，Flame 避免强制用户使用特定的包。

不过，一旦选择了 HTTP 客户端包，从网络加载图像相当简单。以下是使用 [http](https://pub.dev/packages/http) 包从网络获取 `Image` 的示例：

```dart
import 'package:http/http.dart' as http;
import 'package:flutter/painting.dart';

final response = await http.get('https://url.com/image.png');
final image = await decodeImageFromList(response.bytes);
```

```{note}
可以查看 [`flame_network_assets`](https://pub.dev/packages/flame_network_assets)，该包提供了一个内置缓存的网络资源解决方案。
```

---

## Sprite

Flame 提供了一个 `Sprite` 类，表示一个图像或图像的某一部分。

您可以通过提供一个 `Image` 和定义图像片段的坐标来创建一个 `Sprite`。

例如，这将创建一个表示图像完整内容的精灵：

```dart
final image = await images.load('player.png');
Sprite player = Sprite(image);
```

您还可以指定原始图像中精灵所在的坐标。这使得您能够使用精灵图，并减少内存中图像的数量。例如：

```dart
final image = await images.load('player.png');
final playerFrame = Sprite(
  image,
  srcPosition: Vector2(32.0, 0),
  srcSize: Vector2(16.0, 16.0),
);
```

默认值为 `(0.0, 0.0)` 的 `srcPosition` 和 `null` 的 `srcSize`（意味着它将使用源图像的完整宽度和高度）。

`Sprite` 类有一个 `render` 方法，允许您将精灵渲染到 `Canvas` 上：

```dart
final image = await images.load('block.png');
Sprite block = Sprite(image);

// 在渲染方法中
block.render(canvas, 16.0, 16.0); // canvas, width, height
```

您必须将大小传递给渲染方法，图像会相应调整大小。

`Sprite` 类的所有渲染方法都可以接收一个名为 `overridePaint` 的可选参数 `Paint` 实例，该参数会覆盖该渲染调用的当前 `Sprite` paint 实例。

`Sprite` 也可以作为小部件使用，可以使用 `SpriteWidget` 类来实现。以下是一个使用精灵作为小部件的完整示例：[SpriteWidget 示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/sprite_widget_example.dart)。

---

## SpriteBatch

如果您有一个精灵图（也称为图像图集，它是包含多个小图像的大图），并希望高效地渲染它，`SpriteBatch` 可以帮您完成这项工作。

将图像的文件名传入 `SpriteBatch`，然后添加描述图像各部分的矩形，此外，还可以添加变换（位置、缩放和旋转）以及可选的颜色。

您可以通过 `Canvas` 和可选的 `Paint`、`BlendMode` 和 `CullRect` 渲染它。

`SpriteBatchComponent` 也是为了方便您使用而提供的。

请查看 [SpriteBatch 示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/sprites/sprite_batch_example.dart) 来了解如何使用它。

---

## 图像合成

在某些情况下，您可能希望将多个图像合成成一个图像，这称为 [合成](https://en.wikipedia.org/wiki/Compositing)。例如，在使用 [SpriteBatch](#spritebatch) API 来优化绘制调用时，这非常有用。

Flame 提供了 `ImageComposition` 类来处理这种情况。您可以将多个图像添加到新图像中，每个图像都有自己的位置：

```dart
final composition = ImageComposition()
  ..add(image1, Vector2(0, 0))
  ..add(image2, Vector2(64, 0))
  ..add(image3, Vector2(128, 0), source: Rect.fromLTWH(32, 32, 64, 64));
  
Image image = await composition.compose();
Image imageSync = composition.composeSync();
```

如您所见，提供了两种合成图像的方式。使用 `ImageComposition.compose()` 进行异步操作，或者使用 `ImageComposition.composeSync()` 函数，在 GPU 上以同步方式栅格化图像，利用 `Picture.toImageSync` 函数的优势。

**注意：** 图像合成是一个资源消耗较大的操作，我们不建议每个帧都执行此操作，因为这会严重影响性能。相反，我们建议您预先渲染合成图像，以便重复使用。

---

## 动画

`Animation` 类帮助您创建一个精灵的循环动画。

您可以通过传入一个大小相等的精灵列表和 `stepTime`（即移动到下一帧所需的秒数）来创建动画：

```dart
final a = SpriteAnimationTicker(SpriteAnimation.spriteList(sprites, stepTime: 0.02));
```

动画创建后，您需要调用其 `update` 方法，并渲染当前帧的精灵到您的游戏实例中。

示例：

```dart
class MyGame extends Game {
  SpriteAnimationTicker a;

  MyGame() {
    a = SpriteAnimationTicker(SpriteAnimation(...));
  }

  void update(double dt) {
    a.update(dt);
  }

  void render(Canvas c) {
    a.getSprite().render(c);
  }
}
```

一个更好的创建精灵列表的方式是使用 `fromFrameData` 构造函数：

```dart
const amountOfFrames = 8;
final a = SpriteAnimation.fromFrameData(
    imageInstance,
    SpriteAnimationFrame.sequenced(
      amount: amountOfFrames,
      textureSize: Vector2(16.0, 16.0),
      stepTime: 0.1,
    ),
);
```

此构造函数使得使用精灵图创建 `Animation` 变得非常简单。

在构造函数中，您传入一个图像实例和帧数据，帧数据包含了一些参数，可以用来描述动画。请查看 `SpriteAnimationFrameData` 类中的构造函数文档，以了解所有可用的参数。

如果您使用 Aseprite 创建动画，Flame 支持 Aseprite 动画的 JSON 数据。要使用此功能，您需要导出精灵图的 JSON 数据，并使用如下代码：

```dart
final image = await images.load('chopper.png');
final jsonData = await assets.readJson('chopper.json');
final animation = SpriteAnimation.fromAsepriteData(image, jsonData);
```

**注意：** Flame 不支持修剪过的精灵图，因此，如果您导出精灵图，它将具有修剪后的大小，而不是精灵的原始大小。

创建动画后，它们会有 `update` 和 `render` 方法；后者用于渲染当前帧，前者则更新帧的时间。

动画通常在 `SpriteAnimationComponent` 中使用，但也可以创建包含多个动画的自定义组件。

要了解更多，请查看完整的示例代码：[使用动画作为小部件的示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/sprite_animation_widget_example.dart)。

---

## SpriteSheet

精灵图是包含多个同一精灵帧的大图，是组织和存储动画的一个非常好的方式。Flame 提供了一个非常简单的实用类来处理精灵图，您可以使用它加载精灵图像并从中提取动画。以下是如何使用它的简单示例：

```dart
import 'package:flame/sprite.dart';

final spriteSheet = SpriteSheet(
  image: imageInstance,
  srcSize: Vector2.all(16.0),
);

final animation = spriteSheet.createAnimation(0, stepTime: 0.1);
```

现在，您可以直接使用该动画，或将其用于动画组件。

您还可以通过 `SpriteSheet.createFrameData` 或 `SpriteSheet.createFrameDataFromId` 获取单独的 `SpriteAnimationFrameData` 来创建自定义动画：

```dart
final animation = SpriteAnimation.fromFrameData(
  imageInstance, 
  SpriteAnimationData([
    spriteSheet.createFrameDataFromId(1, stepTime: 0.1), // 根据 id
    spriteSheet.createFrameData(2, 3, stepTime: 0.3), // 行和列
    spriteSheet.createFrameDataFromId(4, stepTime: 0.1), // 根据 id
  ]),
);
```

如果您不需要任何动画，只是想从 `SpriteSheet` 获取一个 `Sprite` 实例，可以使用 `getSprite` 或 `getSpriteById` 方法：

```dart
spriteSheet.getSpriteById(2); // 根据 id
spriteSheet.getSprite(0, 0); // 行和列
```

查看完整的 [`SpriteSheet` 类示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/sprites/sprite_sheet_example.dart) 以获取更多关于如何使用它的详细信息。

---