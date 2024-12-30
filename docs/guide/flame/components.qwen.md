# 组件

![](/images/component_tree.png)

这个图表可能看起来很复杂，但请不要担心，它并没有看起来的那么复杂。

## 组件

所有组件都继承自`Component`类，并且可以有其他`Component`作为子组件。
这就是我们所说的Flame组件系统（简称FCS）的基础。

子组件可以通过调用`add(Component c)`方法或直接在构造函数中添加。

示例：

```dart
void main() {
  final component1 = Component(children: [Component(), Component()]);
  final component2 = Component();
  component2.add(Component());
  component2.addAll([Component(), Component()]);
}
```

这里的`Component()`当然可以是任何`Component`的子类。

每个`Component`都有几个可选实现的方法，这些方法被`FlameGame`类使用。

### 组件生命周期

![](/images/component_lifecycle.png)

每当屏幕尺寸改变时，或者当此组件添加到组件树中时（在`onMount`之前），都会调用`onGameResize`方法。

`onParentResize`方法也类似：它同样在组件挂载到组件树时被调用，并且每当当前组件的父组件更改其大小时也会被调用。

可以通过重写`onRemove`方法，在组件从游戏中移除之前运行代码，即使该组件通过父组件的移除方法和`Component`移除方法都被移除，该方法也只会运行一次。

可以通过重写`onLoad`方法来运行组件的异步初始化代码，例如加载一张图片。此方法在`onGameResize`和`onMount`之前执行。此方法在整个组件生命周期中保证只被执行一次，因此可以将其视为“异步构造函数”。

每当组件挂载到游戏树时就会调用`onMount`方法。这意味着你不应该在此处初始化 `late final` 变量，因为该方法在组件的整个生命周期中可能会被多次调用。此方法只会在其父组件已经挂载的情况下运行。如果父组件尚未挂载，则此方法会进入队列等待（这不会影响游戏引擎的其他部分）。

可以通过重写`onChildrenChanged`方法来检测父组件子组件的变化。每当有子组件被添加到或从父组件中移除时（包括子组件更改其父组件的情况），都会调用此方法。其参数包含目标子组件及其变化类型（“added” 或 “removed”）。

可以通过一系列的getter来检查组件生命周期状态：

- `isLoaded`: 返回一个bool，表示当前加载状态。
- `loaded`: 返回一个future，在组件完成加载后会完成。
- `isMounted`: 返回一个bool，表示当前挂载状态。
- `mounted`: 返回一个future，在组件完成挂载后会完成。
- `isRemoved`: 返回一个bool，表示当前移除状态。
- `removed`: 返回一个future，在组件被移除后会完成。

### 优先级

在Flame中，每个`Component`都有一个`int priority`属性，决定了它在其父组件的子组件中的排序顺序。有时这被称为其他语言和框架中的`z-index`。`priority`设置得越高，组件在屏幕上显示的位置就越靠前，因为它会渲染在其之前渲染的所有优先级较低的组件之上。

如果你添加了两个组件，并将其中一个组件的优先级设为1，那么该组件将在另一个组件之上渲染（如果它们重叠），因为默认优先级是0。

所有组件都将`priority`作为命名参数接收，因此如果你在编译时知道你的组件的优先级，则可以在构造函数中传入它。

示例：

```dart
class MyGame extends FlameGame {
  @override
  void onLoad() {
    final myComponent = PositionComponent(priority: 5);
    add(myComponent);
  }
}
```

要更新一个组件的优先级，需要将其设置为新值，例如 `component.priority = 2`，它将在渲染阶段之前的当前帧中被更新。

在以下示例中，我们首先将组件初始化为优先级1，然后当用户点击该组件时，我们将它的优先级更改为2：

```dart
class MyComponent extends PositionComponent with TapCallbacks {

  MyComponent() : super(priority: 1);

  @override
  void onTapDown(TapDownEvent event) {
    priority = 2;
  }
}
```

### 组件的可组合性

有时将其他组件包装在你的组件内部是有用的。例如，通过层次结构对视觉组件进行分组。你可以在任何组件中添加子组件，例如`PositionComponent`。

当你在一个组件中有子组件时，每当父组件被更新和渲染时，所有子组件都会在同一条件下被渲染和更新。

由包装器处理两个组件可见性的用法示例：

```dart
class GameOverPanel extends PositionComponent {
  bool visible = false;
  final Image spriteImage;

  GameOverPanel(this.spriteImage);

  @override
  void onLoad() {
    final gameOverText = GameOverText(spriteImage); // GameOverText是Component
    final gameOverButton = GameOverButton(spriteImage); // GameOverRestart是SpriteComponent

    add(gameOverText);
    add(gameOverButton);
  }

  @override
  void render(Canvas canvas) {
    if (visible) {
      // 如果不可见，则不会渲染任何子组件
    }
  }
}
```

有两种方法可以在你的组件中添加子组件。首先，你有`add()`、`addAll()`和`addToParent()`方法，可以在游戏中的任何时候使用这些方法。传统上，子组件将在组件的`onLoad()`方法中创建并添加，但在游戏过程中添加新子组件也很常见。

