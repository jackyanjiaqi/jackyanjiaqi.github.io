# 粒子

Flame 提供了一个基础但强大且可扩展的粒子系统。这个系统的核心概念是 `Particle` 类，它在行为上与 `ParticleSystemComponent` 类似。

在 `FlameGame` 中使用 `Particle` 的最基本方法如下所示：

```dart
import 'package:flame/components.dart';

// ...

game.add(
  // 将 Particle 包装在 ParticleSystemComponent 中
  // 该组件将生命周期钩子映射到 Particle 上
  // 并嵌入了一个触发器来移除该组件。
  ParticleSystemComponent(
    particle: CircleParticle(),
  ),
);
```

在自定义的 `Game` 实现中使用 `Particle` 时，请确保在每个游戏循环的 tick 中调用 `update` 和 `render` 方法。

实现期望粒子效果的主要方法：

- 组合现有行为。
- 使用行为链式调用（即第一种方法的语法糖）。
- 使用 `ComputedParticle`。

组合方法与 Flutter 小部件的组合类似，从上到下定义效果。链式调用则允许通过从下到上定义行为来更流畅地表达相同的组合树。`ComputedParticle` 完全将行为的实现委托给代码。任何一种方法都可以与现有的行为结合使用。

```dart
Random rnd = Random();

Vector2 randomVector2() => (Vector2.random(rnd) - Vector2.random(rnd)) * 200;

// 组合方式
//
// 将粒子效果定义为一组从上到下嵌套的行为，彼此包含：
//
// ParticleSystemComponent
//   > ComposedParticle
//     > AcceleratedParticle
//       > CircleParticle
game.add(
  ParticleSystemComponent(
    particle: Particle.generate(
      count: 10,
      generator: (i) => AcceleratedParticle(
        acceleration: randomVector2(),
        child: CircleParticle(
          paint: Paint()..color = Colors.red,
        ),
      ),
    ),
  ),
);

// 链式调用方式
//
// 表达与上面相同的行为，但使用更流畅的 API。
// 仅支持混合了 SingleChildParticle 的粒子作为链式行为。
game.add(
  ParticleSystemComponent(
    particle: Particle.generate(
      count: 10,
      generator: (i) => pt.CircleParticle(paint: Paint()..color = Colors.red)
    )
  )
);

// 计算粒子方式
//
// 所有行为都由代码显式定义。相比内置行为，提供更大的灵活性。
game.add(
  ParticleSystemComponent(
      particle: Particle.generate(
        count: 10,
        generator: (i) {
          Vector2 position = Vector2.zero();
          Vector2 speed = Vector2.zero();
          final acceleration = randomVector2();
          final paint = Paint()..color = Colors.red;

          return ComputedParticle(
            renderer: (canvas, _) {
              speed += acceleration;
              position += speed;
              canvas.drawCircle(Offset(position.x, position.y), 1, paint);
            }
        );
      }
    )
  )
);
```

查看更多 [如何以各种组合使用内置粒子的示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/particles_example.dart)。

## 生命周期

所有 `Particle` 的一个共通行为是它们都接受一个 `lifespan` 参数。这个值用于让 `ParticleSystemComponent` 在其内部 `Particle` 的生命周期结束时自动移除自己。`Particle` 内部的时间是通过 Flame 的 `Timer` 类进行跟踪的。你可以通过将一个 `double`（以秒为单位，精确到微秒）传入相应的 `Particle` 构造函数来配置。

```dart
Particle(lifespan: .2); // 活动 200 毫秒。
Particle(lifespan: 4); // 活动 4 秒。
```

你也可以通过 `setLifespan` 方法重置 `Particle` 的生命周期，该方法也接受一个 `double` 类型的秒数。

```dart
final particle = Particle(lifespan: 2);

// ... 一段时间后
particle.setLifespan(2) // 会再活动 2 秒。
```

在其生命周期内，`Particle` 会跟踪它的生存时间，并通过 `progress` getter 提供该信息，返回的值介于 `0.0` 和 `1.0` 之间。这个值可以类似于 Flutter 中 `AnimationController` 类的 `value` 属性使用。

