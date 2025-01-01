# 图像

首先，你需要有一个合适的文件夹结构，并将文件添加到 `pubspec.yaml`
文件中，如下所示：

```yaml
flutter:
  assets:
    - assets/images/player.png
    - assets/images/enemy.png
```

图像可以是 Flutter 支持的任何格式，包括：JPEG, WebP, PNG, GIF, 动态 GIF,
动态 WebP, BMP 和 WBMP。其他格式可能需要额外的库。例如，可以通过 `flame_svg` 库加载 SVG 图像。

## 加载图像

Flame 提供了一个名为 `Images` 的实用工具类，可让你轻松地将资产目录中的图像加载并缓存到内存中。

Flutter 与图像相关的类型有很多，在将本地资产正确转换为可以在 Canvas 上绘制的 `Image` 过程上有些复杂。此类允许你使用 `drawImageRect` 方法在 `Canvas` 上获得一个可以绘制的 `Image`。

它会根据文件名自动缓存加载的任何图像，因此你可以安全地多次调用它。

用于加载和清除缓存的方法是：`load`, `loadAll`, `clear` 和 `clearCache`。
它们返回用于加载图像的 `Future`。在以任何方式使用图像之前必须等待这些 `Future` 完成。
如果你不想立即等待这些 `Future`，可以先发起多个 `load()` 操作，然后通过调用 `Images.ready()` 方法一次性等待所有加载完成。

要同步检索先前缓存的图像，可以使用 `fromCache` 方法。如果之前没有加载具有该键的图像，则会抛出异常。

要将已加载的图像添加到缓存中，可以使用 `add` 方法，并设置该图像在缓存中的键。
可以通过 `keys` getter 获取缓存中的所有键。

还可以使用 `ImageExtension.fromPixels()` 在游戏中动态创建图像。

对于 `clear` 和 `clearCache`，请注意从缓存中移除的每个图像都会调用其 `dispose` 方法，因此请确保在之后不再使用该图像。


### 独立使用

可以通过实例化来手动使用它：

```dart
import 'package:flame/cache.dart';
final imagesLoader = Images();
Image image = await imagesLoader.load('yourImage.png');
```

但 Flame 还提供了两种无需自行实例化此类的方法。

### Flame.images

`Flame` 类提供了一个单例，可以用作全局图像缓存。

示例：

```dart
import 'package:flame/flame.dart';
import 'package:flame/sprite.dart';

// 在异步上下文中
Image image = await Flame.images.load('player.png');

final playerSprite = Sprite(image);
```

### Game.images

`Game` 类还提供了用于处理图像加载的一些实用方法。它包含一个 `Images` 类的实例，可用于在游戏期间加载图像资源。
当游戏部件从部件树中移除时，游戏会自动释放缓存。

可以从 `Game` 类的 `onLoad` 方法中加载初始资产。

示例：

```dart
class MyGame extends Game {

  Sprite player;

  @override
  Future<void> onLoad() async {
    // 注意，你也可以使用 Sprite.load 来实现这一点。
    final playerImage = await images.load('player.png');
    player = Sprite(playerImage);
  }
}
```

加载的资源在游戏运行时也可以通过 `images.fromCache` 获取，例如：

```dart
class MyGame extends Game {

  // 省略属性

  @override
  Future<void> onLoad() async {
    // 省略其他加载项
    await images.load('bullet.png');
  }

  void shoot() {
    // 这只是一个示例，在你的游戏中可能不希望每次射击时都实例化新的 [Sprite] 对象。
    final bulletSprite = Sprite(images.fromCache('bullet.png'));
    _bullets.add(bulletSprite);
  }
}
```

## 网络加载图像

Flame 核心包没有提供用于从网络加载图像的内置方法。

原因在于 Flutter/Dart 没有内置的 http 客户端，这需要使用一个包，并且由于有多个可用的包，我们不强制用户使用特定的包。

