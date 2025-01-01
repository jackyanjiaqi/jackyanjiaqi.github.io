import debugAlias from './other/debug';
import performance from './other/performance';
import util from './other/util';
import widgets from './other/widgets';

export default {
    text: "| ▼ 其他(调试..)",
    collapsible: true,
    link: "/guide/flame/other/debug.chatgpt.md",
    children: [
        debugAlias,
        util,
        widgets,
        performance
   ]
}