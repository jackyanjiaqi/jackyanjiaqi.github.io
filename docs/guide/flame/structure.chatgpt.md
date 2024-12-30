# 结构

Flame 为您的项目提供了一个建议的结构，除了标准的 Flutter `assets` 目录外，还包括一些子目录：`audio`、`images` 和 `tiles`。

如果使用以下示例代码：

```dart
void main() {
  FlameAudio.play('explosion.mp3');

  Flame.images.load('player.png');
  Flame.images.load('enemy.png');
  
  final map1 = TiledComponent.load('level.tmx', tileSize);
  
  final map2 = await SpriteFusionTilemapComponent.load(
    mapJsonFile: 'map.json',
    spriteSheetFile: 'spritesheet.png'
  );
}
```

Flame 期望文件位于以下结构中：

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

您可以选择将 `audio` 文件夹拆分成两个子文件夹，一个用于 `music`，一个用于 `sfx`。

不要忘记将这些文件添加到 `pubspec.yaml` 文件中：

```yaml
flutter:
  assets:
    - assets/audio/explosion.mp3
    - assets/images/player.png
    - assets/images/enemy.png
    - assets/tiles/level.tmx
```

如果您想更改此结构，可以通过使用 `prefix` 参数并创建 `AssetsCache`、`Images` 和 `AudioCache` 的实例，而不是使用 Flame 提供的全局实例来实现。

另外，`AssetsCache` 和 `Images` 可以接收自定义的 [`AssetBundle`](https://api.flutter.dev/flutter/services/AssetBundle-class.html)。这可以用于让 Flame 从不同的位置查找资源，而不是使用 `rootBundle`，例如从文件系统中查找。