尽管如此，一旦用户选择了 http 客户端包，从网络加载图像是相当简单的。以下代码片段展示了如何使用 [http](https://pub.dev/packages/http) 包从 Web 获取 `Image`。

```dart
import 'package:http/http.dart' as http;
import 'package:flutter/painting.dart';

final response = await http.get(Uri.parse('https://url.com/image.png'));
final image = await decodeImageFromList(response.bodyBytes);
```

```{note}
检查 [`flame_network_assets`](https://pub.dev/packages/flame_network_assets)
以获取现成的网络资源解决方案，该解决方案提供了内置缓存。
```

## Sprite

Flame 提供了一个 `Sprite` 类，它代表一个图像或图像的一部分。

你可以通过提供一个 `Image` 和定义精灵所表示的部分图像的坐标来创建一个 `Sprite`。

例如，这将创建一个代表传递的文件整个图像的精灵：

```dart
final image = await images.load('player.png');
Sprite player = Sprite(image);
```

你还可以指定原始图像中精灵的位置坐标。这允许使用精灵图集并减少内存中的图像数量，例如：

```dart
final image = await images.load('player.png');
final playerFrame = Sprite(
  image,
  srcPosition: Vector2(32.0, 0),
  srcSize: Vector2(16.0, 16.0),
);
```

`srcPosition` 的默认值为 `(0.0, 0.0)`，而 `srcSize` 的默认值为 `null`（这意味着它将使用源图像的完整宽度/高度）。

`Sprite` 类有一个 render 方法，允许你将精灵渲染到 `Canvas` 上：

```dart
final image = await images.load('block.png');
Sprite block = Sprite(image);

// 在你的 render 方法中
block.render(canvas, Vector2(16.0, 16.0)); // canvas, size
```

必须向 render 方法传递大小，图像将相应地调整大小。

`Sprite` 类的所有渲染方法都可以接收一个可选命名参数 `overridePaint` 的 `Paint` 实例，该参数将在渲染调用期间覆盖当前的 `Sprite` paint 实例。

`sprites` 也可以作为 widget 使用，为此请使用 `SpriteWidget` 类。
这是一个完整的
[示例，将 sprite 作为 widget](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/sprite_widget_example.dart)。


## SpriteBatch

如果你有一个精灵图集（也称为图像图集，即包含较小图像的图像），并且希望有效地渲染它 - `SpriteBatch` 可以处理这项工作。

只需提供图像的文件名，然后添加描述该图像各个部分的矩形，以及变换（位置、缩放和旋转）和可选颜色。

你可以使用 `Canvas` 和可选的 `Paint`、`BlendMode` 和 `CullRect` 进行渲染。

还提供了方便的 `SpriteBatchComponent`。

有关如何使用的示例，请参见
[SpriteBatch 示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/sprites/sprite_batch_example.dart)

## ImageComposition

在某些情况下，你可能希望将多个图像合并为一个单一图像；这称为
[合成](https://zh.wikipedia.org/wiki/图像合成)。例如，在使用 [SpriteBatch](#spritebatch) API 时优化你的绘制调用时，这非常有用。

对于此类用例，Flame 提供了 `ImageComposition` 类。这允许你将多个图像添加到新的图像中，每个图像都有自己的位置：

```dart
final composition = ImageComposition()
  ..add(image1, Vector2(0, 0))
  ..add(image2, Vector2(64, 0));
  ..add(image3,
    Vector2(128, 0),
    source: Rect.fromLTWH(32, 32, 64, 64),
  );
  
Image image = await composition.compose();
Image imageSync = composition.composeSync();
```

可以看到，有两个版本的图像合成可用。对于异步方法，请使用 `ImageComposition.compose()`。
或者使用新的 `ImageComposition.composeSync()` 函数利用 `Picture.toImageSync` 函数的好处将图像栅格化到 GPU 上下文中。

**注意：** 合成图像是昂贵的操作，我们不建议你在每帧都运行此操作，因为它严重影响性能。相反，我们建议预先渲染组合，以便只需重用输出图像。

## 动画

Animation 类帮助你创建一个循环的精灵动画。

你可以通过传递相同大小的精灵列表和 stepTime（即移动到下一帧所需的秒数）来创建它：

```dart
final a = SpriteAnimationTicker(SpriteAnimation.spriteList(sprites, stepTime: 0.02));
```

创建动画后，你需要调用其 `update` 方法，并在游戏实例上渲染当前帧的精灵。

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
    a.getSprite().render(c, Vector2(16.0, 16.0));
  }
}
```

生成精灵列表的一个更好的替代方案是使用 `fromFrameData` 构造函数：

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

使用精灵图集时，这个构造函数可以非常轻松地创建 `Animation`。

在构造函数中传递一个图像实例和帧数据，其中包含描述动画的一些参数。检查 `SpriteAnimationFrameData` 类上的可用构造函数以查看所有参数。

如果你使用 Aseprite 进行动画制作，Flame 也提供了对 Aseprite 动画 JSON 数据的支持。
要使用此功能，你需要导出精灵图集的 JSON 数据，并使用类似以下代码片段的内容：

```dart
final image = await images.load('chopper.png');
final jsonData = await Flame.assets.readJson('chopper.json');
final animation = SpriteAnimation.fromAsepriteData(image, jsonData);
```

**注意：** Flame 不支持修剪过的精灵图集，因此如果你以这种方式导出你的精灵图集，
它将具有修剪后的尺寸而不是原始的精灵尺寸。

创建后，动画具有 `update` 和 `render` 方法；后者渲染当前帧，而前者更新内部时钟以更新帧。

通常在 `SpriteAnimationComponent` 中使用动画，但也可以创建带有多个动画的自定义组件。

要了解更多信息，请查看
[将动画用作 widget 的完整示例代码](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/sprite_animation_widget_example.dart)。

## SpriteSheet

精灵图集是一张包含同一精灵不同帧的大图像，是组织和存储你的动画非常有效的方法。Flame 提供了一个处理精灵图集的简单实用工具类。
使用它可以加载精灵图集图像并从中提取动画。以下是使用它的简单示例：

```dart
import 'package:flame/sprite.dart';

final spriteSheet = SpriteSheet(
  image: imageInstance,
  srcSize: Vector2.all(16.0),
);

final animation = spriteSheet.createAnimation(0, stepTime: 0.1);
```

现在可以直接使用动画或在动画组件中使用。

还可以通过 `SpriteSheet.createFrameData` 或 `SpriteSheet.createFrameDataFromId` 获取单独的 `SpriteAnimationFrameData` 来创建自定义动画：

```dart
final animation = SpriteAnimation.fromFrameData(
  imageInstance, 
  SpriteAnimationData([
    spriteSheet.createFrameDataFromId(1, stepTime: 0.1), // 根据 ID
    spriteSheet.createFrameData(2, 3, stepTime: 0.3), // 行，列
    spriteSheet.createFrameDataFromId(4, stepTime: 0.1), // 根据 ID
  ]),
);
```

如果你不需要任何动画，只需要获取 `SpriteSheet` 上的 `Sprite` 实例，
可以使用 `getSprite` 或 `getSpriteById` 方法：

```dart
spriteSheet.getSpriteById(2); // 根据 ID
spriteSheet.getSprite(0, 0); // 行，列
```

有关如何处理它的详细信息，请参见 [`SpriteSheet` 类](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/sprites/sprite_sheet_example.dart) 的完整示例。