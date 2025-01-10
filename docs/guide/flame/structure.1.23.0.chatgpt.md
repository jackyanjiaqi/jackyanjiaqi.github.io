# 资源目录结构

Flame 提供了一种建议的项目目录结构，其中包括标准的 Flutter `assets` 目录以及一些子目录：`audio`、`images` 和 `tiles`。

如果使用以下示例代码：

```dart
class MyGame extends FlameGame {
  @override
  Future<void> onLoad() async {
    await FlameAudio.play('explosion.mp3');

    // 加载一些图片
    await Flame.images.load('player.png');
    await Flame.images.load('enemy.png');
    
    // 或者加载 images 文件夹中的所有图片
    await Flame.images.loadAllImages();

    final map1 = await TiledComponent.load('level.tmx', tileSize);
  }
}
```

以下是 Flame 期望找到文件的目录结构：

```text
.
└── assets
    ├── audio
    │   └── explosion.mp3
    ├── images
    │   ├── enemy.png
    │   ├── player.png
    │   └── spritesheet.png
    └── tiles
        ├── level.tmx
        └── map.json
```

您可以选择将 `audio` 文件夹进一步划分为两个子文件夹：一个用于 `music`，另一个用于 `sfx`。

别忘了在 `pubspec.yaml` 文件中添加这些资源文件：

```yaml
flutter:
  assets:
    - assets/audio/explosion.mp3
    - assets/images/player.png
    - assets/images/enemy.png
    - assets/tiles/level.tmx
```

如果您想更改此结构，可以使用 `prefix` 参数，并创建您自己的 `AssetsCache`、`Images` 和 `AudioCache` 实例，而不是使用 Flame 提供的全局实例。

此外，`AssetsCache` 和 `Images` 还可以接受自定义的 [`AssetBundle`](https://api.flutter.dev/flutter/services/AssetBundle-class.html)。这可以用于让 Flame 从其他位置（例如文件系统）而不是默认的 `rootBundle` 中加载资源。