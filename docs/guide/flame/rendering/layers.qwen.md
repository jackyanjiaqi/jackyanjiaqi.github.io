# 层和快照

层和快照共享一些共同的功能，包括预渲染和缓存对象以提高性能。然而，它们也有独特的功能，使其更适合不同的用例。

`Snapshot` 是一个可以添加到任何 `PositionComponent` 的混入类。使用场景包括：

- 将其混入到现有的游戏对象（这些对象是 `PositionComponents`）。
- 缓存复杂的渲染游戏对象，如精灵。
- 在不需要每次重新渲染的情况下绘制相同对象多次。
- 捕获图像快照以保存为屏幕截图（例如）。

`Layer` 是一个类。使用或扩展此类的场景包括：

- 使用逻辑层结构化你的游戏（例如 UI、前景、主内容、背景）。
- 将对象分组形成复杂的场景，然后对其进行缓存（例如背景层）。
- 处理器支持。层允许用户定义的处理器在渲染前后运行。

## 层

层允许你按上下文对渲染进行分组，并且可以预渲染东西。这使得你可以将游戏中不经常变化的部分（如背景）预先渲染并存储到内存中，从而释放处理能力用于需要每帧渲染的动态内容。

Flame中有两种类型的层：

- `DynamicLayer`：适用于移动或变化的事物。
- `PreRenderedLayer`：适用于静态的事物。

### DynamicLayer

动态层是每次在画布上绘制时都会被重新渲染的层。顾名思义，它适合用于动态内容，并且最适合对具有相同上下文的对象进行分组渲染。

使用示例：

```dart
class GameLayer extends DynamicLayer {
  final MyGame game;

  GameLayer(this.game);

  @override
  void drawLayer() {
    game.playerSprite.render(
      canvas,
      position: game.playerPosition,
    );
    game.enemySprite.render(
      canvas,
      position: game.enemyPosition,
    );
  }
}

class MyGame extends Game {
  // 其他方法省略...

  @override
  void render(Canvas canvas) {
    gameLayer.render(canvas); // 可选的 x 和 y 参数可以作为位置参数提供
  }
}
```

### PreRenderedLayer

预渲染层只被渲染一次，然后缓存到内存中，并在后续的游戏画布上复制显示。这对于缓存游戏过程中不变的内容（如背景）非常有用。

使用示例：

```dart
class BackgroundLayer extends PreRenderedLayer {
  final Sprite sprite;

  BackgroundLayer(this.sprite);

  @override
  void drawLayer() {
    sprite.render(
      canvas,
      position: Vector2(50, 200),
    );
  }
}

class MyGame extends Game {
  // 其他方法省略...

  @override
  void render(Canvas canvas) {
    // 可选的 x 和 y 参数可以作为位置参数提供。
    backgroundLayer.render(canvas);
  }
}
```

### 层处理器

Flame 还提供了一种在层上添加处理器的方式，这可以通过对整个层应用效果。目前内置的唯一处理器是 `ShadowProcessor`，它会在你的层上渲染一个背景阴影。

要向层添加处理器，只需将其添加到层的 `preProcessors` 或 `postProcessors` 列表中：

```dart
// 适用于 DynamicLayer 和 PreRenderedLayer
class BackgroundLayer extends PreRenderedLayer {
  final Sprite sprite;

  BackgroundLayer(this.sprite) {
    preProcessors.add(ShadowProcessor());
  }

  @override
  void drawLayer() { /* 省略 */ }

  // ...
```

可以通过继承 `LayerProcessor` 类来创建自定义处理器。

参见 [一个层次工作的示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/layers_example.dart)。

## 快照

快照是层的替代方案。`Snapshot` 混入可以应用于任何 `PositionComponent`。

```dart
class SnapshotComponent extends PositionComponent with Snapshot {}

class MyGame extends FlameGame {
  late final SnapshotComponent root;

  @override
  Future<void> onLoad() async {
    // 添加一个快照组件。
    root = SnapshotComponent();
    add(root);
  }
}
```

