import camera_component from './camera_component';
import collision_detection from './collision_detection';
import components from './components';
import effects from './effects';
import game_loop from './game_loop';
import game_widget from './game_widget';
import overlays from './overlays';
import platforms from './platforms';
import router from './router';
import structure from './structure';

export default {
    text: "Flame（文件结构GPT版）",
    link: "/guide/flame/structure.chatgpt.md",
    collapsible: true,
    children: [
        structure,
        game_widget,
        game_loop,
        components,
        camera_component,
        router,
        platforms,
        collision_detection,
        effects,
        overlays
    ]
}