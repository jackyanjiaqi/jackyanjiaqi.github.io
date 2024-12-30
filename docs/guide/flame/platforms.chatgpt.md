# 支持的平台

由于 Flame 运行在 Flutter 之上，因此其支持的平台取决于 Flutter 支持的平台。

目前，Flame 支持 Web、移动端（Android 和 iOS）和桌面端（Windows、MacOS 和 Linux）。

## Flutter 渠道

Flame 保持对稳定通道的支持。开发（dev）、测试（beta）和主分支（master）通道应该也能正常工作，但我们不对这些通道提供支持。这意味着，发生在稳定通道之外的问题不会被优先处理。

## Flame Web

要在 Web 上使用 Flame，你需要确保你的游戏使用了 CanvasKit/[Skia](https://skia.org/) 渲染器。这将提高 Web 上的性能，因为它会使用 `canvas` 元素，而不是单独的 DOM 元素。

要使用 Skia 运行你的游戏，请使用以下命令：

```shell
flutter run -d chrome --web-renderer canvaskit
```

要构建生产版本的游戏，使用 Skia 渲染器，请使用以下命令：

```shell
flutter build web --release --web-renderer canvaskit
```

## 将游戏部署到 GitHub Pages

将游戏在线部署的一个简单方法是使用 [GitHub Pages](https://pages.github.com/)。这是 GitHub 提供的一个很棒的功能，可以让你轻松地从仓库中托管 Web 内容。

下面我们将解释如何使用 GitHub Pages 部署你的游戏。

首先，创建一个用于存放已部署文件的分支：

```shell
git checkout -b gh-pages
```

这个分支可以从 `main` 或其他任何分支创建，都无所谓。推送该分支后，返回到 `main` 分支。

接下来，你需要将 [flutter-gh-pages](https://github.com/bluefireteam/flutter-gh-pages) Action 添加到你的仓库中，可以通过在 `.github/workflows` 文件夹中创建一个 `gh-pages.yaml` 文件来完成。

```yaml
name: Gh-Pages

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - uses: bluefireteam/flutter-gh-pages@v8
        with:
          baseHref: /NAME_OF_YOUR_REPOSITORY/
          webRenderer: canvaskit
```

确保将 `NAME_OF_YOUR_REPOSITORY` 替换为你 GitHub 仓库的名称。

现在，每当你推送内容到 `main` 分支时，这个 Action 会自动运行并更新你已部署的游戏。

你的游戏应该可以通过如下的 URL 访问：
`https://YOUR_GITHUB_USERNAME.github.io/NAME_OF_YOUR_REPOSITORY/`

## 将游戏部署到 itch.io

1. 创建一个 Web 构建，可以通过 IDE 或运行 `flutter build web` 来创建
（如果提示缺少 `index.html`，可以运行 `flutter create . --platforms=web`）
2. 打开 `index.html` 文件，删除 `<base href="/">` 这一行
3. 将 `build/web` 文件夹压缩并上传到 itch.io

**记住，这里应该是你项目的 `build/web` 目录，而不是项目根目录中的 `web` 目录！**

如果你是提交游戏到一个游戏开发大赛（game jam），记得将其设置为公开，并在大赛页面提交（许多人会搞错这一步）。

更多的说明可以在 [itch.io](https://itch.io/docs/creators/html5#getting-started/zip-file) 找到。

### Web 支持

在 Web 上使用 Flame 时，某些方法可能无法正常工作。例如，`Flame.device.setOrientation` 和 `Flame.device.fullScreen` 在 Web 上无法使用，它们可以被调用，但没有任何效果。

另一个例子是：使用 `flame_audio` 包进行音频预缓存也无法在 Web 上正常工作，因为 Audioplayers 在 Web 上不支持该功能。可以通过使用 `http` 包来解决这个问题，向音频文件发起一个 GET 请求，这样浏览器就会缓存该文件，达到和移动端相同的效果。

如果你想在 Web 上创建 `ui.Image` 实例，可以使用我们的 `Flame.images.decodeImageFromPixels` 方法。它包装了 `ui` 库中的 `decodeImageFromPixels` 方法，并且支持 Web 平台。如果 `runAsWeb` 参数设置为 `true`（默认值是 `kIsWeb`），它将使用内部的图像解码方法解码图像。如果 `runAsWeb` 为 `false`，则会使用 `decodeImageFromPixels`，但目前该方法在 Web 上不支持。