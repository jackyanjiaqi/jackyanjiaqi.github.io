# 其他输入和辅助工具

这包括除了键盘和鼠标之外的输入方法文档。

对于其他输入文档，请参见：

- [手势输入](gesture_input.md)：用于鼠标和触摸指针的手势
- [键盘输入](keyboard_input.md)：用于按键操作


## 摇杆

Flame 提供了一个组件，可以创建一个虚拟摇杆来获取游戏的输入。
要使用此功能，您需要创建一个 `JoystickComponent`，根据您的需求进行配置，并将其添加到游戏中。

查看以下示例以获得更好的理解：

```dart
class MyGame extends FlameGame {

  @override
  Future<void> onLoad() async {
    super.onLoad();
    final image = await images.load('joystick.png');
    final sheet = SpriteSheet.fromColumnsAndRows(
      image: image,
      columns: 6,
      rows: 1,
    );
    final joystick = JoystickComponent(
      knob: SpriteComponent(
        sprite: sheet.getSpriteById(1),
        size: Vector2.all(100),
      ),
      background: SpriteComponent(
        sprite: sheet.getSpriteById(0),
        size: Vector2.all(150),
      ),
      margin: const EdgeInsets.only(left: 40, bottom: 40),
    );

    final player = Player(joystick);
    add(player);
    add(joystick);
  }
}

class Player extends SpriteComponent with HasGameRef {
  Player(this.joystick)
    : super(
        anchor: Anchor.center,
        size: Vector2.all(100.0),
      );

  /// 像素/秒
  double maxSpeed = 300.0;

  final JoystickComponent joystick;

  @override
  Future<void> onLoad() async {
    sprite = await gameRef.loadSprite('layers/player.png');
    position = gameRef.size / 2;
  }

  @override
  void update(double dt) {
    if (joystick.direction != JoystickDirection.idle) {
      position.add(joystick.relativeDelta * maxSpeed * dt);
      angle = joystick.delta.screenAngle();
    }
  }
}
```

在这个示例中，我们创建了 `MyGame` 和 `Player` 类。
`MyGame` 创建了一个摇杆，并在创建 `Player` 时将其传递给 `Player`。
在 `Player` 类中，我们会根据摇杆的当前状态进行操作。

摇杆有几项属性会随着其状态的变化而变化。

以下属性用于了解摇杆的状态：

- `intensity`: 摇杆中心到边缘（或 `knobRadius` 如果已设置）之间的拖动百分比 [0.0, 1.0]。
- `delta`: 摇杆中心点的绝对拖动量，定义为 `Vector2`。
- `relativeDelta`: 摇杆当前从其基准位置到边缘的拉拽方向和百分比（表示为 `Vector2`）。

如果您想与摇杆一起创建按钮，请查看 [`HudButtonComponent`](#hudbuttoncomponent)。

有关实现摇杆的完整代码，请参见 [摇杆示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/joystick_example.dart)。
您也可以查看 [摇杆组件的实际演示](https://examples.flame-engine.org/#/Input_Joystick)，以了解游戏集成中的实际摇杆输入功能。

为了增加挑战性，探索 [高级摇杆示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/joystick_advanced_example.dart)。
在 [实时演示](https://examples.flame-engine.org/#/Input_Joystick_Advanced) 中查看高级功能的其他用途。


## HudButtonComponent

`HudButtonComponent` 是一个按钮，可以通过与 `Viewport` 边缘的距离而不是位置来定义。它接受两个 `PositionComponent` 参数：`button` 和 `buttonDown`。前者用于按钮空闲状态时显示，后者用于按钮被按下时显示。如果不想在按下时更改按钮外观或通过 `button` 组件处理，则第二个参数是可选的。

正如名称所示，默认情况下此按钮是一个 HUD（头戴式显示器），这意味着即使游戏中的相机移动，它也会在屏幕上保持静态位置。您还可以通过设置 `hudButtonComponent.respectCamera = true;` 将其用作非 HUD 组件。

如果您想在按钮被按下和释放时执行操作（这是常见做法），可以通过传入回调函数作为 `onPressed` 和 `onReleased` 参数来实现，或者扩展该组件并重写 `onTapDown`, `onTapUp` 和/或 `onTapCancel` 并在此处实现逻辑。


## SpriteButtonComponent

`SpriteButtonComponent` 是一个由两个 `Sprite` 定义的按钮，其中一个表示按钮按下时的状态，另一个表示按钮释放时的状态。


## ButtonComponent

`ButtonComponent` 是一个由两个 `PositionComponent` 定义的按钮，其中一个表示按钮按下时的状态，另一个表示按钮释放时的状态。如果只想使用精灵作为按钮，请改用 [SpriteButtonComponent]；但是此组件在您希望具有 `SpriteAnimationComponent` 作为按钮或其他非纯精灵内容的情况下可能更好。


## 游戏手柄

Flame 拥有一个专门的插件来支持外部游戏控制器（游戏手柄）。
更多信息请参见 [Gamepads 存储库](https://github.com/flame-engine/gamepad)。


## AdvancedButtonComponent

`AdvancedButtonComponent` 为每个不同的指针阶段提供了单独的状态。
皮肤可以为每个状态自定义，并且每个皮肤由一个 `PositionComponent` 表示。

这些字段可用于自定义 `AdvancedButtonComponent` 的外观：

- `defaultSkin`: 默认显示在按钮上的组件。
- `downSkin`: 按钮被点击或触按时显示的组件。
- `hoverSkin`: 按钮悬停时显示的组件（桌面和网络）。
- `defaultLabel`: 显示在皮肤顶部的组件。会自动居中对齐。
- `disabledSkin`: 按钮处于禁用状态时显示的组件。
- `disabledLabel`: 按钮处于禁用状态时显示在皮肤顶部的组件。


## ToggleButtonComponent

[ToggleButtonComponent] 是一个 [AdvancedButtonComponent]，可以在选中和未选中之间切换。

除了已存在的皮肤外，[ToggleButtonComponent] 包含以下皮肤：

- `defaultSelectedSkin`: 按钮处于选中状态时显示的组件。
- `downAndSelectedSkin`: 当可选择按钮被选中并按下时显示的组件。
- `hoverAndSelectedSkin`: 可选择且已选中的按钮悬停（桌面和网络）。
- `disabledAndSelectedSkin`: 按钮处于选中和禁用状态时使用的组件。
- `defaultSelectedLabel`: 按钮被选中时显示在皮肤顶部的组件。


## IgnoreEvents 混合器

如果您不希望某个组件子树接收事件，可以使用 `IgnoreEvents` 混合器。
一旦添加了此混合器，可以通过将 `ignoreEvents = true`（添加混合器时的默认值）来关闭到达该组件及其后代的所有事件，当您想重新接收事件时将其设置为 `false`。

这可以用于优化目的，因为当前所有事件都会通过整个组件树。