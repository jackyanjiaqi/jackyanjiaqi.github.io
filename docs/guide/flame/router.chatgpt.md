这段文档介绍了如何在使用 Flame 游戏框架时实现页面路由和导航，具体包括 `RouterComponent` 的使用。以下是翻译：

```{flutter-app}
:sources: ../flame/examples
:page: router
:show: widget code infobox

这个示例应用展示了如何使用 `RouterComponent` 在游戏中实现多个屏幕之间的导航。此外，“暂停”按钮会停止时间，并应用视觉效果到其下方的页面内容。
```

# RouterComponent

**RouterComponent** 的作用是管理游戏中多个屏幕之间的导航。它的功能类似于 Flutter 的 [Navigator][Flutter Navigator] 类，区别在于它是与 Flame 组件而非 Flutter 小部件一起使用的。

一个典型的游戏通常包含多个页面：启动画面、开始菜单页面、设置页面、致谢页面、主游戏页面、多个弹窗等。路由器将组织所有这些目的地并允许你在它们之间进行切换。

内部，`RouterComponent` 包含一个路由栈。当你请求显示某个路由时，它将被放置在栈中的顶部。稍后你可以使用 `pop()` 方法从栈中移除最上面的页面。路由器中的页面通过它们独特的名称进行访问。

每个页面可以是透明的或不透明的。如果一个页面是不透明的，那么栈中它下方的页面不会被渲染并且不会接收指针事件（如点击或拖动）。相反，如果一个页面是透明的，那么它下方的页面将会被渲染并正常接收事件。这种透明页面对于实现模态对话框、物品栏或对话 UI 等非常有用。如果你希望你的路由在视觉上是透明的，但下方的路由不接收事件，请确保在你的路由中添加一个背景组件，使用 [事件捕捉混合类](inputs/inputs.md) 来捕捉事件。

使用示例：

```dart
class MyGame extends FlameGame {
  late final RouterComponent router;

  @override
  void onLoad() {
    add(
      router = RouterComponent(
        routes: {
          'home': Route(HomePage.new),
          'level-selector': Route(LevelSelectorPage.new),
          'settings': Route(SettingsPage.new, transparent: true),
          'pause': PauseRoute(),
          'confirm-dialog': OverlayRoute.existing(),
        },
        initialRoute: 'home',
      ),
    );
  }
}

class PauseRoute extends Route { ... }
```

```{note}
如果你导入的某些包中也有名为 `Route` 的类，请使用 `hide Route` 隐藏它

例如：`import 'package:flutter/material.dart' hide Route;`
```

[Flutter Navigator]: https://api.flutter.dev/flutter/widgets/Navigator-class.html

## Route

**Route** 组件保存有关特定页面内容的信息。`Route` 被作为子组件挂载到 `RouterComponent` 上。

`Route` 的主要属性是它的 `builder` —— 这个函数用来创建包含页面内容的组件。

此外，路由可以是透明的或不透明的（默认）。不透明的路由会阻止下方路由的渲染或接收指针事件，透明路由则不会。作为经验法则，如果路由是全屏的，应该声明为不透明的；如果只是覆盖屏幕的一部分，则应该是透明的。

默认情况下，路由在从栈中弹出后会保持页面组件的状态，`builder` 函数只会在路由第一次激活时被调用。将 `maintainState` 设置为 `false` 会在路由从栈中弹出后丢弃页面组件，每次激活路由时都调用 `builder` 函数。

当前路由可以使用 `pushReplacementNamed` 或 `pushReplacement` 进行替换。这两个方法的作用是，先对当前路由执行 `pop` 操作，然后执行 `pushNamed` 或 `pushRoute`。

## WorldRoute

**WorldRoute** 是一个特殊的路由，允许通过路由设置活动的游戏世界。这些路由可以用于游戏中实现不同关卡之间的切换，关卡通常实现为独立的世界。

默认情况下，`WorldRoute` 会用新的世界替换当前世界，且默认情况下它会保持世界的状态，即使世界被从栈中弹出。如果你希望每次激活路由时重新创建世界，可以将 `maintainState` 设置为 `false`。

如果你没有使用内置的 `CameraComponent`，可以在构造函数中显式传入你想要使用的相机。

```dart
final router = RouterComponent(
  routes: {
    'level1': WorldRoute(MyWorld1.new),
    'level2': WorldRoute(MyWorld2.new, maintainState: false),
  },
);

class MyWorld1 extends World {
  @override
  Future<void> onLoad() async {
    add(BackgroundComponent());
    add(PlayerComponent());
  }
}

class MyWorld2 extends World {
   @override
   Future<void> onLoad() async {
      add(BackgroundComponent());
      add(PlayerComponent());
      add(EnemyComponent());
   }
}
```

## OverlayRoute

**OverlayRoute** 是一个特殊的路由，允许通过路由添加游戏覆盖层。这些路由默认是透明的。

`OverlayRoute` 有两个构造函数。第一个构造函数需要一个 builder 函数来描述如何构建覆盖层的组件。第二个构造函数可以在 `GameWidget` 中已指定 builder 函数时使用：

```dart
final router = RouterComponent(
  routes: {
    'ok-dialog': OverlayRoute(
      (context, game) {
        return Center(
          child: DecoratedContainer(...),
        );
      },
    ),  // OverlayRoute
    'confirm-dialog': OverlayRoute.existing(),
  },
);
```

在 `GameWidget` 中定义的覆盖层，不需要在路由映射中声明；你可以通过 `RouterComponent.pushOverlay()` 来添加它们。一旦覆盖层路由被注册，它可以通过常规的 `.pushNamed()` 方法或 `.pushOverlay()` 方法激活——这两种方法的作用完全相同，尽管你可以使用后者来使代码更加明确，表示正在添加的是一个覆盖层而不是常规路由。

当前覆盖层可以使用 `pushReplacementOverlay` 进行替换。该方法根据覆盖层的状态，执行 `pushReplacementNamed` 或 `pushReplacement`。

## ValueRoute

```{flutter-app}
:sources: ../flame/examples
:page: value_route
:show: widget code infobox
:width: 280
```

**ValueRoute** 是一种路由，当它从栈中弹出时，会返回一个值。这类路由可以用于要求用户提供反馈的对话框。

使用 `ValueRoute` 需要两个步骤：

1. 创建一个继承自 `ValueRoute<T>` 的路由类，其中 `T` 是路由将返回的值的类型。在该类中重写 `build()` 方法来构建将显示的组件。组件应该使用 `completeWith(value)` 方法来弹出路由并返回指定的值。

   ```dart
   class YesNoDialog extends ValueRoute<bool> {
     YesNoDialog(this.text) : super(value: false);
     final String text;

     @override
     Component build() {
       return PositionComponent(
         children: [
           RectangleComponent(),
           TextComponent(text: text),
           Button(
             text: 'Yes',
             action: () => completeWith(true),
           ),
           Button(
             text: 'No',
             action: () => completeWith(false),
           ),
         ],
       );
     }
   }
   ```

2. 使用 `Router.pushAndWait()` 来显示该路由，该方法返回一个 future，最终会解析为从路由返回的值。

   ```dart
   Future<void> foo() async {
     final result = await game.router.pushAndWait(YesNoDialog('Are you sure?'));
     if (result) {
       // ... 用户确认
     } else {
       // ... 用户未确认
     }
   }
   ```