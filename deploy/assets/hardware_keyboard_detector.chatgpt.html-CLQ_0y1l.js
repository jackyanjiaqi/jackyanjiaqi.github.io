import{_ as o,c as s,f as a,o as c}from"./app-B8TszOv9.js";const l={};function d(n,e){return c(),s("div",null,e[0]||(e[0]=[a(`<h1 id="hardwarekeyboarddetector-硬件键盘检测器" tabindex="-1"><a class="header-anchor" href="#hardwarekeyboarddetector-硬件键盘检测器"><span>HardwareKeyboardDetector（硬件键盘检测器）</span></a></h1><p><code>HardwareKeyboardDetector</code> 是一个组件，允许你直接监听来自硬件键盘的事件，而无需通过 Flutter 的 <code>Focus</code> 小部件。它不会监听任何屏幕键盘（软件键盘）的事件。</p><p>此组件可以放置在组件树的任何位置。例如，它可以附加在 <code>Game</code> 类的根级别，也可以附加到玩家控制的角色上。同一个游戏中可以同时存在多个 <code>HardwareKeyboardDetector</code> 组件，所有这些组件都会接收到键盘事件。</p><p>组件提供了 <code>onKeyEvent</code> 事件处理器，可以通过重写或在构造函数中传递来使用。当用户按下、释放或长按键盘上的任何按键时，都会触发该事件处理器。</p><p>键盘事件流将由 Flutter 进行规范化处理，即对于每个 <code>KeyDownEvent</code> 都会有相应的 <code>KeyUpEvent</code>，中间可能包含一些 <code>KeyRepeatEvent</code>。根据平台的不同，一些事件可能是“合成的”，即由框架人为生成，以确保事件顺序正确。有关更多详细信息，请参阅 Flutter 的 <a href="https://api.flutter.dev/flutter/services/HardwareKeyboard-class.html" target="_blank" rel="noopener noreferrer">HardwareKeyboard</a>。</p><p>当该组件被添加到或移除出组件树时，也会有类似的规范化保证。如果用户在 <code>HardwareKeyboardDetector</code> 挂载时按住了某些按键，那么会触发人工生成的 <code>KeyDownEvent</code>；如果用户在组件移除时仍在按住按键，则会生成 <code>KeyUpEvent</code>。</p><p>可以使用 <code>pauseKeyEvents</code> 属性暂时停止或恢复 <code>onKeyEvent</code> 的事件传递。当组件从组件树中移除时，事件传递也会停止。</p><hr><h2 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数"><span>构造函数</span></a></h2><div class="language-dart line-numbers-mode" data-highlighter="prismjs" data-ext="dart" data-title="dart"><pre><code><span class="line"><span class="token class-name">HardwareKeyboardDetector</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token keyword">void</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token class-name">KeyEvent</span><span class="token punctuation">)</span><span class="token operator">?</span> onKeyEvent<span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><hr><h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性"><span>属性</span></a></h2><h3 id="physicalkeyspressed-→-list-physicalkeyboardkey" tabindex="-1"><a class="header-anchor" href="#physicalkeyspressed-→-list-physicalkeyboardkey"><span><code>physicalKeysPressed</code> → <code>List&lt;PhysicalKeyboardKey&gt;</code></span></a></h3><p>当前被按下的键的物理键列表（或键盘类设备）。这些按键按被按下的顺序列出，但某些系统上的修饰键可能会乱序。</p><h3 id="logicalkeyspressed-→-set-logicalkeyboardkey" tabindex="-1"><a class="header-anchor" href="#logicalkeyspressed-→-set-logicalkeyboardkey"><span><code>logicalKeysPressed</code> → <code>Set&lt;LogicalKeyboardKey&gt;</code></span></a></h3><p>当前被按下的逻辑键集合。该集合对应于 <code>physicalKeysPressed</code> 列表，可用于以键盘布局无关的方式搜索按键。</p><h3 id="iscontrolpressed-→-bool" tabindex="-1"><a class="header-anchor" href="#iscontrolpressed-→-bool"><span><code>isControlPressed</code> → <code>bool</code></span></a></h3><p>如果当前按下了 <code>Ctrl</code> 键，则返回 <code>true</code>。</p><h3 id="isshiftpressed-→-bool" tabindex="-1"><a class="header-anchor" href="#isshiftpressed-→-bool"><span><code>isShiftPressed</code> → <code>bool</code></span></a></h3><p>如果当前按下了 <code>Shift</code> 键，则返回 <code>true</code>。</p><h3 id="isaltpressed-→-bool" tabindex="-1"><a class="header-anchor" href="#isaltpressed-→-bool"><span><code>isAltPressed</code> → <code>bool</code></span></a></h3><p>如果当前按下了 <code>Alt</code> 键，则返回 <code>true</code>。</p><h3 id="isnumlockon-→-bool" tabindex="-1"><a class="header-anchor" href="#isnumlockon-→-bool"><span><code>isNumLockOn</code> → <code>bool</code></span></a></h3><p>如果当前开启了 <code>Num Lock</code>，则返回 <code>true</code>。</p><h3 id="iscapslockon-→-bool" tabindex="-1"><a class="header-anchor" href="#iscapslockon-→-bool"><span><code>isCapsLockOn</code> → <code>bool</code></span></a></h3><p>如果当前开启了 <code>Caps Lock</code>，则返回 <code>true</code>。</p><h3 id="isscrolllockon-→-bool" tabindex="-1"><a class="header-anchor" href="#isscrolllockon-→-bool"><span><code>isScrollLockOn</code> → <code>bool</code></span></a></h3><p>如果当前开启了 <code>Scroll Lock</code>，则返回 <code>true</code>。</p><h3 id="pausekeyevents-←→-bool" tabindex="-1"><a class="header-anchor" href="#pausekeyevents-←→-bool"><span><code>pauseKeyEvents</code> ←→ <code>bool</code></span></a></h3><p>如果为 <code>true</code>，键盘事件的传递将被暂停。</p><p>当该属性设置为 <code>true</code> 时，系统会为所有正在按住的按键生成 <code>KeyUp</code> 事件，就像用户释放了这些按键一样。相反，当属性重新设置为 <code>false</code> 时，如果用户仍在按住某些按键，系统会生成 <code>KeyDown</code> 事件，就像用户刚开始按下这些按键一样。</p><hr><h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法"><span>方法</span></a></h2><h3 id="onkeyevent-keyevent-event" tabindex="-1"><a class="header-anchor" href="#onkeyevent-keyevent-event"><span><code>onKeyEvent(KeyEvent event)</code></span></a></h3><p>当键盘上的任何按键被按下、长按或释放时，可以重写此事件处理器以接收通知。事件类型可能是 <code>KeyDownEvent</code>、<code>KeyRepeatEvent</code> 或 <code>KeyUpEvent</code>。</p>`,35)]))}const r=o(l,[["render",d],["__file","hardware_keyboard_detector.chatgpt.html.vue"]]),i=JSON.parse('{"path":"/guide/flame/inputs/hardware_keyboard_detector.chatgpt.html","title":"HardwareKeyboardDetector（硬件键盘检测器）","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"构造函数","slug":"构造函数","link":"#构造函数","children":[]},{"level":2,"title":"属性","slug":"属性","link":"#属性","children":[{"level":3,"title":"physicalKeysPressed → List<PhysicalKeyboardKey>","slug":"physicalkeyspressed-→-list-physicalkeyboardkey","link":"#physicalkeyspressed-→-list-physicalkeyboardkey","children":[]},{"level":3,"title":"logicalKeysPressed → Set<LogicalKeyboardKey>","slug":"logicalkeyspressed-→-set-logicalkeyboardkey","link":"#logicalkeyspressed-→-set-logicalkeyboardkey","children":[]},{"level":3,"title":"isControlPressed → bool","slug":"iscontrolpressed-→-bool","link":"#iscontrolpressed-→-bool","children":[]},{"level":3,"title":"isShiftPressed → bool","slug":"isshiftpressed-→-bool","link":"#isshiftpressed-→-bool","children":[]},{"level":3,"title":"isAltPressed → bool","slug":"isaltpressed-→-bool","link":"#isaltpressed-→-bool","children":[]},{"level":3,"title":"isNumLockOn → bool","slug":"isnumlockon-→-bool","link":"#isnumlockon-→-bool","children":[]},{"level":3,"title":"isCapsLockOn → bool","slug":"iscapslockon-→-bool","link":"#iscapslockon-→-bool","children":[]},{"level":3,"title":"isScrollLockOn → bool","slug":"isscrolllockon-→-bool","link":"#isscrolllockon-→-bool","children":[]},{"level":3,"title":"pauseKeyEvents ←→ bool","slug":"pausekeyevents-←→-bool","link":"#pausekeyevents-←→-bool","children":[]}]},{"level":2,"title":"方法","slug":"方法","link":"#方法","children":[{"level":3,"title":"onKeyEvent(KeyEvent event)","slug":"onkeyevent-keyevent-event","link":"#onkeyevent-keyevent-event","children":[]}]}],"git":{"updatedTime":1735743451000,"contributors":[{"name":"JackYanjiaqi","username":"JackYanjiaqi","email":"jackyanjiaqi@gmail.com","commits":1,"url":"https://github.com/JackYanjiaqi"}]},"filePathRelative":"guide/flame/inputs/hardware_keyboard_detector.chatgpt.md"}');export{r as comp,i as data};