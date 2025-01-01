# 碰撞检测

碰撞检测在大多数游戏中是必要的，用于检测和处理两个组件相交的情况。例如，箭矢击中敌人或玩家拾取硬币。

在大多数碰撞检测系统中，使用称为碰撞体（hitboxes）的东西来创建更精确的组件边界框。在 Flame 中，碰撞体是组件中可以对碰撞做出反应的区域，从而提高[手势输入](inputs/gesture_input.md#gesturehitboxes)的准确性。

碰撞检测系统支持三种不同形状的碰撞体，这些形状包括多边形（Polygon）、矩形（Rectangle）和圆形（Circle）。多个碰撞体可以添加到一个组件中，以形成用于检测碰撞或判断是否包含某一点的区域。后者在准确的手势检测中非常有用。碰撞检测本身不处理当两个碰撞体相交时应该发生什么情况，因此需要用户来实现当例如两个 `PositionComponent` 的碰撞体相交时的行为。

请注意，内置的碰撞检测系统不会处理相互超出对方的碰撞体之间的碰撞，这种情况可能发生在它们移动得非常快或 `update` 方法被调用时传入了一个较大的时间增量（例如，当您的应用程序不在前台时）。这种行为称为穿透，如果您想了解更多相关信息可以查阅相关资料。

还需要注意的是，如果碰撞体祖先元素有某些类型的翻转和缩放组合，碰撞检测系统会有一些限制使其无法正常工作。

## 混合类（Mixins）

### HasCollisionDetection

如果你想在游戏中使用碰撞检测，你需要将 `HasCollisionDetection` 混合类添加到你的游戏中，以便跟踪可以发生碰撞的组件。

示例：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  // ...
}
```

现在当你将包含 `ShapeHitbox` 的组件添加到游戏时，它们会自动被检查碰撞情况。

你也可以将 `HasCollisionDetection` 直接添加到另一个 `Component` 而不是 `FlameGame` 中，例如用于 `CameraComponent` 的 `World`。
如果这样做的话，在该组件树中添加的碰撞体会仅与其他在该子树中的碰撞体进行比较，这使得在一个 `FlameGame` 中可以有多个具有碰撞检测的世界。

示例：

```dart
class CollisionDetectionWorld extends World with HasCollisionDetection {}
```

```
{note}
碰撞体只会连接到一个碰撞检测系统，并且是最近的父类带有 `HasCollisionDetection` 混合类的那个。
```

### CollisionCallbacks

为了响应碰撞，你应该在组件中添加 `CollisionCallbacks` 混合类。

示例：

```dart
class MyCollidable extends PositionComponent with CollisionCallbacks {
  @override
  void onCollision(Set<Vector2> points, PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }
}
```

在这个示例中，我们使用 Dart 的 `is` 关键字来检查碰撞的是哪种类型的组件。
点集是碰撞体边缘相交的位置。

请注意，如果两个 `PositionComponent` 都实现了 `onCollision` 方法，那么当它们发生碰撞时 `onCollision` 方法会在两个 `PositionComponent` 上被调用，同样地，`onCollisionStart` 和 `onCollisionEnd` 方法也会在两个组件和碰撞体开始或停止碰撞时被调用。

当一个 `PositionComponent`（以及其碰撞体）开始与另一个 `PositionComponent` 碰撞时，`onCollisionStart` 和 `onCollision` 都会被调用。因此，如果你不需要做任何特定的操作来处理碰撞的开始，你只需要重写 `onCollision`，反之亦然。

如果你想检查与屏幕边缘的碰撞（如上面的例子所示），你可以使用预定义的 [ScreenHitbox](#screenhitbox) 类。

默认情况下所有碰撞体都是空心的，这意味着一个碰撞体可以完全被另一个碰撞体包围而不触发碰撞。如果你希望将你的碰撞体设置为实体的，可以设置 `isSolid = true`。空心碰撞体在实体碰撞体内会触发碰撞，但反之则不会。如果没有与实体碰撞体边缘相交，则返回中心位置。

### 碰撞顺序

如果一个 `Hitbox` 在给定的时间步内与其他多个 `Hitbox` 发生碰撞，那么 `onCollision` 回调将按本质上随机的顺序被调用。在某些情况下这可能会导致问题，例如在一个反弹球游戏中，球的轨迹可能取决于首先碰到哪个其他对象。为了帮助解决这个问题，可以使用 `collisionsCompletedNotifier` 监听器 —— 这个监听器会在碰撞检测过程结束时触发。

一个可能的用途示例是在你的 `PositionComponent` 中添加一个局部变量来保存与之发生碰撞的其他组件：`List<PositionComponent> collisionComponents = [];`。然后使用 `onCollision` 回调将所有其他的 `PositionComponent` 保存到这个列表中：

```dart
@override
void onCollision(Set<Vector2> intersectionPoints, PositionComponent other) {
  collisionComponents.add(other);
  super.onCollision(intersectionPoints, other);
}
```

最后，在你的 `PositionComponent` 的 `onLoad` 方法中添加一个监听器来调用一个函数，该函数将处理碰撞应如何处理：

```dart
(game as HasCollisionDetection)
    .collisionDetection
    .collisionsCompletedNotifier
    .addListener(() {
  resolveCollisions();
});
```

列表 `collisionComponents` 需要在每次对 `update` 的调用中清除。

## ShapeHitbox

`ShapeHitbox` 是普通的组件，因此你可以像添加任何其他组件一样将它们添加到你想要添加碰撞体的组件中：

```dart
class MyComponent extends PositionComponent {
  @override
  void onLoad() {
    add(RectangleHitbox());
  }
}
```

如果你没有向碰撞体传递任何参数（如上所示），那么该碰撞体会尝试填充其父组件尽可能多的空间。除了让碰撞体尝试填充它们的父组件之外，有另外两种初始化碰撞体的方式：一种是使用常规构造函数，在其中定义一个带有大小和位置等信息的碰撞体；另一种方法是使用 `relative` 构造函数，它根据碰撞体预期父组件的大小来定义该碰撞体。

在某些特定情况下，你可能只想处理仅在碰撞体之间的碰撞，而不将 `onCollision*` 事件传播到碰撞体的父组件。例如，一个车辆可以有一个主体碰撞体来控制碰撞，并且还有侧碰撞体来检查是否可以向左或向右转弯。
所以与主体碰撞体发生碰撞意味着与该组件本身发生碰撞，而与侧碰撞体发生碰撞并不意味着真正的碰撞，不应该传播到碰撞体的父组件。对于这种情况，你可以将 `triggersParentCollision` 变量设置为 `false`：

```dart
class MyComponent extends PositionComponent {

