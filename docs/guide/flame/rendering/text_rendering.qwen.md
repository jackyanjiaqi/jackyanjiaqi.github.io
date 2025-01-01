# 文本渲染

Flame 提供了一些专用类来帮助你渲染文本。

## 文本组件

使用 Flame 渲染文本的最简单方法是利用提供的文本渲染组件：

- `TextComponent` 用于渲染单行文本。
- `TextBoxComponent` 用于在一个带尺寸边框内包含多行文本，包括打字效果的可能性。你可以使用 `newLineNotifier` 在添加新行时获得通知，并使用 `onComplete` 回调在文本完全打印时执行函数。
- `ScrollTextBoxComponent` 增强了 `TextBoxComponent` 的功能，在文本超出包围框边界时添加垂直滚动能力。

所有组件都在[这个示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/text_example.dart)中展示。

### TextComponent

`TextComponent` 是一个简单的组件，用于渲染单行文本。

简单用法：

```dart
class MyGame extends FlameGame {
  @override
  void onLoad() {
    add(
      TextComponent(
        text: 'Hello, Flame',
        position: Vector2.all(16.0),
      ),
    );
  }
}
```

为了配置字体系列、大小、颜色等渲染方面的内容，你需要提供（或修改）一个包含这些信息的 `TextRenderer`；虽然你可以在下面阅读更多关于此接口的详细信息，但你可以使用的最简单实现是 `TextPaint`，它接受 Flutter 的 `TextStyle`：

```dart
final regular = TextPaint(
  style: TextStyle(
    fontSize: 48.0,
    color: BasicPalette.white.color,
  ),
);

class MyGame extends FlameGame {
  @override
  void onLoad() {
    add(
      TextComponent(
        text: 'Hello, Flame',
        textRenderer: regular,
        anchor: Anchor.topCenter,
        position: Vector2(size.width / 2, 32.0),
      ),
    );
  }
}
```