### 作为快照渲染

将快照启用组件的 `renderSnapshot` 设置为 `true`（默认值）的行为类似于 `PreRenderedLayer`。该组件只被渲染一次，然后缓存到内存中，并在后续的游戏画布上复制显示。这对于缓存游戏过程中不变的内容（如背景）非常有用。

```dart
class SnapshotComponent extends PositionComponent with Snapshot {}

class MyGame extends FlameGame {
  late final SnapshotComponent root;
  late final SpriteComponent background1;
  late final SpriteComponent background2;

  @override
  Future<void> onLoad() async {
    // 添加一个快照组件。
    root = SnapshotComponent();
    add(root);

    // 添加一些子对象。
    final background1Sprite = Sprite(await images.load('background1.png'));
    background1 = SpriteComponent(sprite: background1Sprite);
    root.add(background1);

    final background2Sprite = Sprite(await images.load('background2.png'));
    background2 = SpriteComponent(sprite: background2Sprite);
    root.add(background2);

    // 现在，root 会渲染一次（它本身及其所有子对象），然后缓存结果。
    // 在后续的渲染调用中，root 本身及其任何子对象都不会被重新渲染。
    // 相反，将使用快照以提高性能。
  }
}
```

#### 重新生成快照

一个启用快照的组件会为其整个树（包括其子对象）生成一个快照。如果任何子对象发生变化（例如位置变化或动画），调用 `takeSnapshot` 来更新缓存的快照。如果它们变化非常频繁，最好不要使用 `Snapshot` 因为这将不会带来性能提升。

渲染快照的组件仍然可以被变换而不会产生任何性能代价。一旦生成了快照，该组件仍可缩放、移动和旋转。但是，如果组件的内容发生了变化（即它所渲染的内容），则需要通过调用 `takeSnapshot` 重新生成快照。

### 生成快照

启用快照的组件可以在任何时候被用于生成快照，即使 `renderSnapshot` 设置为 false。这对于捕获屏幕截图或任何其他可能需要用整个游戏或部分游戏的静态快照的情况非常有用。

快照总是以没有变换的方式生成 - 即好像启用快照的组件位于位置 (0,0) 并且没有缩放或旋转一样。

快照被保存为 `Picture`，但可以使用 `snapshotToImage` 转换为 `Image`。

```dart
class SnapshotComponent extends PositionComponent with Snapshot {}

class MyGame extends FlameGame {
  late final SnapshotComponent root;

  @override
  Future<void> onLoad() async {
    // 添加一个快照组件，但不使用其渲染模式。
    root = SnapshotComponent()..renderSnapshot = false;
    add(root);

    // 其他代码省略。
  }

  // 如此调用以在任何时间获取图像快照。
  void takeSnapshot() {
    root.takeSnapshot();
    final image = root.snapshotToImage(200, 200);
  }
}
```

### 裁剪或偏心的快照

有时你的快照 `Image` 可能会出现裁剪或不在你期望的位置。

这是因为一个 `Picture` 的内容可以相对于原点定位在任何位置，但当它被转换为 `Image` 时，图像总是从 `0,0` 开始。这意味着负位置的内容会被裁剪。

处理这个问题的最佳方法是确保你的 `Snapshot` 组件相对于游戏始终保持在位置 `0,0` 并且你从未移动过它。这意味着图像通常会包含你期望的内容。

然而，这并不总是可能的。要在转换为图像之前移动（或旋转、缩放等）快照，请将变换矩阵传递给 `snapshotToImage` 如下：

```dart
// 如此调用以在任何时间获取图像快照。
void takeSnapshot() {
  // 准备一个矩阵来将快照移动到 (200,50)。
  final matrix = Matrix4.identity()..translate(200.0,50.0);

  root.takeSnapshot();
  final image = root.snapshotToImage(200, 200, transform: matrix);
}
```