第二种方法是使用组件构造函数中的`children:`参数。这种方法更接近于其他语言和框架的标准API：

```dart
class MyGame extends FlameGame {
  @override
  void onLoad() {
    add(
      PositionComponent(
        position: Vector2(30, 0),
        children: [
          HighScoreDisplay(),
          HitPointsDisplay(),
          FpsComponent(),
        ],
      ),
    );
  }
}
```

这两种方法可以自由组合：构造函数中的子组件将首先被添加，然后是任何其他子组件。

需要注意的是，通过上述任一方法添加的子组件只有在加载并挂载后才会保证可用。我们只能保证它们将以与添加顺序相同的顺序出现在子组件列表中。

### 从组件访问World

如果一个组件有一个`World`作为祖先，并且需要访问该`World`对象，则可以使用`HasWorldReference`混入。

示例：

```dart
class MyComponent extends Component with HasWorldReference<MyWorld>,
    TapCallbacks {
  @override
  void onTapDown(TapDownEvent info) {
    // world类型为MyWorld
    world.add(AnotherComponent());
  }
}
```

如果你尝试从没有正确类型的`World`祖先的组件访问`world`，将抛出断言错误。

### 确保一个组件具有给定的父组件

当组件需要添加到特定的父组件类型时，可以使用`ParentIsA`混入来强制执行强类型父组件。

示例：

```dart
class MyComponent extends Component with ParentIsA<MyParentComponent> {
  @override
  void onLoad() {
    // parent是MyParentComponent类型
    print(parent.myValue);
  }
}
```

如果你尝试将`MyComponent`添加到不是`MyParentComponent`的父组件，将抛出断言错误。

### 确保一个组件具有给定的祖先

当组件需要在其组件树中的某个位置具有特定类型的祖先时，可以使用`HasAncestor`混入来强制执行该关系。

该混入暴露了类型为给定类型的`ancestor`字段。

示例：

```dart
class MyComponent extends Component with HasAncestor<MyAncestorComponent> {
  @override
  void onLoad() {
    // ancestor是MyAncestorComponent类型。
    print(ancestor.myValue);
  }
}
```

如果你尝试将`MyComponent`添加到不包含`MyAncestorComponent`的树中，将抛出断言错误。

### 组件键

组件可以具有一个标识符键，该键允许它们从组件树中的任何位置检索到。

要使用密钥注册组件，只需在组件构造函数的`key`参数中传递一个密钥：

```dart
final myComponent = Component(
  key: ComponentKey.named('player'),
);
```

然后，在组件树的不同位置检索它：

```dart
flameGame.findByKey(ComponentKey.named('player'));
```

有两种类型的键，`unique`和`named`。唯一键基于密钥实例的相等性，这意味着：

```dart
final key = ComponentKey.unique();
final key2 = key;
print(key == key2); // true
print(key == ComponentKey.unique()); // false
```

命名键基于其接收的名称，因此：

```dart
final key1 = ComponentKey.named('player');
final key2 = ComponentKey.named('player');
print(key1 == key2); // true
```

使用命名键时，还可以使用`findByKeyName`辅助函数来检索组件。

```dart
flameGame.findByKeyName('player');
```

### 查询子组件

添加到组件的子组件位于一个名为`children`的`QueryableOrderedSet`中。要查询集合中的特定类型组件，可以使用`query<T>()`函数。默认情况下，`children`集合的`strictMode`为`false`，但如果将其设置为`true`，则必须使用`children.register`注册查询后才能使用。

如果在编译时知道将运行某种类型的查询，则建议注册该查询，无论`strictMode`是设置为`true`还是`false`，因为这样做可以获得一些性能优势。通常在`onLoad`中进行注册调用。

示例：

```dart
@override
void onLoad() {
  children.register<PositionComponent>();
}
```

上面的示例中注册了一个针对`PositionComponent`类型的查询，下面是一个如何查询已注册组件类型的示例。

```dart
@override
void update(double dt) {
  final allPositionComponents = children.query<PositionComponent>();
}
```

### 查询屏幕特定点的组件

方法`componentsAtPoint()`允许检查哪个组件在屏幕上的某个点被渲染。返回值是一个组件迭代器，还可以通过提供一个可写的`List<Vector2>`作为第二个参数来获取每个组件本地坐标空间中的初始点坐标。

该迭代器按从前到后的顺序检索组件，即首先是最前面的组件，然后是后面的组件。

此方法只能返回实现`containsLocalPoint()`方法的组件。`PositionComponent`（这是许多Flame组件的基础类）提供了这样的实现。但是，如果你定义了一个从`Component`派生的自定义类，则需要自己实现`containsLocalPoint()`方法。

以下是`componentsAtPoint()`使用的示例：

```dart
void onDragUpdate(DragUpdateInfo info) {
  game.componentsAtPoint(info.widget).forEach((component) {
    if (component is DropTarget) {
      component.highlight();
    }
  });
}
```

### 组件的可见性

隐藏或显示组件的推荐方法通常是使用`add`和`remove`方法从树中添加或移除它。

