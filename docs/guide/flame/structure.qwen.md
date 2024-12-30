# 结构

Flame 为你的项目提出了一种结构，其中包括标准的 Flutter `assets` 目录以及一些子目录：`audio`、`images` 和 `tiles`。

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

Flame 预期的文件结构如下：

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

可选地，你可以将 `audio` 文件夹拆分为两个子文件夹，一个用于 `music`，另一个用于 `sfx`。

不要忘记在你的 `pubspec.yaml` 文件中添加这些文件：

```yaml
flutter:
  assets:
    - assets/audio/explosion.mp3
    - assets/images/player.png
    - assets/images/enemy.png
    - assets/tiles/level.tmx
```

如果你想更改此结构，可以通过使用 `prefix` 参数并创建你自己的 `AssetsCache`、`Images` 和 `AudioCache` 实例来实现，而不是使用 Flame 提供的全局实例。

此外，`AssetsCache` 和 `Images` 可以接收自定义的 [`AssetBundle`](https://api.flutter.dev/flutter/services/AssetBundle-class.html)。
这可以用于让 Flame 在不同的位置查找资源，例如文件系统。
```