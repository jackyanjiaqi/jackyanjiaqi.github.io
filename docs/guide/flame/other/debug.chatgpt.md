# 调试功能

## FlameGame 特性

Flame 为 `FlameGame` 类提供了一些调试功能。这些功能在将 `debugMode` 属性设置为 `true` 时启用（或将其重写为 `true`）。  
当启用 `debugMode` 时，每个 `PositionComponent` 将显示其边界尺寸，并且其位置会被显示在屏幕上。这样，你可以直观地验证组件的边界和位置。

查看[FlameGame 调试功能的工作示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/components/debug_example.dart)。

## 开发工具扩展

如果你打开 [Flutter DevTools](https://docs.flutter.dev/tools/devtools/overview)，你会看到一个新的标签页叫做 "Flame"。  
该标签页将展示关于当前游戏的信息，例如组件树的可视化、控制游戏播放、暂停和步进的功能、选定组件的信息等。

## FPS

Flame 报告的 FPS 可能会比 Flutter DevTools 中报告的 FPS 稍低，具体取决于你所针对的平台。  
关于游戏运行 FPS 的真实来源应该是我们报告的 FPS，因为它是由我们的游戏循环所限制的。

### FpsComponent

`FpsComponent` 可以添加到组件树中的任何位置，它将跟踪游戏当前渲染的 FPS。如果你想在游戏中显示 FPS，可以使用 `FpsTextComponent`。

### FpsTextComponent

`FpsTextComponent` 只是一个 [TextComponent]，它包装了 `FpsComponent`，因为你通常希望在使用 `FpsComponent` 时显示当前的 FPS。

[TextComponent]: ../rendering/text_rendering.md#textcomponent

### ChildCounterComponent

`ChildCounterComponent` 是一个组件，每秒渲染一个组件（`target`）中类型为 `T` 的子组件数量。例如，以下代码将渲染游戏 `world` 中的 `SpriteAnimationComponent` 子组件数量：

```dart
add(
  ChildCounterComponent<SpriteAnimationComponent>(
    target: world,
  ),
);
```

### TimeTrackComponent

该组件允许开发者跟踪代码中所花费的时间。对于性能调试，跟踪代码中的某些部分所消耗的时间非常有用。

使用方法：将其添加到游戏中的某个位置（由于这是调试功能，建议仅在调试版本或调试构建中添加该组件）：

```dart
add(TimeTrackComponent());
```

然后，在你想要跟踪时间的代码部分，进行如下操作：

```dart
void update(double dt) {
  TimeTrackComponent.start('MyComponent.update');
  // ...
  TimeTrackComponent.end('MyComponent.update');
}
```

通过上述调用，添加的 `TimeTrackComponent` 将以微秒为单位渲染经过的时间。