然而，从树中添加和移除组件会触发该组件的生命周期步骤（例如调用`onRemove`和`onMount`）。这是一个异步过程，并且需要注意确保在快速连续地移除和添加组件之前组件已经完成移除。


```dart
/// 隐藏或显示组件的一个示例
/// 通过快速连续地添加和移除子组件来处理
void show() async {
  // 先等待 [removed] future 完成，以防万一组件仍在被移除过程中。
  await myChildComponent.removed;
  add(myChildComponent);
}

void hide() {
  remove(myChildComponent);
}
```

这些行为并不总是理想。

另一种显示和隐藏组件的方法是使用`HasVisibility` mixin，该mixin可以用于任何继承自`Component`的类。此mixin引入了`isVisible`属性。只需将`isVisible`设置为`false`即可隐藏组件，并将其重新设置为`true`以再次显示它而无需从树中移除它。这会影响组件及其所有后代（子组件）的可见性。

```dart
/// 实现 HasVisibility 的示例
class MyComponent extends PositionComponent with HasVisibility {}

/// 使用 isVisible 属性的示例
final myComponent = MyComponent();
add(myComponent);

myComponent.isVisible = false;
```

mixin仅影响组件是否被渲染，而不会影响其他行为。

```{note}
重要！即使组件不可见，它仍然在树中并且将继续接收`update`和其他生命周期事件的调用。它仍然会响应输入事件，并且会与其他组件交互，例如碰撞检测等。
```

mixin通过防止调用`renderTree`方法来实现这一点，因此如果重写了`renderTree`，应包含对`isVisible`的手动检查以保留此功能。

```dart
class MyComponent extends PositionComponent with HasVisibility {

  @override
  void renderTree(Canvas canvas) {
    // 检查可见性
    if (isVisible) {
      // 自定义代码

      // 继续渲染树
      super.renderTree(canvas);
    }
  }
}
```

## PositionComponent

此类代表屏幕上一个带有位置的对象，可以是浮动矩形、旋转精灵或具有位置和大小的任何其他内容。如果向其添加子组件，它还可以代表一组带有位置的组件。

`PositionComponent`的基础是它有一个`position`（位置）、`size`（尺寸）、`scale`（缩放）、`angle`（角度）和`anchor`（锚点），这些属性决定了组件是如何渲染的。

### 位置

`position`是一个`Vector2`，表示该组件的锚点相对于其父级的位置；如果父级是`FlameGame`，则相对于视口。

### 尺寸

`size`是在相机缩放级别为1.0（无缩放，默认）时组件的尺寸。`size`与组件的父级无关。

### 缩放

`scale`表示组件及其子组件应被缩放的比例。由于它是一个`Vector2`，可以通过改变`x`和`y`来实现统一缩放，也可以通过改变`x`或`y`不同的比例来实现非均匀缩放。

### 角度

`angle`是相对于父级角度的旋转角度，用双精度浮点数表示弧度。

### 本征角度（Native Angle）