```dart
final particle = Particle(lifespan: 2.0);

game.add(ParticleSystemComponent(particle: particle));

// 将打印从 0 到 1 的值，步长为 .1：0, 0.1, 0.2 ... 0.9, 1.0。
Timer.periodic(duration * .1, () => print(particle.progress));
```

`lifespan` 会传递给所有支持嵌套行为的 `Particle` 的后代。

## 内置粒子

Flame 提供了几种内置的 `Particle` 行为：

- `TranslatedParticle`：将其 `child` 按给定的 `Vector2` 进行平移
- `MovingParticle`：将其 `child` 从一个预定义的 `Vector2` 移动到另一个，支持 `Curve`
- `AcceleratedParticle`：允许基本的物理效果，如重力或速度衰减
- `CircleParticle`：绘制各种形状和大小的圆
- `SpriteParticle`：在粒子效果中绘制 Flame `Sprite`
- `ImageParticle`：在粒子效果中绘制 *dart:ui* `Image`
- `ComponentParticle`：在粒子效果中绘制 Flame `Component`
- `FlareParticle`：在粒子效果中绘制 Flare 动画

查看更多 [如何将内置粒子行为结合使用的示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/particles_example.dart)。所有实现都可以在 [Flame 仓库中的粒子文件夹](https://github.com/flame-engine/flame/tree/main/packages/flame/lib/src/particles) 中找到。

## TranslatedParticle

简单地将底层 `Particle` 平移到渲染 `Canvas` 中指定的 `Vector2` 位置。不会改变或调整其位置。如果需要位置变化，请使用 `MovingParticle` 或 `AcceleratedParticle`。相同的效果可以通过平移 `Canvas` 层来实现。

```dart
game.add(
  ParticleSystemComponent(
    particle: TranslatedParticle(
      // 将子粒子效果平移到游戏画布的中心。
      offset: game.size / 2,
      child: Particle(),
    ),
  ),
);
```

## MovingParticle

在 `from` 和 `to` 两个 `Vector2` 之间移动其子 `Particle`，并在其生命周期内进行平滑过渡。支持通过 `CurvedParticle` 使用 `Curve`。

```dart
game.add(
  ParticleSystemComponent(
    particle: MovingParticle(
      // 将从游戏画布的一个角落移动到另一个角落。
      from: Vector2.zero(),
      to: game.size,
      child: CircleParticle(
        radius: 2.0,
        paint: Paint()..color = Colors.red,
      ),
    ),
  ),
);
```

## AcceleratedParticle

一个基础的物理粒子，允许你指定其初始的 `position`、`speed` 和 `acceleration`，并让 `update` 循环处理剩下的部分。所有三个参数都是 `Vector2` 类型，可以看作是向量。它尤其适用于基于物理的“爆发”效果，但不限于此。`Vector2` 值的单位是 *逻辑像素/秒*。例如，`Vector2(0, 100)` 的速度表示每秒移动 100 个逻辑像素。

```dart
final rnd = Random();
Vector2 randomVector2() => (Vector2.random(rnd) - Vector2.random(rnd)) * 100;

game.add(
  ParticleSystemComponent(
    particle: AcceleratedParticle(
      // 从游戏画布中心发射
      position: game.canvasSize/2,
      // 随机初始速度，范围为 Vector2(-100..100, 0..-100)
      speed: Vector2(rnd.nextDouble() * 200 - 100, -rnd.nextDouble() * 100),
      // 向下加速，模拟“重力”
      // speed: Vector2(0, 100),
      child: CircleParticle(
        radius: 2.0,
        paint: Paint()..color = Colors.red,
      ),
    ),
  ),
);
```

## CircleParticle

一个渲染圆形的 `Particle`，使用给定的 `Paint`，并在传入的 `Canvas` 的零偏移处绘制。可以与 `TranslatedParticle`、`MovingParticle` 或 `AcceleratedParticle` 一起使用，以便实现所需的定位效果。

```dart
game.add(
  ParticleSystemComponent(
    particle: CircleParticle(
      radius: game.size.x / 2,
      paint: Paint()..color = Colors.red.withOpacity(.5),
    ),
  ),
);
```

## SpriteParticle

允许你将 `Sprite`嵌入到粒子效果中。

```dart
game.add(
  ParticleSystemComponent(
    particle: SpriteParticle(
      sprite: Sprite('sprite.png'),
      size: Vector2(64, 64),
    ),
  ),
);
```

## ImageParticle

在粒子树中渲染给定的 `dart:ui` 图像。

```dart
// 游戏初始化时
await Flame.images.loadAll(const [
  'image.png',
]);

// ...

// 游戏循环中的某个地方
final image = await Flame.images.load('image.png');

game.add(
  ParticleSystemComponent(
    particle: ImageParticle(
      size: Vector2.all(24),
      image: image,
    ),
  ),
);
```

## ScalingParticle

在其生命周期内，将子 `Particle` 的大小从 1 变换到指定的 `to` 值。

```dart
game.add(
  ParticleSystemComponent(
    particle: ScalingParticle(
      lifespan: 2,
      to: 0,
      curve: Curves.easeIn,
      child: CircleParticle(
        radius: 2.0,
        paint: Paint()..color = Colors.red,
      )
    ),
  ),
);
```

## SpriteAnimationParticle

一个嵌入了 `SpriteAnimation` 的 `Particle`。默认情况下，会自动调整 `SpriteAnimation` 的 `stepTime`，以便在粒子生命周期内完全播放完动画。也可以通过 `alignAnimationTime` 参数来覆盖这一行为。

```dart
final spriteSheet = SpriteSheet(
  image: yourSpriteSheetImage,
  srcSize: Vector2.all(16.0),
);

game.add(
  ParticleSystemComponent(
    particle: SpriteAnimationParticle(
      animation: spriteSheet.createAnimation(0, stepTime: 0.1),
    ),
  ),
);
```

## ComponentParticle

这个 `Particle` 允许你将一个 `Component` 嵌入到粒子效果中。`Component` 可以有自己的 `update` 生命周期，并且可以在不同的效果树中复用。如果你只需要为某个 `Component` 实例添加一些动态效果，请考虑直接将其添加到 `game` 中，而不是通过 `Particle` 中介。

```dart
final longLivingRect = RectComponent();

game.add(
  ParticleSystemComponent(
    particle: ComponentParticle(
      component: longLivingRect
    ),
  ),
);

class RectComponent extends Component {
  void render(Canvas c) {
    c.drawRect(
      Rect.fromCenter(center: Offset.zero, width: 100, height: 100),
      Paint()..color = Colors.red
    );
  }

  void update(double dt) {
    /// 由父级 [Particle] 调用
  }
}
```

## ComputedParticle

当以下情况发生时，`ComputedParticle` 会很有帮助：

- 默认行为不够用
- 复杂效果优化
- 自定义缓动（easing）

创建时，它将所有渲染工作委托给提供的 `ParticleRenderDelegate`，该委托在每帧中被调用，以执行必要的计算并将内容渲染到 `Canvas`。

```dart
game.add(
  ParticleSystemComponent(
    // 渲染一个逐渐改变颜色和大小的圆形
    // 在粒子的生命周期内。
    particle: ComputedParticle(
      renderer: (canvas, particle) => canvas.drawCircle(
        Offset.zero,
        particle.progress * 10,
        Paint()
          ..color = Color.lerp(
            Colors.red,
            Colors.blue,
            particle.progress,
          ),
      ),
    ),
  ),
);
```

## 嵌套行为

Flame 对粒子的实现遵循类似于 Flutter 小部件的极致组合模式。通过将小的行为单元封装在每个粒子中，并将这些行为单元嵌套在一起，就能实现所需的视觉效果。

允许粒子相互嵌套的两个实体是：`SingleChildParticle` 混合类和 `ComposedParticle` 类。

`SingleChildParticle` 可以帮助你创建具有自定义行为的 `Particle`。例如，每帧随机定位其子粒子：

`SingleChildParticle` 允许你创建具有自定义行为的 `Particle`。例如，每帧随机定位其子粒子：

```dart
var rnd = Random();

class GlitchParticle extends Particle with SingleChildParticle {
  Particle child;

  GlitchParticle({
    required this.child,
    super.lifespan,
  });

  @override
  render(Canvas canvas) {
    canvas.save();
    canvas.translate(rnd.nextDouble() * 100, rnd.nextDouble() * 100);

    // 也会渲染子粒子
    super.render();

    canvas.restore();
  }
}
```

`ComposedParticle` 可以单独使用，也可以嵌套在现有的粒子树中。