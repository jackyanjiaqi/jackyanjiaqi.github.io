# 入门指南

## 关于 Flame

Flame 是一个模块化的 Flutter 游戏引擎，为游戏开发提供了一套完整的解决方案。它充分利用了 Flutter 提供的强大基础设施，同时简化了你在构建项目时需要编写的代码。

Flame 为你提供了一个简单而高效的游戏循环实现，以及开发游戏可能需要的各种功能。例如：输入处理、图像、精灵（sprites）、精灵表（sprite sheets）、动画、碰撞检测，以及我们称之为 Flame 组件系统（FCS）的组件系统。

我们还提供了一些独立的扩展包，进一步增强了 Flame 的功能，这些扩展包可以在 [桥接包](bridge_packages/bridge_packages.md) 部分找到。

你可以自由选择需要使用的模块，因为它们都是独立和模块化的。

该引擎及其生态系统由社区不断改进，因此欢迎你与我们联系，提交问题或 PR，以及提出建议。

如果你想帮助引擎提升知名度并壮大社区，请为我们点个星标吧！ :)


## 安装

在你的 `pubspec.yaml` 文件中将 `flame` 包添加为依赖项，运行以下命令：

```console
flutter pub add flame
```

最新版本可以在 [pub.dev](https://pub.dev/packages/flame/install) 上找到。

然后运行 `flutter pub get`，就可以开始使用了！


## 开始使用

你可以在 [教程文件夹](https://github.com/flame-engine/flame/tree/main/doc/tutorials) 中找到一系列入门教程。

所有功能的简单示例可以在 [示例文件夹](https://github.com/flame-engine/flame/tree/main/examples) 中找到。

另外，你还可以查看 [awesome flame 仓库](https://github.com/flame-engine/awesome-flame#user-content-articles--tutorials)，其中包含了许多由社区编写的优秀教程和文章，帮助你快速上手 Flame。


## 引擎范围之外的功能

根据游戏的特点，可能需要一些复杂的功能，这些功能可能超出了 Flame 引擎生态系统的范围。在本节中，你可以找到相关的功能说明，以及推荐的包或服务：

### 多人游戏（网络代码）

Flame 没有内置任何网络功能，而这可能是开发在线多人游戏所需要的。

如果你正在开发多人游戏，这里有一些推荐的包或服务：

- [Nakama](https://github.com/obrunsmann/flutter_nakama/): 一个专为现代游戏和应用设计的开源服务器。
- [Firebase](https://firebase.google.com/): 提供了多种服务，可用于开发简单的多人游戏体验。
- [Supabase](https://supabase.com/): 基于 Postgres 的 Firebase 更经济的替代方案。