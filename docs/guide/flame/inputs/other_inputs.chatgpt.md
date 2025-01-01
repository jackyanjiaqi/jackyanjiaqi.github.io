# 其他输入与辅助工具

本文档涵盖键盘和鼠标以外的输入方法。

有关其他输入的文档，请参见：

- [手势输入](gesture_input.md)：鼠标和触控手势
- [键盘输入](keyboard_input.md)：按键输入


## 虚拟摇杆 (Joystick)

Flame 提供了一个组件，可以为游戏创建虚拟摇杆。  
要使用此功能，需要创建一个 `JoystickComponent`，根据需求进行配置，然后将其添加到游戏中。

以下示例可以帮助您更好地理解：

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

  /// 每秒移动像素数
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
      position.add(joystick.relativeDelta  * maxSpeed * dt);
      angle = joystick.delta.screenAngle();
    }
  }
}
```

在这个示例中，我们创建了 `MyGame` 和 `Player` 类。  
`MyGame` 创建了一个摇杆，并在创建 `Player` 时将其传递给该类。  
在 `Player` 类中，根据摇杆的当前状态来执行操作。

摇杆的状态可以通过以下字段获取：

- `intensity`：表示摇杆被从中心拖动到边缘的百分比 `[0.0, 1.0]`（或 `knobRadius` 的范围）。  
- `delta`：摇杆从中心被拖动的绝对距离（`Vector2` 表示）。  
- `relativeDelta`：摇杆相对于基点被拖动的百分比（`Vector2` 表示方向和距离）。

如果需要为摇杆添加按钮，可以参考  
[`HudButtonComponent`](#hudbuttoncomponent)。

完整代码实现请参阅  
[Joystick 示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/joystick_example.dart)。  
或者查看 [摇杆演示](https://examples.flame-engine.org/#/Input_Joystick)，  
以了解摇杆输入在游戏中的实时应用。

如果需要挑战，可以尝试  
[高级摇杆示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/input/joystick_advanced_example.dart)。  
相关功能的实时演示请见  
[高级摇杆演示](https://examples.flame-engine.org/#/Input_Joystick_Advanced)。


## HudButtonComponent

`HudButtonComponent` 是一个按钮，可以根据与视图边缘的边距定义位置，而不是直接设置具体坐标。  
它需要两个 `PositionComponent`：`button` 和 `buttonDown`。  
`button` 表示按钮的默认状态，`buttonDown` 表示按钮按下时的状态。  
如果不需要改变按钮按下时的外观，可以省略 `buttonDown`。

默认情况下，该按钮属于 HUD（即使游戏摄像机移动，按钮也始终固定在屏幕上）。  
如果希望按钮不固定，可以将 `hudButtonComponent.respectCamera` 设置为 `true`。

要对按钮按下和释放的操作进行响应，可以通过 `onPressed` 和 `onReleased` 参数传递回调函数，  
或者扩展组件并重写 `onTapDown`、`onTapUp` 和/或 `onTapCancel` 来实现逻辑。


## SpriteButtonComponent

`SpriteButtonComponent` 是通过两个 `Sprite` 定义的按钮：  
一个表示按钮未按下时的状态，另一个表示按钮按下时的状态。


## ButtonComponent

`ButtonComponent` 是通过两个 `PositionComponent` 定义的按钮：  
一个表示按钮未按下时的状态，另一个表示按钮按下时的状态。  
如果只想用精灵（`Sprite`）定义按钮，可以使用 [`SpriteButtonComponent`](#spritebuttoncomponent)。  
但如果需要例如使用 `SpriteAnimationComponent` 或其他非纯精灵元素，可以使用此组件。


## 外部手柄 (Gamepad)

Flame 提供了支持外部游戏控制器（如手柄）的专用插件。  
详细信息请参阅 [Gamepads 仓库](https://github.com/flame-engine/gamepad)。


## AdvancedButtonComponent

`AdvancedButtonComponent` 针对不同的指针状态提供了单独的外观。  
每种外观由一个 `PositionComponent` 表示，以下字段可用于自定义外观：

- `defaultSkin`：按钮的默认外观。  
- `downSkin`：按钮被点击或触摸时的外观。  
- `hoverSkin`：按钮被悬停时的外观（适用于桌面和 Web）。  
- `defaultLabel`：显示在皮肤上的文本或组件，默认居中对齐。  
- `disabledSkin`：按钮被禁用时的外观。  
- `disabledLabel`：按钮被禁用时显示在皮肤上的文本或组件。


## ToggleButtonComponent

`ToggleButtonComponent` 是一个扩展自 `AdvancedButtonComponent` 的组件，  
可以在选中和未选中之间切换状态。

在现有外观的基础上，`ToggleButtonComponent` 还包含以下外观：

- `defaultSelectedSkin`：按钮选中时的默认外观。  
- `downAndSelectedSkin`：按钮被选中并按下时的外观。  
- `hoverAndSelectedSkin`：按钮选中并悬停时的外观（适用于桌面和 Web）。  
- `disabledAndSelectedSkin`：按钮选中且被禁用时的外观。  
- `defaultSelectedLabel`：按钮选中时显示在皮肤上的文本或组件。


## IgnoreEvents Mixin

如果希望某个组件子树不接收事件，可以使用 `IgnoreEvents` mixin。  
添加该 mixin 后，将 `ignoreEvents` 设置为 `true`（默认值）即可屏蔽事件。  
需要重新接收事件时，将其设置为 `false`。

这可以用于优化，因为当前所有事件都会遍历整个组件树。