  late final MySpecialHitbox utilityHitbox;

  @override
  void onLoad() {
    utilityHitbox = MySpecialHitbox();
    add(utilityHitbox);
  }

  void update(double dt) {
    if (utilityHitbox.isColliding) {
      // 如果碰撞体正在发生碰撞，执行一些特定的操作
    }
  }
// 组件的 onCollision* 函数，忽略 MySpecialHitbox 的碰撞。
}

class MySpecialHitbox extends RectangleHitbox {
  MySpecialHitbox() {
    triggersParentCollision = false;
  }

// 碰撞体特定的 onCollision* 函数

}
```

你可以在 [ShapeComponents](components.md#shapecomponents) 部分了解更多关于不同形状如何定义的信息。

请记住，你可以向你的 `PositionComponent` 添加任意数量的 `ShapeHitbox` 来创建更复杂的区域。例如一个戴帽子的雪人可以用三个 `CircleHitbox` 和两个 `RectangleHitbox` 作为其帽子来表示。

碰撞体既可以用于检测碰撞，也可以在组件上提高手势检测的准确性，请参阅关于 [GestureHitboxes](inputs/gesture_input.md#gesturehitboxes) 混合类部分以了解更多信息。

### CollisionType

碰撞体有一个名为 `collisionType` 的字段，该字段定义了碰撞体何时应该与其他碰撞体发生碰撞。通常情况下，你希望尽可能多地将碰撞体设置为 `CollisionType.passive` 以提高碰撞检测的性能。默认的 `CollisionType` 是 `active`。

`CollisionType` 枚举包含以下值：

- `active`：与类型为 active 或 passive 的其他 Hitbox 发生碰撞
- `passive`：仅与类型为 active 的其他 Hitbox 发生碰撞
- `inactive`：不会与其他任何 Hitbox 发生碰撞

因此，如果你有一些不需要相互检测碰撞的碰撞体，可以在构造函数中设置 `collisionType: CollisionType.passive` 将它们标记为被动。例如，地面组件或敌人之间不需要检测碰撞时可以将它们也标记为 `passive`。

想象一个游戏中有很多子弹向玩家飞去，并且这些子弹不能彼此相撞，那么玩家会被设置为 `CollisionType.active` 而子弹则被设置为 `CollisionType.passive`。

然后我们有 `inactive` 类型的碰撞体，它根本不会在碰撞检测中被检查。
这可以用于例如你有一些超出屏幕范围的组件当前不关心但稍后可能会回到视图中的情况。因此它们不会完全从游戏中移除。

这只是这些类型的一些用法示例，在实际应用中会有更多的情况，因此即使你的用例没有列出在这里也不要犹豫使用它们。

### PolygonHitbox

需要注意的是，如果你想在 `Polygon` 上使用碰撞检测或 `containsPoint` 方法，该多边形必须是凸的。所以始终使用凸多边形，否则除非你确实知道自己在做什么，否则很可能会遇到问题。

其他形状的碰撞体没有强制性的构造函数，这是因为它们可以从所附着的可碰撞对象的大小计算出默认值，但对于一个可以有无限种方式在一个边界框内创建的多边形来说，你需要在该形状的构造函数中添加定义。

`PolygonHitbox` 的构造函数与 [components.md#polygoncomponent](components.md#polygoncomponent) 中相同，请参阅相关部分获取文档信息。

### RectangleHitbox

`RectangleHitbox` 的构造函数与 [components.md#rectanglecomponent](components.md#rectanglecomponent) 中相同，请参阅相关部分获取文档信息。

### CircleHitbox

`CircleHitbox` 的构造函数与 [components.md#circlecomponent](components.md#circlecomponent) 中相同，请参阅相关部分获取文档信息。

## ScreenHitbox

`ScreenHitbox` 是一个表示视口或屏幕边缘的组件。如果你将 `ScreenHitbox` 添加到你的游戏中，其他带有碰撞体的组件将在与边缘发生碰撞时收到通知。它不接受任何参数，仅依赖于其添加的游戏的 `size`。你可以通过在游戏代码中添加 `add(ScreenHitbox())` 来添加它，如果你不想让 `ScreenHitbox` 本身在被碰撞时也收到通知的话。由于 `ScreenHitbox` 具有 `CollisionCallbacks` 混合类，你如果需要可以为该对象添加自己的 `onCollisionCallback`、`onStartCollisionCallback` 和 `onEndCollisionCallback` 函数。

## CompositeHitbox

在 `CompositeHitbox` 中你可以添加多个碰撞体，使它们模拟成一个合并后的碰撞体。

如果你想形成一个帽子，例如，你可能希望使用两个 [#rectanglehitbox](#rectanglehitbox) 来正确地跟随该帽子的边缘，然后你可以将这些碰撞体添加到此类的一个实例中，并对整个帽子进行碰撞反应，而不是分别对每个碰撞体进行反应。

## 广度阶段（Broad phase）

如果你的游戏领域不大且没有很多可碰撞组件 - 你不必担心所使用的广度阶段系统，因此如果标准实现对你来说性能足够好，你可能不需要阅读本节内容。

广度阶段是碰撞检测的第一步，在此步骤中计算潜在的碰撞。计算这些潜在碰撞比精确检查相交要快，并且无需将所有碰撞体相互比较从而避免了 O(n²) 的复杂性。

广度阶段生成一组潜在碰撞（一组 `CollisionProspect`）。然后使用该集合来检查碰撞体之间的精确相交（有时称为“窄阶段”）。

默认情况下，Flame 的碰撞检测使用的是扫掠与修剪的广度阶段步骤。如果你的游戏需要另一种类型的广度阶段，你可以通过扩展 `Broadphase` 并手动设置应使用的碰撞检测系统来自定义你的广度阶段。

例如，如果你想实现一个基于某种魔法算法而不是标准扫掠与修剪的标准广度阶段，那么可以这样做：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  MyGame() : super() {
    collisionDetection =
        StandardCollisionDetection(broadphase: MagicAlgorithmBroadphase());
  }
}
```

