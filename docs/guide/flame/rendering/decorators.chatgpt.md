# 装饰器（Decorators）

**装饰器** 是一些类，它们可以封装特定的视觉效果，并将这些效果应用于一系列的画布绘制操作。装饰器不是 [Component]，但它们可以手动或通过 [HasDecorator] mixin 应用于组件。同样，装饰器也不是 [Effect]，但它们可以用来实现某些 `Effect`。

Flame 提供了一些内置的装饰器，如果需要也可以很容易地添加自定义装饰器。我们计划在 Flutter 完全支持 Web 上的着色器后添加基于着色器的装饰器。

---

## Flame 内置装饰器

### **PaintDecorator.blur**

此装饰器为底层组件应用高斯模糊效果。模糊程度可以在 X 和 Y 方向上有所不同，但通常情况下不会这样使用。

```dart
final decorator = PaintDecorator.blur(3.0);
```

**可能的用途：**

- 软阴影；
- 远处或近摄像机的“失焦”物体；
- 动态模糊效果；
- 在弹出对话框时弱化/模糊内容；
- 显示角色醉酒时的模糊视觉效果。

---

### **PaintDecorator.grayscale**

此装饰器将底层图像转换为灰度，就像黑白照片一样。此外，可以根据需要设置图像的半透明度（`opacity`）。

```dart
final decorator = PaintDecorator.grayscale(opacity: 0.5);
```

**可能的用途：**

- 应用于 NPC，将其变成石头或幽灵；
- 应用于场景以表示过去的记忆；
- 黑白照片效果。

---

### **PaintDecorator.tint**

此装饰器使用指定颜色为底层图像添加色彩，就像通过有色玻璃观看一样。建议使用半透明的 `color` 以便可以看到下面图像的细节。

```dart
final decorator = PaintDecorator.tint(const Color(0xAAFF0000));
```

**可能的用途：**

- 显示受到某种魔法影响的 NPC；
- 在阴影中的物品/角色可以被染成黑色；
- 将场景染成红色以表现嗜血或角色低健康值；
- 染成绿色以表现中毒或生病；
- 在夜晚将场景染成深蓝色。

---

### **Rotate3DDecorator**

此装饰器为底层组件应用 3D 旋转效果。可以指定旋转角度、旋转中心点和透视变形量。

此装饰器还提供 `isFlipped` 属性，用于确定组件当前是否正面朝向用户。这对于绘制在正反面有不同外观的组件非常有用。

```dart
final decorator = Rotate3DDecorator(
  center: component.center,
  angleX: rotationAngle,
  perspective: 0.002,
);
```

**可能的用途：**

- 可翻转的卡片；
- 书中的页面；
- 应用路由之间的过渡效果；
- 3D 下落的粒子效果，如雪花或树叶。

---

### **Shadow3DDecorator**

此装饰器在组件下方渲染阴影，就像组件是站在平面上的 3D 对象一样。此效果对于使用等距相机投影的游戏效果最佳。

可以灵活控制阴影的角度、长度、不透明度、模糊度等。有关属性的详细说明，请参阅类文档。

```dart
final decorator = Shadow3DDecorator(
  base: Vector2(100, 150),
  angle: -1.4,
  xShift: 200,
  yScale: 1.5,
  opacity: 0.5,
  blur: 1.5,
);
```

**主要用途：**

为组件添加地面阴影。主要局限在于阴影是平面的，不能与环境交互。例如，此装饰器无法处理投影到墙壁或其他垂直结构的阴影。

---

## 使用装饰器

### **HasDecorator mixin**

此 `Component` 的 mixin 添加了 `decorator` 属性，默认值为 `null`。如果将此属性设置为一个实际的 `Decorator` 对象，那么装饰器将在组件渲染期间应用其视觉效果。要移除此效果，只需将 `decorator` 属性重新设置为 `null`。

---

### **PositionComponent**

`PositionComponent`（及其派生类）已经拥有 `decorator` 属性，因此这些组件不需要 `HasDecorator` mixin。

实际上，`PositionComponent` 使用其装饰器来正确定位组件。因此，您想要为 `PositionComponent` 应用的新装饰器需要被链接（参见下文的 [多个装饰器](#multiple-decorators) 部分）。

也可以替换 `PositionComponent` 的根装饰器，以创建组件在屏幕上定位的替代逻辑。

---

### **多个装饰器**

可以同时将多个装饰器应用于同一组件：`Decorator` 类支持链接。如果组件上已有装饰器且想要添加另一个装饰器，可以调用 `component.decorator.addLast(newDecorator)`，这会将新装饰器添加到现有链的末尾。稍后可以通过调用 `removeLast()` 删除该装饰器。

装饰器可以通过这种方式链接。例如，如果 `A` 是初始装饰器，那么 `A.addLast(B)` 后可以继续 `A.addLast(C)` 或 `B.addLast(C)` -- 两种情况下都会创建 `A -> B -> C` 的链条。这意味着整个链条可以通过其根进行操作，通常是 `component.decorator`。