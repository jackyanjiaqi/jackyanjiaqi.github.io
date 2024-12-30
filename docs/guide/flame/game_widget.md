# Game Widget

## `class GameWidget<T extends Game> extends StatefulWidget`

The `GameWidget` is a Flutter widget used to insert a `Game` instance into the Flutter widget tree.

The `GameWidget` is feature-rich enough to function as the root of your Flutter application. The simplest way to use `GameWidget` is as follows:

```dart
void main() {
  runApp(
    GameWidget(game: MyGame()),
  );
}
```

At the same time, `GameWidget` is a regular Flutter widget and can be inserted arbitrarily deep into the widget tree, including the possibility of having multiple `GameWidget` instances within a single app.

### Layout Behavior
The layout behavior of this widget is that it will expand to fill all available space. Therefore, when used as a root widget, it will make the app full-screen. Inside any other layout widget, it will take as much space as possible.

In addition to hosting a `Game` instance, the `GameWidget` provides several structural features:

- `loadingBuilder`: Displays a widget while the game is loading.
- `errorBuilder`: Displays a widget if the game throws an error.
- `backgroundBuilder`: Draws some decoration behind the game.
- `overlayBuilderMap`: Draws one or more widgets on top of the game.

### Important Note
`GameWidget` does not clip the content of its canvas. This means the game can potentially draw outside its boundaries (not always, depending on which camera is used). If this is not desired, consider wrapping the widget in Flutter’s `ClipRect`.

---

## Constructors

```dart
`GameWidget({required this.game, this.textDirection, this.loadingBuilder, this.errorBuilder, this.backgroundBuilder, this.overlayBuilderMap, this.initialActiveOverlays, this.focusNode, this.autofocus = true, this.mouseCursor, this.addRepaintBoundary = true, super.key})`
```

Renders the provided game instance.

```dart
`GameWidget.controlled({required this.gameFactory, this.textDirection, this.loadingBuilder, this.errorBuilder, this.backgroundBuilder, this.overlayBuilderMap, this.initialActiveOverlays, this.focusNode, this.autofocus = true, this.mouseCursor, this.addRepaintBoundary = true, super.key})`
```

A `GameWidget` that will create and own a `Game` instance using the provided `gameFactory`.

This constructor is useful when you want to put `GameWidget` into another widget but want to avoid storing the game’s instance yourself. For example:

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

---

## Properties

- **`game : T?`**  
  The game instance that this widget will render if provided via the default constructor. If the `GameWidget.controlled` constructor is used, this will always be `null`.

- **`gameFactory : GameFactory<T>?`**  
  A function that creates a `Game` instance that this widget will render.

- **`textDirection : TextDirection?`**  
  The text direction to be used for text elements in the game.

- **`loadingBuilder : GameLoadingWidgetBuilder?`**  
  Builder to provide a widget that will be displayed while the game is loading. By default, this is an empty `Container`.

- **`errorBuilder : GameErrorWidgetBuilder?`**  
  If set, errors during game loading will be caught and this widget will be shown. If not provided, errors are propagated normally.

- **`backgroundBuilder : WidgetBuilder?`**  
  Builder to provide a widget tree to be built between the game elements and the background color provided via `Game.backgroundColor`.

- **`overlayBuilderMap : Map<String, OverlayWidgetBuilder<T>>?`**  
  A collection of widgets that can be displayed over the game’s surface. These widgets can be turned on and off dynamically from within the game via the `Game.overlays` property.

Example:

```dart
void main() {
  runApp(
    GameWidget(
      game: MyGame(),
      overlayBuilderMap: {
        'PauseMenu': (context, game) {
          return Container(
            color: const Color(0xFF000000),
            child: Text('A pause menu'),
          );
        },
      },
    ),
  );
}
```

- **`initialActiveOverlays : List<String>?`**  
  The list of overlays that will be shown when the game starts (but after it has loaded).

- **`focusNode : FocusNode?`**  
  The `FocusNode` to control the game's focus to receive event inputs. If omitted, defaults to an internally controlled focus node.

- **`autofocus : bool`**  
  Whether the `focusNode` requests focus once the game is mounted. Defaults to `true`.

- **`mouseCursor : MouseCursor?`**  
  The shape of the mouse cursor when it is hovering over the game canvas. This property can be changed dynamically via `Game.mouseCursor`.

- **`addRepaintBoundary : bool`**  
  Whether the game should assume the behavior of a `RepaintBoundary`. Defaults to `true`.
```