## 四叉树广度阶段（Quad Tree broad phase）

如果你的游戏领域较大且游戏包含大量可碰撞组件（超过一百个），标准的扫掠与修剪会变得低效。如果是这种情况，你可以尝试使用四叉树广度阶段。

为了做到这一点，将 `HasQuadTreeCollisionDetection` 混合类添加到你的游戏中而不是 `HasCollisionDetection`，并在加载游戏时调用 `initializeCollisionDetection` 函数：

```dart
class MyGame extends FlameGame with HasQuadTreeCollisionDetection {
  @override
  void onLoad() {
    initializeCollisionDetection(
      mapDimensions: const Rect.fromLTWH(0, 0, mapWidth, mapHeight),
      minimumDistance: 10,
    );
  }
}
```

在调用 `initializeCollisionDetection` 时，应传递正确的地图尺寸以使四叉树算法正常工作。还有一些其他参数可以提高系统的效率：

- `minimumDistance`: 考虑为可能碰撞的对象之间的最小距离。
  如果为 `null` - 则检查被禁用，默认行为
- `maxObjects`: 每个象限的最大对象数，默认为25。
- `maxDepth`: 每个象限内的最大嵌套级别，默认为10

如果你使用四叉树系统，可以通过在组件中实现 `CollisionCallbacks` 混合类的 `onComponentTypeCheck` 函数来使其更高效。这对于需要防止不同类型的项目发生碰撞的情况非常有用。
计算结果会被缓存，因此此处不应检查任何动态参数，该函数旨在用作纯粹的类型检查器：