你可以在 [TextComponent 的 API](https://pub.dev/documentation/flame/latest/components/TextComponent-class.html) 下找到所有选项。

### TextBoxComponent

`TextBoxComponent` 和 `TextComponent` 非常相似，但正如其名称所示，它用于在边界框内渲染文本，并根据提供的框大小创建换行符。

你可以通过 `TextBoxConfig` 中的 `growingBox` 变量决定框是否随着文本输入而增长或保持静态。一个静态框要么具有固定大小（设置 `TextBoxComponent` 的 `size` 属性），要么自动缩小以适应文本内容。

此外，`align` 属性允许你控制文本内容的水平和垂直对齐方式。例如，将 `align` 设置为 `Anchor.center` 将使文本在边界框内垂直和水平居中。

如果你想更改框的边距，请使用 `TextBoxConfig` 中的 `margins` 变量。

最后，如果你想模拟“打字”效果，通过逐个显示字符串中的每个字符来模拟实时输入的效果，可以提供 `boxConfig.timePerChar` 参数。

示例用法：

```dart
class MyTextBox extends TextBoxComponent {
  MyTextBox(String text) : super(
    text: text,
    textRenderer: tiny,
    boxConfig: TextBoxConfig(timePerChar: 0.05),
  );

  final bgPaint = Paint()..color = Color(0xFFFF00FF);
  final borderPaint = Paint()..color = Color(0xFF000000)..style = PaintingStyle.stroke;

  @override
  void render(Canvas canvas) {
    Rect rect = Rect.fromLTWH(0, 0, width, height);
    canvas.drawRect(rect, bgPaint);
    canvas.drawRect(rect.deflate(boxConfig.margin), borderPaint);
    super.render(canvas);
  }
}
```

你可以在 [TextBoxComponent 的 API](https://pub.dev/documentation/flame/latest/components/TextBoxComponent-class.html) 下找到所有选项。

### ScrollTextBoxComponent

`ScrollTextBoxComponent` 是 `TextBoxComponent` 的高级版本，设计用于在定义区域内显示可滚动文本。此组件特别适用于需要在一个受限空间中展示大量文本的界面，例如对话框或信息面板。

请注意，`TextBoxComponent` 的 `align` 属性不可用。

示例用法：

```dart
class MyScrollableText extends ScrollTextBoxComponent {
  MyScrollableText(Vector2 frameSize, String text) : super(
    size: frameSize,
    text: text,
    textRenderer: regular, 
    boxConfig: TextBoxConfig(timePerChar: 0.05),
  );
}
```

### TextElementComponent

如果你想渲染任意的 `TextElement`，从单个 `InlineTextElement` 到格式化的 `DocumentRoot`，可以使用 `TextElementComponent`。

一个简单的示例是创建一个 `DocumentRoot` 来渲染一系列块元素（想象成 HTML 的“div”），其中包含丰富的文本：

```dart
final document = DocumentRoot([
  HeaderNode.simple('1984', level: 1),
  ParagraphNode.simple(
    'Anything could be true. The so-called laws of nature were nonsense.',
  ),
  // ...
]);
final element = TextElementComponent.fromDocument(
  document: document,
  position: Vector2(100, 50),
  size: Vector2(400, 200),
);
```

注意，大小可以通过两种方式指定；通过：

- 所有 `PositionComponents` 的通用 `size` 属性；或
- 包含在应用的 `DocumentStyle` 中的 `width/height`。

一个应用样式到文档的示例（这可以包括大小以及其他参数）：

```dart
final style = DocumentStyle(
  width: 400,
  height: 200,
  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 14),
  background: BackgroundStyle(
    color: const Color(0xFF4E322E),
    borderColor: const Color(0xFF000000),
    borderWidth: 2.0,
  ),
);
final document = DocumentRoot([ ... ]);
final element = TextElementComponent.fromDocument(
  document: document,
  style: style,
  position: Vector2(100, 50),
);
```

查看一个更详细的 [富文本、格式化文本块渲染示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/rich_text_example.dart)。

关于文本渲染管道的基础机制的更多细节，请参见下面的“文本元素、文本节点和文本样式”。

### Flame Markdown

为了更轻松地创建基于富文本的 `DocumentRoot`，从简单的带有粗体/斜体的字符串到完整的结构化文档，Flame 提供了 `flame_markdown` 桥接包，它将 `markdown` 库与 Flame 的文本渲染基础设施连接起来。

只需使用 `FlameMarkdown` 辅助类和 `toDocument` 方法将 markdown 字符串转换为 `DocumentRoot`（然后可以用来创建 `TextElementComponent`）：

```dart
import 'package:flame/text.dart';
import 'package:flame_markdown/flame_markdown.dart';

// ...
final component = await TextElementComponent.fromDocument(
  document: FlameMarkdown.toDocument(
    '# Header\n'
    '\n'
    'This is a **bold** text, and this is *italic*.\n'
    '\n'
    'This is a second paragraph.\n',
  ),
  style: ...,
  position: ...,
  size: ...,
);
```


## 基础设施

如果你不使用 Flame 组件系统，希望理解文本渲染的基础架构，希望自定义使用的字体和样式，或创建自己的自定义渲染器，本节适用于你。

- `TextRenderer`：渲染器知道“如何”来渲染文本；本质上它们包含任何字符串的样式信息。
- `TextElement`：元素是格式化、布局过的文本块，包括字符串（“什么”）和样式（“如何”）。

以下图表展示了文本渲染管道的类和继承结构：

![](/images/text_rendering_big1.png)

### TextRenderer

`TextRenderer` 是 Flame 用来渲染文本的抽象类。`TextRenderer` 的实现必须包含关于“如何”渲染文本的信息。字体样式、大小、颜色等。它应该能够通过 `format` 方法将这些信息与给定的文本字符串结合起来，以生成一个 `TextElement`。

Flame 提供了两个具体实现：

- `TextPaint`：最常用，使用 Flutter 的 `TextPainter` 来渲染常规文本。
- `SpriteFontRenderer`：使用 `SpriteFont`（基于精灵图的字体）来渲染位图文本。
- `DebugTextRenderer`：仅用于金丝雀测试。

但你也可以提供自己的实现以扩展到其他自定义形式的文本渲染。

`TextRenderer` 的主要工作是将文本字符串格式化为一个 `TextElement`，然后可以将其渲染到屏幕上：

```dart
final textElement = textRenderer.format("Flame is awesome")
textElement.render(...) 
```

然而，渲染器提供了直接创建元素并渲染它的辅助方法：

```dart
textRenderer.render(
  canvas,
  'Flame is awesome',
  Vector2(10, 10),
  anchor: Anchor.topCenter,
);
```

#### TextPaint

`TextPaint` 是 Flame 中内置的文本渲染实现。它基于 Flutter 的 `TextPainter` 类（因此得名），可以通过样式类 `TextStyle` 进行配置，后者包含所有用于渲染文本的排版信息；即字体大小和颜色、字体系列等。

除了样式之外，你还可以选择性地提供一个额外参数 `textDirection`（但通常已经设置为 `ltr` 或从左到右）。

示例用法：

```dart
const TextPaint textPaint = TextPaint(
  style: TextStyle(
    fontSize: 48.0,
    fontFamily: 'Awesome Font',
  ),
);
```

注意：有几个包包含名为 `TextStyle` 的类。我们通过 `text` 模块导出了正确的版本（来自 Flutter）：

```dart
import 'package:flame/text.dart';
```

但如果你想显式导入它，请确保从 `package:flutter/painting.dart` 导入（或 material 或 widgets）。如果你还需要导入 `dart:ui`，你可能需要隐藏它的 `TextStyle` 版本，因为该模块包含一个同名的不同类：

```dart
import 'package:flutter/painting.dart';
import 'dart:ui' hide TextStyle;
```

以下是 `TextStyle` 的一些常见属性（查看 [完整的 `TextStyle` 属性列表](https://api.flutter.dev/flutter/painting/TextStyle-class.html)）：

- `fontFamily`: 常用字体，如 Arial（默认），或你添加在 pubspec 中的自定义字体（参见 [如何添加自定义字体](https://docs.flutter.dev/cookbook/design/fonts))。
- `fontSize`: 字体大小，以 pts 为单位（默认 `24.0`）。
- `height`: 文本行高，是字体大小的倍数（默认 `null`）。
- `color`: 颜色，作为 `ui.Color`（默认白色）。

有关颜色以及如何创建它们的更多信息，请参见 [颜色和调色板](palette.md) 指南。

#### SpriteFontRenderer

提供的另一种渲染器选项是 `SpriteFontRenderer`，它允许你提供基于精灵图的 `SpriteFont`。待补充...

#### DebugTextRenderer

此渲染器专用于金丝雀测试。在不同平台上的字体定义差异和抗锯齿算法的不同使得在金丝雀测试中渲染普通字体文本不可靠。此渲染器将文本呈现为每个单词都是实心矩形，从而使你可以测试元素的布局、定位和尺寸，而无需依赖字体渲染。

## 内联文本元素

`TextElement` 是一个“预编译”、格式化并已布局的带有特定样式的文本块，准备好在给定位置进行渲染。

`InlineTextElement` 实现 `TextElement` 接口，并且必须实现它们的两个方法，一个是教它如何移动，另一个是如何绘制到画布上：

```dart
void translate(double dx, double dy);
void draw(Canvas canvas);
```

这些方法旨在由 `InlineTextElement` 的实现进行重写，并且用户通常不会直接调用；因为提供了一个方便的 `render` 方法：

```dart
void render(
  Canvas canvas,
  Vector2 position, {
  Anchor anchor = Anchor.topLeft,
})
```

这允许元素在特定位置使用给定锚点进行渲染。

接口还强制要求（并提供了）与该 `InlineTextElement` 关联的 `LineMetrics` 对象的 getter，使你（以及 `render` 实现）能够访问与元素相关的尺寸信息（宽度、高度、上升等）：

```dart
LineMetrics get metrics;
```

## 文本元素、文本节点和文本样式

虽然常规渲染器总是直接使用 `InlineTextElement`，但有一个更大的底层基础设施可以用来渲染更丰富或格式化的文本。

文本元素是内联文本元素的超集，表示富文本文档中的一个任意渲染块。本质上，它们是具体且“物理”的：它们是在画布上准备好进行渲染的对象。

这一特性使它们与文本节点区分开来，后者是有结构的文本片段，并且与文本样式（代码中称为 `FlameTextStyle` 以便更好地与 Flutter 的 `TextStyle` 工作）一起使用，后者是描述任意文本段落应如何渲染的描述符。

因此，在最一般的情况下，用户会使用一个 `TextNode` 来描述所需的富文本部分；定义一个要应用的 `FlameTextStyle`；并使用这些来生成一个 `TextElement`。根据渲染类型，生成的 `TextElement` 将是一个 `InlineTextElement`，这使我们回到了正常的渲染流程。内联-文本类型的元素的独特属性是它暴露了一个可以用于高级渲染的 `LineMetrics`；而其他元素仅暴露一个简单的 `draw` 方法，该方法不知道尺寸和定位。

然而，如果目标是创建整个文档（多个块或段落），并用格式化文本增强，则必须使用其他类型的文本元素、文本节点和文本样式。为了渲染任意的 `TextElement`，你也可以选择使用 `TextElementComponent`（参见上面）。

查看[此类使用的示例](https://github.com/flame-engine/flame/blob/main/examples/lib/stories/rendering/rich_text_example.dart)。

### 文本节点和文档根

一个 `DocumentRoot` 本身并不是一个 `TextNode`（从继承关系上看），但它代表一个 `BlockNodes` 的分组，这些块布局了一个“页面”或“文档”的富文本，并分为多个块或段落。它代表整个文档并可以接收全局样式。

定义富文本文档的第一步是创建一个节点，这很可能是 `DocumentRoot`。

它首先包含顶级的 Block Nodes 列表，这些节点可以定义标题、段落或列。

然后每个块都可以包含其他块或内联文本节点，无论是纯文本节点还是具有特定格式的某些富文本。

请注意，由节点结构定义的层次结构也用于样式化目的，正如 `FlameTextStyle` 类中所定义的那样。

实际的节点都继承自 `TextNode`，并按以下图表分解：

![](/images/text_rendering_big2.png)


### (Flame) 文本样式

文本样式可以应用于节点以生成元素。它们全部继承自抽象类 `FlameTextStyle`（命名为此以避免与 Flutter 的 `TextStyle` 混淆）。

它们遵循树状结构，始终具有根部的 `DocumentStyle`；这种结构用于将级联样式应用到类似节点结构。实际上，它们非常类似于 CSS 定义。

完整的继承链可以在以下图表中看到：

![](/images/text_rendering_big3.png)

### 文本元素

最后，我们有元素，它代表了一个节点（“什么”）与一个样式（“如何”的组合），因此表示一个预编译、已布局的富文本块以渲染到画布上。

内联文本元素也可以被看作是 `TextRenderer`（简化后的“如何”）和字符串（单行“什么”）的组合。

这是因为可以通过 `asTextRenderer` 方法将 `InlineTextStyle` 转换为特定的 `TextRenderer`，然后用于将每一行文本布局到唯一的 `InlineTextElement` 中。

当直接使用渲染器时，整个布局过程被跳过，并返回一个 `TextPainterTextElement` 或 `SpriteFontTextElement`。

正如你所看到的，两种定义元素的方式本质上是等效的。但仍然留下了两条路径用于文本渲染。选择哪一条？如何解决这个困境？

在有疑问的情况下，以下指导方针可以帮助你选择最适合你的路径：

- 对于最简单的文本渲染方式，请使用 `TextPaint`（基本的渲染器实现）。
  - 你可以使用 FCS 提供的组件 `TextComponent` 来完成此任务。
- 渲染 Sprite 字体，必须使用 `SpriteFontRenderer`（接受 `SpriteFont` 的渲染器实现）。
- 对于多行文本的渲染，带有自动换行，有两个选项：
  - 使用 FCS `TextBoxComponent`，它使用任何文本渲染器来绘制每一行文本作为元素，并进行自己的布局和换行；
  - 使用 Text Node & Style 系统创建你的预布局元素。注意：目前没有相应的 FCS 组件。
- 最后，为了获得格式化（或富）文本，必须使用文本节点和样式。