# 悬浮层（Overlays）

由于 Flame 游戏可以被包装在一个 Flutter 小部件中，因此将其与其他 Flutter 小部件一起使用非常简单。然而，如果你想在 Flame 游戏的上方轻松显示小部件，比如消息、菜单屏幕或类似内容，可以使用 Widgets 悬浮层（Overlay）API 使操作更加简便。

`Game.overlays` 允许任何 Flutter 小部件显示在游戏实例的上方。这样可以很容易地创建诸如暂停菜单或物品栏界面等内容。

该功能可以通过 `game.overlays.add` 和 `game.overlays.remove` 方法来使用，这两个方法分别标记一个悬浮层为显示或隐藏。你可以通过传递一个 `String` 参数来标识悬浮层。然后，你可以通过提供 `overlayBuilderMap` 来将每个悬浮层与其相应的 Widget 映射到 `GameWidget` 声明中。

```dart
  // 在游戏中：
  final pauseOverlayIdentifier = 'PauseMenu';
  final secondaryOverlayIdentifier = 'SecondaryMenu';

  // 标记 'SecondaryMenu' 为可渲染。
  overlays.add(secondaryOverlayIdentifier, priority: 1);
  // 标记 'PauseMenu' 为可渲染。默认优先级为 0，表示 'PauseMenu' 会显示在 'SecondaryMenu' 下方。
  overlays.add(pauseOverlayIdentifier);
  // 标记 'PauseMenu' 不可渲染。
  overlays.remove(pauseOverlayIdentifier);
```

```dart
// 在 widget 声明中：
final game = MyGame();

Widget build(BuildContext context) {
  return GameWidget(
    game: game,
    overlayBuilderMap: {
      'PauseMenu': (BuildContext context, MyGame game) {
        return Text('暂停菜单');
      },
      'SecondaryMenu': (BuildContext context, MyGame game) {
        return Text('辅助菜单');
      },
    },
  );
}
```

悬浮层的渲染顺序由 `overlayBuilderMap` 中键的顺序决定。

可以查看 [Overlays 特性示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/system/overlays_example.dart)。