`nativeAngle`是一个以弧度为单位的角度，顺时针方向测量，表示组件默认的方向。当[angle](#angle)为零时，可以用来定义组件面向的方向。

这在让基于精灵的组件朝向特定目标时特别有用。如果精灵原始图像不是朝向正上方或北方，那么为了使组件正确地朝向目标，计算出的角度将需要一些偏移量。在这种情况下，`nativeAngle`可用于告知组件原始图像是朝向哪个方向。

例如，一个子弹图像朝向东方。在这种情况下，可以将`nativeAngle`设置为π/2弧度。下面是一些常见的方向及其对应的本征角度值。

| 方向 | 本征角度（Native Angle） | 度数 |
|------|--------------------------|------|
| 上/北 | 0                        | 0    |
| 下/南 | π 或 -π                  | 180 或 -180 |
| 左/西 | -π/2                     | -90  |
| 右/东 | π/2                      | 90   |

### 锚点（Anchor）

```{flutter-app}
:sources: ../flame/examples
:page: anchor
:show: widget code infobox
此示例显示更改父组件（红色）和子组件（蓝色）的 `anchor` 点的效果。点击它们可以循环切换锚点位置。请注意，子组件的局部位置始终为 (0, 0)。
```

`anchor` 表示从组件的何处定义其位置和旋转（默认是`Anchor.topLeft`）。因此，如果将锚点设置为 `Anchor.center`，那么组件在屏幕上的位置将在组件中心，并且如果应用了角度，则会绕该锚点旋转，即在这种情况下绕组件中心旋转。你可以将其视为Flame“抓住”组件的内部某一点。

当查询组件的 `position` 或 `absolutePosition` 时，返回的坐标是组件锚点的位置。如果你想找到一个不是实际 `anchor` 点的具体锚点位置，可以使用 `positionOfAnchor` 和 `absolutePositionOfAnchor` 方法。

```dart
final comp = PositionComponent(
  size: Vector2.all(20),
  anchor: Anchor.center,
);

// 返回 (0,0)
final p1 = component.position;

// 返回 (10, 10)
final p2 = component.positionOfAnchor(Anchor.bottomRight);
```

使用 `anchor` 时的一个常见误区是将其误认为子组件的附加点。例如，将父组件的 `anchor` 设置为 `Anchor.center` 并不意味着子组件会相对于父组件的中心进行定位。

```{note}
子组件的局部原点始终是其父组件的左上角，与它们的 `anchor` 值无关。
```

### PositionComponent 子组件

`PositionComponent` 的所有子组件都将相对于父组件进行变换，这意味着 `position`、`angle` 和 `scale` 将相对于父组件的状态。因此，如果你想将一个子组件定位在父组件的中心，可以这样做：

```dart
@override
void onLoad() {
  final parent = PositionComponent(
    position: Vector2(100, 100),
    size: Vector2(100, 100),
  );
  final child = PositionComponent(
    position: parent.size / 2,
    anchor: Anchor.center,
  );
  parent.add(child);
}
```

请记住，大多数在屏幕上渲染的组件都是 `PositionComponent`，因此该模式也可以用于例如 [SpriteComponent](#spritecomponent) 和 [SpriteAnimationComponent](#spriteanimationcomponent)。

### 渲染 PositionComponent

当为继承自 `PositionComponent` 的组件实现 `render` 方法时，请从左上角 (0.0) 开始渲染。你的 `render` 方法不应处理组件在屏幕上的渲染位置。要处理渲染的位置和方式，请使用 `position`、`angle` 和 `anchor` 属性，Flame 将自动处理其余部分。

如果你想知道组件边界框在屏幕上的位置，可以使用 `toRect` 方法。

如果你想改变组件的渲染方向，也可以使用 `flipHorizontally()` 和 `flipVertically()` 来翻转在 `render(Canvas canvas)` 中绘制的所有内容，绕锚点进行。这些方法适用于所有 `PositionComponent` 对象，在 `SpriteComponent` 和 `SpriteAnimationComponent` 上特别有用。

如果你希望围绕中心翻转组件而不更改锚点为 `Anchor.center`，可以使用 `flipHorizontallyAroundCenter()` 和 `flipVerticallyAroundCenter()`。

## SpriteComponent

最常见的 `PositionComponent` 实现是 `SpriteComponent`，可以通过 `Sprite` 创建：

```dart
import 'package:flame/components/component.dart';

class MyGame extends FlameGame {
  late final SpriteComponent player;

  @override
  Future<void> onLoad() async {
    final sprite = await Sprite.load('player.png');
    final size = Vector2.all(128.0);
    final player = SpriteComponent(size: size, sprite: sprite);

    // 默认为 Vector2(0.0, 0.0)，也可以在构造函数中设置
    player.position = Vector2(10, 20);

    // 默认为 0，也可以在构造函数中设置
    player.angle = 0;

    // 添加组件
    add(player);
  }
}
```

## SpriteAnimationComponent

`SpriteAnimationComponent` 类用于表示具有运行单个循环动画的精灵图的组件。

这将创建一个简单的三帧动画，使用三个不同的图像：

```dart
@override
Future<void> onLoad() async {
  final sprites = [0, 1, 2]
      .map((i) => Sprite.load('player_$i.png'));
  final animation = SpriteAnimation.spriteList(
    await Future.wait(sprites),
    stepTime: 0.01,
  );
  this.player = SpriteAnimationComponent(
    animation: animation,
    size: Vector2.all(64.0),
  );
}
```

如果你有精灵图集，可以使用 `SpriteAnimationData` 类的 `sequenced` 构造函数（详情请参阅 [Images &gt; Animation](rendering/images.md#animation)）：

```dart
@override
Future<void> onLoad() async {
  final size = Vector2.all(64.0);
  final data = SpriteAnimationData.sequenced(
    textureSize: size,
    amount: 2,
    stepTime: 0.1,
  );
  this.player = SpriteAnimationComponent.fromFrameData(
    await images.load('player.png'),
    data,
  );
}
```

所有动画组件内部维护一个 `SpriteAnimationTicker`，用于驱动 `SpriteAnimation`。这使得多个组件可以共享同一个动画对象。

例如：

```dart
final sprites = [/*你的精灵列表*/];
final animation = SpriteAnimation.spriteList(sprites, stepTime: 0.01);

final animationTicker = SpriteAnimationTicker(animation);

// 或者你也可以让动画对象为你创建一个。
final animationTicker = animation.createTicker(); // 创建一个新的 ticker

animationTicker.update(dt);
```

要监听动画完成（到达最后一帧且不循环）事件，可以使用 `animationTicker.completed`。

例如：

```dart
await animationTicker.completed;

doSomething();

// 或者替代地

animationTicker.completed.whenComplete(doSomething);
```

此外，`SpriteAnimationTicker` 还具有以下可选的回调事件：`onStart`、`onFrame` 和 `onComplete`。要监听这些事件，可以这样做：

```dart
final animationTicker = SpriteAnimationTicker(animation)
  ..onStart = () {
    // 启动时执行某些操作。
  };

final animationTicker = SpriteAnimationTicker(animation)
  ..onComplete = () {
    // 完成时执行某些操作。
  };

final animationTicker = SpriteAnimationTicker(animation)
  ..onFrame = (index) {
    if (index == 1) {
      // 对于第二帧执行某些操作。
    }
  };
```

## SpriteAnimationGroupComponent

`SpriteAnimationGroupComponent` 是 `SpriteAnimationComponent` 的一个简单包装器，使你的组件能够持有多个动画并在运行时更改当前播放的动画。由于这个组件只是一个包装器，事件监听器可以按照 [SpriteAnimationComponent](#spriteanimationcomponent) 中所述的方式实现。

使用方式非常类似于 `SpriteAnimationComponent`，但不是用单个动画初始化，而是接收一个键为泛型类型 `T`、值为 `SpriteAnimation` 的 Map 和当前动画。

例如：

```dart
enum RobotState {
  idle,
  running,
}

final running = await loadSpriteAnimation(/* 省略 */);
final idle = await loadSpriteAnimation(/* 省略 */);

final robot = SpriteAnimationGroupComponent<RobotState>(
  animations: {
    RobotState.running: running,
    RobotState.idle: idle,
  },
  current: RobotState.idle,
);

// 将当前动画更改为 "running"
robot.current = RobotState.running;
```

由于这个组件处理多个 `SpriteAnimation`，自然需要相同数量的动画 ticker 来驱动所有这些动画。使用 `animationsTickers` getter 可以访问每个动画状态对应的 ticker 映射。这在你想要为 `onStart`、`onComplete` 和 `onFrame` 注册回调时非常有用。

例如：

```dart
enum RobotState { idle, running, jump }

final running = await loadSpriteAnimation(/* 省略 */);
final idle = await loadSpriteAnimation(/* 省略 */);

final robot = SpriteAnimationGroupComponent<RobotState>(
  animations: {
    RobotState.running: running,
    RobotState.idle: idle,
  },
  current: RobotState.idle,
);

robot.animationTickers?[RobotState.running]?.onStart = () {
  // 运动动画启动时执行某些操作。
};

robot.animationTickers?[RobotState.jump]?.onStart = () {
  // 跳跃动画启动时执行某些操作。
};

robot.animationTickers?[RobotState.jump]?.onComplete = () {
  // 跳跃动画完成时执行某些操作。
};

robot.animationTickers?[RobotState.idle]?.onFrame = (currentIndex) {
  // 基于空闲动画的当前帧索引执行某些操作。
};
```

## SpriteGroupComponent

`SpriteGroupComponent` 类似于其动画对应版本，但专门用于精灵。

例如：

```dart
class PlayerComponent extends SpriteGroupComponent<ButtonState>
    with HasGameReference<SpriteGroupExample>, TapCallbacks {
  @override
  Future<void>? onLoad() async {
    final pressedSprite = await gameRef.loadSprite(/* 省略 */);
    final unpressedSprite = await gameRef.loadSprite(/* 省略 */);

    sprites = {
      ButtonState.pressed: pressedSprite,
      ButtonState.unpressed: unpressedSprite,
    };

    current = ButtonState.unpressed;
  }

  // tap 方法处理程序省略...
}
```

## SpawnComponent

这是一个非视觉组件，用于在其父组件中生成其他组件。非常适合需要在某个区域内随机生成敌人或增益道具的情况。

`SpawnComponent` 接收一个工厂函数用于创建新组件和一个生成这些组件的区域（或边界）。

对于区域，可以使用 `Circle`、`Rectangle` 或 `Polygon` 类，并且如果只想沿着形状的边缘生成组件，请将 `within` 参数设置为 false（默认为 true）。

例如，下面会在定义的圆内每 0.5 秒随机生成一个新的 `MyComponent`：

```dart
SpawnComponent(
  factory: (i) => MyComponent(size: Vector2(10, 20)),
  period: 0.5,
  area: Circle(Vector2(100, 200), 150),
);
```

如果不想让生成速率固定，可以使用 `SpawnComponent.periodRange` 构造函数，并指定 `minPeriod` 和 `maxPeriod` 参数。下面的例子会在圆内随机生成组件，并且每次新生成的组件之间的时间间隔在 0.5 到 10 秒之间：

```dart
SpawnComponent.periodRange(
  factory: (i) => MyComponent(size: Vector2(10, 20)),
  minPeriod: 0.5,
  maxPeriod: 10,
  area: Circle(Vector2(100, 200), 150),
);
```

如果想在 `factory` 函数中自行设置位置，可以在构造函数中将 `selfPositioning` 设置为 true，并忽略 `area` 参数：

```dart
SpawnComponent(
  factory: (i) =>
    MyComponent(position: Vector2(100, 200), size: Vector2(10, 20)),
  selfPositioning: true,
  period: 0.5,
);
```

## SvgComponent

**注意**：要使用 Flame 中的 SVG，请使用 [`flame_svg`](https://github.com/flame-engine/flame_svg) 包。

此组件使用 `Svg` 类的实例来表示一个在游戏中渲染 SVG 的组件：

```dart
@override
Future<void> onLoad() async {
  final svg = await Svg.load('android.svg');
  final android = SvgComponent.fromSvg(
    svg,
    position: Vector2.all(100),
    size: Vector2.all(100),
  );
}
```

## ParallaxComponent

该组件用于通过在彼此上方绘制多个透明图像来渲染具有深度感的背景，其中每个图像或动画 (`ParallaxRenderer`) 都以不同的速度移动。

原理是当你看向地平线并移动时，较近的对象看起来比远处的对象移动得更快。

此组件模拟了这种效果，从而实现更逼真的背景效果。

最简单的 `ParallaxComponent` 创建方式如下：

```dart
@override
Future<void> onLoad() async {
  final parallaxComponent = await loadParallaxComponent([
    ParallaxImageData('bg.png'),
    ParallaxImageData('trees.png'),
  ]);
  add(parallaxComponent);
}
```

`SpawnComponent` 可以通过实现 `onLoad` 方法自行加载：

```dart
class MyParallaxComponent extends ParallaxComponent<MyGame> {
  @override
  Future<void> onLoad() async {
    parallax = await gameRef.loadParallax([
      ParallaxImageData('bg.png'),
      ParallaxImageData('trees.png'),
    ]);
  }
}

class MyGame extends FlameGame {
  @override
  void onLoad() {
    add(MyParallaxComponent());
  }
}
```

这将创建一个静态背景。若要创建移动的视差效果，可以通过设置每个层的速度来实现。

最简单的设置方式是在 `load` 辅助函数中指定命名可选参数 `baseVelocity` 和 `velocityMultiplierDelta`。例如，如果你想让背景图像沿 X 轴以更快的速度移动（越近的图像速度越快）：

```dart
@override
Future<void> onLoad() async {
  final parallaxComponent = await loadParallaxComponent(
    _dataList,
    baseVelocity: Vector2(20, 0),
    velocityMultiplierDelta: Vector2(1.8, 1.0),
  );
}
```

可以在任意时间设置 `baseSpeed` 和 `layerDelta`，例如角色跳跃或游戏加速时：

```dart
@override
void onLoad() {
  final parallax = parallaxComponent.parallax;
  parallax.baseSpeed = Vector2(100, 0);
  parallax.velocityMultiplierDelta = Vector2(2.0, 1.0);
}
```

默认情况下，图像沿底部左对齐，沿 X 轴重复，并按比例缩放以覆盖屏幕高度。如果想更改此行为，例如创建非横向滚动的游戏，则可以为每个 `ParallaxRenderer` 设置 `repeat`、`alignment` 和 `fill` 参数，并将它们添加到传递给 `ParallaxComponent` 构造函数的 `ParallaxLayer` 中。

高级示例：

```dart
final images = [
  loadParallaxImage(
    'stars.jpg',
    repeat: ImageRepeat.repeat,
    alignment: Alignment.center,
    fill: LayerFill.width,
  ),
  loadParallaxImage(
    'planets.jpg',
    repeat: ImageRepeat.repeatY,
    alignment: Alignment.bottomLeft,
    fill: LayerFill.none,
  ),
  loadParallaxImage(
    'dust.jpg',
    repeat: ImageRepeat.repeatX,
    alignment: Alignment.topRight,
    fill: LayerFill.height,
  ),
];

final layers = images.map(
  (image) => ParallaxLayer(
    await image,
    velocityMultiplier: images.indexOf(image) * 2.0,
  )
);

final parallaxComponent = ParallaxComponent.fromParallax(
  Parallax(
    await Future.wait(layers),
    baseVelocity: Vector2(50, 0),
  ),
);
```

- 示例中星的图像将沿两个轴重复，居中对齐并缩放以覆盖屏幕宽度。
- 行星的图像将在 Y 轴上重复，并沿屏幕左下角对齐且不进行缩放。
- 灰尘的图像将在 X 轴上重复，右上角对齐并按高度缩放。

设置完成后将 `ParallaxComponent` 添加到游戏中的其他组件一样 (`game.add(parallaxComponent)`)。不要忘记在 `pubspec.yaml` 中将图像作为资源添加，否则它们不会被找到。此外，Flame 提供了扩展功能来自动使用游戏的图像缓存而不是全局缓存。

如果需要全屏视差效果，只需省略大小参数，它将采用游戏尺寸，并且会在游戏改变大小或方向时自动调整为全屏。

Flame 提供两种类型的 `ParallaxRenderer`：`ParallaxImage` 和 `ParallaxAnimation`。其中前者是静态图像渲染器，后者则是基于帧的动画渲染器。还可以通过扩展 `ParallaxRenderer` 类来自定义渲染器。

更多示例实现可以在 [examples 目录](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/parallax) 中找到。

## 形状组件

`ShapeComponent` 是用于表示可缩放几何形状的基本类。尽管不同的形状有不同的方式来定义外观，但它们都有可以修改的大小和角度，并根据这些属性进行缩放或旋转。

这些形状通常用作工具，以更通用的方式使用几何图形（而不仅仅是与碰撞检测系统一起），例如 [ShapeHitbox](collision_detection.md#shapehitbox)。

### PolygonComponent

`PolygonComponent` 是通过在构造函数中给出顶点列表创建的。这个列表将被转换为具有大小的多边形，该大小仍然可以缩放和旋转。

例如，这将创建一个从 (50, 50) 到 (100, 100)，中心位于 (75, 75) 的正方形：

```dart
void main() {
  PolygonComponent([
    Vector2(100, 100),
    Vector2(100, 50),
    Vector2(50, 50),
    Vector2(50, 100),
  ]);
}
```

`PolygonComponent` 还可以通过相对顶点列表创建，这些顶点定义为相对于给定大小（通常是预期父级的大小）。

例如，你可以这样创建一个菱形多边形：

```dart
void main() {
  PolygonComponent.relative(
    [
      Vector2(0.0, -1.0), // 中间顶部墙
      Vector2(1.0, 0.0),  // 中间右侧墙
      Vector2(0.0, 1.0),  // 中间底部墙
      Vector2(-1.0, 0.0), // 中间左侧墙
    ],
    size: Vector2.all(100),
  );
}
```

在示例中，顶点定义了相对于多边形中心的长度百分比，因此列表中的第一个项 `Vector2(0.0, -1.0)` 指向边界框的顶部中间。

![如何定义多边形形状的示例](/images/polygon_shape.png)

在图像中可以看到由紫色箭头形成的多边形是如何被红色箭头定义的。

### RectangleComponent

`RectangleComponent` 的创建方式与 `PositionComponent` 类似，因为它也有一个边界矩形。

例如：

```dart
void main() {
  RectangleComponent(
    position: Vector2(10.0, 15.0),
    size: Vector2.all(10),
    angle: pi/2,
    anchor: Anchor.center,
  );
}
```

Dart 还有一种创建矩形的优秀方式，即 `Rect` 类。你可以通过使用 `Rectangle.fromRect` 工厂函数从 `Rect` 创建一个 Flame `RectangleComponent`。如果使用此构造函数，则根据 `Rect` 调整你的矩形大小。

以下将创建一个左上角位于 `(10, 10)`，大小为 `(100, 50)` 的 `RectangleComponent`：

```dart
void main() {
  RectangleComponent.fromRect(
    Rect.fromLTWH(10, 10, 100, 50),
  );
}
```

你还可以通过定义相对于预期父级大小的关系来创建一个 `RectangleComponent`。可以使用默认构造函数从位置、大小和角度构建矩形。`relation` 是一个相对于父级大小的向量，例如 `relation` 为 `Vector2(0.5, 0.8)` 将创建一个宽度为父级大小50%，高度为父级大小80% 的矩形。

以下示例将创建一个大小为 `(25.0, 30.0)` 并位于 `(100, 100)` 的 `RectangleComponent`：

```dart
void main() {
  RectangleComponent.relative(
    Vector2(0.5, 1.0),
    position: Vector2.all(100),
    size: Vector2(50, 30),
  );
}
```

由于正方形是矩形的简化版本，因此还有一个用于创建正方形 `RectangleComponent` 的构造函数。唯一不同的是 `size` 参数为 `double` 而不是 `Vector2`。

```dart
void main() {
  RectangleComponent.square(
    position: Vector2.all(100),
    size: 200,
  );
}
```

### CircleComponent

如果你已知圆的位置和半径，可以使用可选参数 `radius` 和 `position` 来设置。

以下将创建一个中心位于 `(100, 100)` 半径为5的 `CircleComponent`，因此大小为 `Vector2(10, 10)`：

```dart
void main() {
  CircleComponent(radius: 5, position: Vector2.all(100), anchor: Anchor.center);
}
```

使用 `relative` 构造函数创建一个 `CircleComponent` 时，可以定义半径相对于由 `size` 定义的边界框最短边的比例。

以下示例将结果为一个半径为40（直径80）的 `CircleComponent`：

```dart
void main() {
  CircleComponent.relative(0.8, size: Vector2.all(100));
}
```

## IsometricTileMapComponent

此组件允许你根据由方块构成的笛卡尔矩阵和等距瓦片集渲染一个等距地图。

使用方法示例：

```dart
// 创建一个瓦片集，块ID将从左到右、然后从上到下自动分配。
final tilesetImage = await images.load('tileset.png');
final tileset = SpriteSheet(image: tilesetImage, srcSize: Vector2.all(32));
// 每个元素是一个块ID，-1表示无内容
final matrix = [[0, 1, 0], [1, 0, 0], [1, 1, 1]];
add(IsometricTileMapComponent(tileset, matrix));
```

它还提供了坐标转换的方法，因此你可以处理点击、悬停，在瓦片上方渲染实体，添加选择器等。

你还可以指定 `tileHeight`，它是每个方块底部和平面之间的垂直距离。基本上，这是你的方块最前面边缘的高度；通常是方块大小的一半（默认）或四分之一。在下图中可以看到高度以更深的色调标注：

![如何确定 tileHeight 的示例](/images/tile-height-example.png)

这是一张使用四分之长瓦片地图的示例：

![一个带有选择器的等距地图示例](/images/isometric.png)

Flame 的示例应用中包含了一个更详细的示例，展示了如何解析坐标以创建选择器。代码可以在[这里](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/isometric_tile_map_example.dart)找到，并且有一个在线版本可以查看[这里](https://examples.flame-engine.org/#/Rendering_Isometric_Tile_Map)。

## NineTileBoxComponent

Nine Tile Box 是使用网格精灵绘制的矩形。

网格精灵是一个3x3网格，包含9个块，代表四个角、四条边和中间部分。

四个角以相同大小绘制，四条边沿方向拉伸，中间部分向两个方向展开。

通过这种方式，你可以创建一个适应各种尺寸的框或矩形。这对于制作面板、对话框、边框等非常有用。

有关如何使用的详细信息，请参阅示例应用
[nine_tile_box](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/nine_tile_box_example.dart)。

## CustomPainterComponent

`CustomPainter` 是 Flutter 中用于在应用程序中渲染自定义形状的类，通常与 `CustomPaint` 小部件一起使用。

Flame 提供了一个名为 `CustomPainterComponent` 的组件，可以渲染一个 `CustomPainter`。它接收一个自定义绘制器并在游戏画布上渲染它。

这有助于在 Flame 游戏和 Flutter 小部件之间共享自定义渲染逻辑。

有关如何使用的详细信息，请参阅示例应用
[custom_painter_component](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/widgets/custom_painter_example.dart)。

## ComponentsNotifier

大多数情况下，只需访问子组件及其属性即可构建游戏逻辑。

但有时，响应性可以帮助开发者简化代码并提高质量。为此，Flame 提供了 `ComponentsNotifier`，它是 `ChangeNotifier` 的实现，在添加、移除或手动更改组件时通知监听者。

例如，假设当玩家的生命值为零时要显示“游戏结束”文本。

为了使组件自动报告新实例的添加或移除，可以将 `Notifier` 混合到组件类中：

```dart
class Player extends SpriteComponent with Notifier {}
```

然后使用 `FlameGame` 的 `componentsNotifier` 方法来监听该组件的变化：

```dart
class MyGame extends FlameGame {
  int lives = 2;

  @override
  void onLoad() {
    final playerNotifier = componentsNotifier<Player>()
        ..addListener(() {
          final player = playerNotifier.single;
          if (player == null) {
            lives--;
            if (lives == 0) {
              add(GameOverComponent());
            } else {
              add(Player());
            }
          }
        });
  }
}
```

`Notifier` 组件也可以手动通知其监听者发生了变化。扩展上面的示例，制作一个当玩家生命值低于一半时闪烁的HUD组件。为此，需要让 `Player` 组件手动通知更改：

```dart
class Player extends SpriteComponent with Notifier {
  double health = 1;

  void takeHit() {
    health -= .1;
    if (health == 0) {
      removeFromParent();
    } else if (health <= .5) {
      notifyListeners();
    }
  }
}
```

然后HUD组件可能如下所示：

```dart
class Hud extends PositionComponent with HasGameRef {

  @override
  void onLoad() {
    final playerNotifier = gameRef.componentsNotifier<Player>()
        ..addListener(() {
          final player = playerNotifier.single;
          if (player != null) {
            if (player.health <= .5) {
              add(BlinkEffect());
            }
          }
        });
  }
}
```

`ComponentsNotifier` 还可以用于在 `FlameGame` 中状态更改时重建小部件。为此，Flame 提供了 `ComponentsNotifierBuilder` 小部件。

有关其使用的示例，请参阅运行中的示例
[here](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/components/components_notifier_example.dart)。

## ClipComponent

`ClipComponent` 是一个组件，它会将画布裁剪到其大小和形状。这意味着如果该组件本身或 `ClipComponent` 的任何子组件在其边界之外渲染，则不会显示超出部分。

`ClipComponent` 接收一个构建函数，该函数应返回根据其大小定义裁剪区域的 `Shape`。

为了方便使用此组件，提供了三个工厂方法以提供常见的形状：

- `ClipComponent.rectangle`: 根据其大小将区域裁剪成矩形。
- `ClipComponent.circle`: 根据其大小将区域裁剪成圆形。
- `ClipComponent.polygon`: 根据构造函数接收到的点将区域裁剪成多边形。

有关如何使用的详细信息，请参阅示例应用
[clip_component](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/components/clip_component_example.dart)。

## Effects

Flame 提供了一组可以应用于某些类型组件的效果，这些效果可用于动画组件的某些属性，如位置或尺寸。
有关这些效果的列表，请参阅[此处](effects.md)。

运行中的效果示例可以在[这里](https://github.com/flame-engine/flame/tree/main/examples/lib/stories/effects)找到。

## 不使用 `FlameGame` 时

如果不使用 `FlameGame`，请记住所有组件都需要在每次游戏更新时进行更新。这使组件能够执行内部处理并更新其状态。

例如，在所有基于 `SpriteAnimation` 的组件中的 `SpriteAnimationTicker` 需要对动画对象进行计时以决定下一个要显示的动画帧。不使用 `FlameGame` 时，可以通过手动调用 `component.update()` 来实现。这也意味着，如果正在实现自己的基于精灵动画的组件，可以直接使用 `SpriteAnimationTicker` 来更新 `SpriteAnimation`。