```dart
class Bullet extends PositionComponent with CollisionCallbacks {

  @override
  bool onComponentTypeCheck(PositionComponent other) {
    if (other is Player || other is Water) {
      // 不要与 Player 或 Water 发生碰撞
      return false;
    }
    // 如果你对父类型的检查结果不感兴趣，只需返回 true。
    // 或者调用 super 并可以使用父的结果覆盖结果。
    return super.onComponentTypeCheck(other);
  }

  @override
  void onCollisionStart(
    Set<Vector2> intersectionPoints,
    PositionComponent other,
  ) {
    // 当与 Brick 接触时删除组件。
    // Player 或 Water 不会传递给这个函数，因为在早期阶段已经被 [onComponentTypeCheck] 过滤掉了。
    if (other is Brick) {
      removeFromParent();
    }
    super.onCollisionStart(intersectionPoints, other);
  }
}
```

经过长时间的游戏后地图可能会被过度聚类，并且有许多空象限。运行 `QuadTree.optimize()` 来清理空象限：

```dart
class QuadTreeExample extends FlameGame with HasQuadTreeCollisionDetection {

  /// 当高强度游戏会话结束时调用的函数。
  /// 也可以安排其执行，但不需要在每次更新时运行。
  /// 根据你的游戏情况使用适当的时间间隔。
  onGameIdle() {
    (collisionDetection as QuadTreeCollisionDetection)
            .quadBroadphase
            .tree
            .optimize();
  }
}
```

```{note}
始终尝试不同的碰撞检测方法，并检查它们在你游戏中表现如何。
`QuadTreeBroadphase` 比默认方法慢得多的情况并不罕见。
不要假设更复杂的解决方案总是更快。
```

## 射线投射和光线追踪（Ray casting and Ray tracing）

射线投射和光线追踪是从游戏中的一个点发射出一条或多条射线，然后查看这些射线击中什么以及它们在碰到东西后的反射情况的方法。

对于以下所有方法，如果你有任何希望忽略的碰撞体，可以添加 `ignoreHitboxes` 参数，这是一个你希望为该调用忽略的碰撞体列表。例如，如果你从一个碰撞体内发射射线，这个碰撞体可能属于你的玩家或 NPC；或者你不希望一条射线反射到 `ScreenHitbox`。

### 射线投射（Ray casting）

射线投射是从一点发出一个或多个射线并查看它们是否击中任何东西的操作。在 Flame 中，这些击中的对象是碰撞体。

我们提供了两种方法来实现此功能，`raycast` 和 `raycastAll`。前者仅发出一条射线，并返回关于该射线击中什么和在哪里的信息，还有一些其他信息，如距离、法线和平行射线等。后者 `raycastAll` 类似地工作，但在原点周围均匀发送多个射线，或者在原点为中心的角度内发送。

默认情况下，`raycast` 和 `raycastAll` 扫描最近的击中情况，无论它距离射线起点有多远。
但在某些使用场景下，可能只对某个特定范围内的击中感兴趣。对于这种情况，可以提供一个可选的 `maxDistance` 参数。

要使用射线投射功能，你需要在你的游戏中添加 `HasCollisionDetection` 混合类。添加后可以在游戏类上调用 `collisionDetection.raycast(...)`。

