# 游戏小部件 (Game Widget)

## `class GameWidget<T extends Game> extends StatefulWidget`

GameWidget 是一个 Flutter 小部件，用于将 Game 实例插入到 Flutter 的小部件树中。

GameWidget 功能丰富，可以作为 Flutter 应用的根小部件运行。因此，使用 GameWidget 的最简单方法如下：

```dart
void main() {
  runApp(
    GameWidget(game: MyGame()),
  );
}
```

同时，GameWidget 是一个常规的 Flutter 小部件，可以被任意插入到小部件树中的任何位置，包括在一个应用中使用多个 GameWidget。

该小部件的布局行为是，它会扩展以填充所有可用空间。因此，当它作为根小部件使用时，它会使应用全屏。在任何其他布局小部件内部时，它会尽可能占用更多的空间。

除了托管一个 Game 实例，GameWidget 还提供了一些结构性支持，具备以下功能：

- **loadingBuilder**：在游戏加载时显示某些内容；
- **errorBuilder**：如果游戏抛出错误时显示；
- **backgroundBuilder**：在游戏后面绘制一些装饰；
- **overlayBuilderMap**：在游戏上绘制一个或多个小部件。

需要注意的是，GameWidget 不会剪裁其画布的内容，这意味着游戏可能会在其边界外绘制内容（并非总是如此，取决于使用的相机）。如果不希望发生这种情况，可以考虑将小部件包装在 Flutter 的 `ClipRect` 中。
## 构造函数

```dart
GameWidget({required this.game, this.textDirection, this.loadingBuilder, this.errorBuilder, this.backgroundBuilder, this.overlayBuilderMap, this.initialActiveOverlays, this.focusNode, this.autofocus = true, this.mouseCursor, this.addRepaintBoundary = true, super.key})
```

渲染提供的游戏实例。

```dart
GameWidget.controlled({required this.gameFactory, this.textDirection, this.loadingBuilder, this.errorBuilder, this.backgroundBuilder, this.overlayBuilderMap, this.initialActiveOverlays, this.focusNode, this.autofocus = true, this.mouseCursor, this.addRepaintBoundary = true, super.key})
```

一个 GameWidget，会创建并拥有一个游戏实例，使用提供的 `gameFactory`。

此构造函数在您想要将 GameWidget 放入另一个小部件中，但又不想自己存储游戏实例时非常有用。例如：
```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20),
      child: GameWidget.controlled(
        gameFactory: MyGame.new,
      ),
    );
  }
}
```

## 属性

- **game : T?**  
  游戏实例，这个小部件将渲染它。如果使用默认构造函数提供的游戏实例，则会渲染该游戏实例。如果使用 `GameWidget.controlled` 构造函数，则该值始终为 null。

- **gameFactory : `GameFactory<T>`?**  
  创建游戏实例的函数，这个小部件将渲染该游戏。

- **textDirection : TextDirection?**  
  用于游戏中文本元素的文本方向。

- **loadingBuilder : GameLoadingWidgetBuilder?**  
  提供一个小部件，在游戏加载时显示。默认情况下，这个是一个空的 `Container`。

- **errorBuilder : GameErrorWidgetBuilder?**  
  如果设置了此属性，当游戏加载过程中发生错误时，会显示该小部件。如果未提供此属性，则错误会正常传播。

- **backgroundBuilder : WidgetBuilder?**  
  提供一个小部件树，在游戏元素与通过 `Game.backgroundColor` 提供的背景颜色之间构建。

- **overlayBuilderMap : `Map<String, OverlayWidgetBuilder<T>>`?**  
  一个可以显示在游戏表面上的小部件集合。这些小部件可以通过游戏中的 `Game.overlays` 属性动态打开或关闭。

```dart
void main() {
  runApp(
    GameWidget(
      game: MyGame(),
      overlayBuilderMap: {
        'PauseMenu': (context, game) {
          return Container(
            color: const Color(0xFF000000),
            child: Text('暂停菜单'),
          );
        },
      },
    ),
  );
}
```

- **initialActiveOverlays : `List<String>`?**  
  游戏启动时（但在加载后）将显示的小部件列表。

- **focusNode : FocusNode?**  
  用于控制游戏焦点以接收事件输入的 `FocusNode`。如果省略，则默认使用内部控制的焦点节点。

- **autofocus : bool**  
  是否在游戏加载完成后请求焦点。默认值为 `true`。

- **mouseCursor : MouseCursor?**  
  鼠标光标在游戏画布上悬停时的形状。此属性可以通过 `Game.mouseCursor` 动态更改。

- **addRepaintBoundary : bool**  
  是否让游戏具有 `RepaintBoundary` 的行为，默认值为 `true`。