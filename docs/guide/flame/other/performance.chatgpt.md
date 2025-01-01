# 性能优化

与其他游戏引擎一样，Flame 尝试在不使 API 过于复杂的情况下尽可能高效。但由于其通用性质，Flame 无法假设游戏的类型。这意味着，游戏开发者始终可以根据游戏的功能进行性能优化。

另一方面，根据底层硬件的不同，Flame 能达到的性能总是会受到一定的限制。但除了硬件限制外，Flame 用户也会遇到一些常见的性能问题，这些问题通过遵循一些简单的步骤可以轻松避免。本节尝试涵盖一些优化技巧以及避免常见性能陷阱的方法。

```{note}
免责声明：每个 Flame 项目都与其他项目非常不同。因此，本文中描述的解决方案不能保证始终带来显著的性能提升。
```

## 每帧的对象创建

在任何项目或游戏中，创建类的对象是非常常见的操作。但对象创建是一个相对复杂的操作。根据对象创建的频率和数量，应用程序可能会出现一定的性能下降。

在游戏中，创建对象尤其需要小心，因为游戏通常会有一个尽可能快速更新的游戏循环，每次更新被称为一帧。根据硬件的不同，游戏每秒可能会更新 30、60、120 或更高帧数。这意味着，如果在每帧中创建一个新对象，游戏每秒将创建与帧数相等的对象数量。

Flame 用户通常会遇到这个问题，尤其是在覆盖 `Component` 的 `update` 和 `render` 方法时。例如，在下面这段看似无害的代码中，每帧都会创建一个新的 `Vector2` 和一个新的 `Paint` 对象。而这些对象中的数据在所有帧中是相同的。假设游戏中有 100 个 `MyComponent` 实例，且游戏以 60 FPS 运行，那么每秒将创建 6000（100 * 60）个新的 `Vector2` 和 `Paint` 实例。

```{note}
这就像每次你想发送电子邮件时都买一台新电脑，或者每次你想写点东西时都买一支新笔。虽然能完成任务，但并不经济。
```

```dart
class MyComponent extends PositionComponent {
  @override
  void update(double dt) {
    position += Vector2(10, 20) * dt;
  }

  @override
  void render(Canvas canvas) {
    canvas.drawRect(size.toRect(), Paint());
  }
}
```

更好的做法是，如下所示。此代码将所需的 `Vector2` 和 `Paint` 对象存储为类成员，并在所有 `update` 和 `render` 调用中重用它们。

```dart
class MyComponent extends PositionComponent {
  final _direction = Vector2(10, 20);
  final _paint = Paint();

  @override
  void update(double dt) {
    position.setValues(
      position.x + _direction.x * dt, 
      position.y + _direction.y * dt,
    );
  }

  @override
  void render(Canvas canvas) {
    canvas.drawRect(size.toRect(), _paint);
  }
}
```

```{note}
总结：避免在每帧中创建不必要的对象。即使是一个看似小的对象，如果以高频率生成，也会影响性能。
```

## 不必要的碰撞检查

Flame 内置了一个碰撞检测系统，可以检测任意两个 `Hitbox` 是否相交。在理想情况下，该系统会在每帧中运行并进行碰撞检测。它还足够智能，能够在实际进行相交检查之前，过滤掉只有可能发生碰撞的对象。

尽管如此，可以合理假设，随着 `Hitbox` 数量的增加，碰撞检测的成本也会增加。但在许多游戏中，开发者并不总是关心检测每一对可能发生碰撞的物体。例如，考虑一个简单的游戏，其中玩家可以发射一个带有 `Hitbox` 的 `Bullet` 组件。在这样的游戏中，开发者可能并不关心子弹之间的碰撞检测，但 Flame 仍然会进行这些碰撞检查。

为了避免这种情况，可以将子弹组件的 `collisionType` 设置为 `CollisionType.passive`。这样，Flame 将完全跳过所有被标记为被动的 `Hitbox` 之间的碰撞检查。

```{note}
这并不意味着所有游戏中的子弹组件必须总是拥有被动的 `Hitbox`。这取决于开发者根据游戏规则决定哪些 `Hitbox` 可以被标记为被动。例如，Flame 示例中的《Rogue Shooter》游戏使用了被动的 `Hitbox` 来处理敌人，而不是子弹。
```