示例：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  @override
  void update(double dt) {
    super.update(dt);
    final ray = Ray2(
        origin: Vector2(0, 100),
        direction: Vector2(1, 0),
    );
    final result = collisionDetection.raycast(ray);
  }
}
```

在这个示例中可以看到，使用了 `Ray2` 类来定义从原点位置和方向（均由 `Vector2` 定义）发出的一条射线。该特定射线起始于 (0,100)，向右发射一条射线。

此操作的结果可能是 `null`（如果射线未击中任何东西），或者一个包含以下内容的 `RaycastResult`：

- 射线击中的碰撞体
- 碰撞点的位置
- 反射射线，即射线在碰撞体上的反射情况
- 碰撞的法线，即垂直于射线撞击到的碰撞体面的一个向量

如果你关心性能，可以预先创建一个 `RaycastResult` 对象并将其通过 `out` 参数传递给方法中。这将使该方法能够重用此对象而不是为每次迭代创建一个新的对象。这对于在 `update` 方法中进行大量射线投射的情况非常有用。

#### raycastAll

有时你希望从原点向多个方向或特定范围内的方向发出射线。这可以有很多应用，例如你可以计算玩家或敌人的视野，或者也可以用于创建光源。

示例：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  @override
  void update(double dt) {
    super.update(dt);
    final origin = Vector2(200, 200);
    final result = collisionDetection.raycastAll(
      origin,
      numberOfRays: 100,
    );
  }
}
```

在这个示例中，我们将从 (200, 200) 发出 100 条均匀分布在所有方向上的射线。

如果你想限制方向可以使用 `startAngle` 和 `sweepAngle` 参数。
其中 `startAngle`（从正上方计数）是射线开始的角度，然后射线将在 `startAngle + sweepAngle` 结束。

如果你关心性能，可以通过 `out` 参数传递一个由该函数创建的 `RaycastResult` 对象列表以重用这些对象。

### 光线追踪（Ray tracing）

光线追踪与射线投射类似，但是不仅仅是检查射线击中的内容，还可以继续追踪反射射线（射线从碰撞体上弹出）以及该反射射线进一步发射的反射射线，并以此类推，直到你决定已经追踪足够长的距离。如果你想象一下台球在台球桌上反弹的样子，这种信息就可以通过光线追踪获取到。

示例：

```dart
class MyGame extends FlameGame with HasCollisionDetection {
  @override
  void update(double dt) {
    super.update(dt);
    final ray = Ray2(
        origin: Vector2(0, 100),
        direction: Vector2(1, 1)..normalize()
    );
    final results = collisionDetection.raytrace(
      ray,
      maxDepth: 100,
    );
    for (final result in results) {
      if (result.intersectionPoint.distanceTo(ray.origin) > 300) {
        break;
      }
    }
  }
}
```

在上面的示例中，我们从 (0, 100) 发射一条右下方的射线，并指定该射线最多可以反弹 100 次。并不一定需要获得 100 个结果，因为在某个时刻一个反射射线可能没有击中碰撞体，这时方法就会完成。

此方法是惰性的，这意味着它只会计算你请求的结果，因此你需要通过循环遍历其返回的可迭代对象来获取结果，或者调用 `toList()` 来直接计算所有结果。

在 for 循环中可以看到如何使用它，在该循环中我们检查当前反射射线的交点（即前一个射线击中的碰撞体）是否距离初始射线原点超过 300 像素，如果是这样，则不再关心其他的结果（也不需要计算这些结果）。

如果你关心性能，可以通过 `out` 参数传递该函数创建的 `RaycastResult` 对象列表以重用这些对象。

## 与 Forge2D 的比较

如果你想在游戏中拥有一个完整的物理引擎，我们建议你通过添加 [flame_forge2d](https://github.com/flame-engine/flame_forge2d) 作为依赖来使用 Forge2D。
但如果你的用例较简单且仅想检查组件之间的碰撞并提高手势的准确性，Flame 内置的碰撞检测将很好地满足你的需求。

如果你有以下需求，则至少应该考虑使用 [Forge2D](https://github.com/flame-engine/forge2d)：

- 交互真实的力
- 可以与其他刚体相互作用的粒子系统
- 刚体之间的关节

另一方面，如果你只需要一些简单的功能（因为它不需要涉及 Forge2D），那么最好只使用 Flame 碰撞检测系统：

- 处理一些组件之间的碰撞的能力
- 处理组件与屏幕边界的碰撞的能力
- 复杂形状作为组件的碰撞体以提高手势精度
- 可以报告碰撞的是组件的一部分

## 示例

- [可碰撞的 AnimationComponent](https://examples.flame-engine.org/#/Collision_Detection_Collidable_AnimationComponent)
- [圆形](https://examples.flame-engine.org/#/Collision_Detection_Circles)
- [多种形状](https://examples.flame-engine.org/#/Collision_Detection_Multiple_shapes)
- [更多示例](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/collision_detection)