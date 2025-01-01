# AlignComponent

> 类 `AlignComponent` 继承自 `PositionComponent`

`AlignComponent` 是一个布局组件，用于通过相对位置将其子组件放置在自身内部。它类似于 Flutter 的 `Align` 小部件。

该组件需要一个子组件，子组件将成为该组件对齐的目标。当然，也可以向该组件添加其他子组件，但只有初始子组件会被对齐。

`alignment` 参数描述了子组件在当前组件中的位置。例如，如果 `alignment` 为 `Anchor.center`，则子组件将居中显示。

通常情况下，组件的大小将与其父组件的大小匹配。然而，如果提供了 `widthFactor` 或 `heightFactor` 属性，则该方向上的组件大小将等于子组件的大小乘以相应的因子。例如，如果将 `heightFactor` 设置为 1，则该组件的宽度将与父组件相同，但高度将与子组件的高度匹配。

```dart
AlignComponent(
  child: TextComponent('hello'),
  alignment: Anchor.centerLeft,
);
```

默认情况下，子组件的锚点将与 `alignment` 值相同。这实现了传统的对齐行为：例如，子组件的中心将被放置在当前组件的中心，或者子组件的右下角可以放置在组件的右下角。然而，也可以通过为子组件设置不同的锚点并将 `keepChildAnchor` 设置为 `true` 来实现更复杂的布局。例如，如果将 `alignment` 设置为 `topCenter`，并将子组件的锚点设置为 `bottomCenter`，则子组件将被放置在当前组件的上方：

```dart
PlayerSprite().add(
  AlignComponent(
    child: HealthBar()..anchor = Anchor.bottomCenter,
    alignment: Anchor.topCenter,
    keepChildAnchor: true,
  ),
);
```

## 构造函数

```dart
AlignComponent({
  PositionComponent? child, 
  Anchor alignment = Anchor.topLeft, 
  this.widthFactor, 
  this.heightFactor, 
  this.keepChildAnchor = false
})
```

创建一个组件，使其子组件根据对齐方式在该组件的边界框内定位。

更准确地说，子组件将被放置在当前组件的边界框内相对位置处，子组件的锚点也将被设置为对齐方式，除非 `keepChildAnchor` 参数为 `true`。

## 属性

- **child ←→ PositionComponent?**  
  需要由该组件定位的子组件。子组件将自动挂载到当前组件。

- **alignment ←→ Anchor**  
  子组件在当前组件中的对齐方式。

  注意：与 Flutter 的 `Alignment` 不同，组件的左上角相对坐标为 (0, 0)，右下角的坐标为 (1, 1)。

- **widthFactor : double?**  
  如果为 `null`，则组件的宽度将与父组件的宽度相同。否则，宽度将等于子组件的宽度乘以此因子。

- **heightFactor : double?**  
  如果为 `null`，则组件的高度将与父组件的高度相同。否则，高度将等于子组件的高度乘以此因子。

- **keepChildAnchor : bool**  
  如果为 `false`（默认值），则子组件的锚点将与对齐值相同。如果为 `true`，则允许子组件拥有独立于父组件的锚点值。