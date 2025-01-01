# AlignComponent

> class AlignComponent extends PositionComponent

AlignComponent is a layout component that positions its child within itself using relative placement. It is similar to Flutter’s Align widget.

The component requires a single child, which will be the target of this component’s alignment. Of course, other children can be added to this component too, but only the initial child will be aligned.

The alignment parameter describes where the child should be placed within the current component. For example, if the alignment is Anchor.center, then the child will be centered.

Normally, this component’s size will match the size of its parent. However, if you provide properties widthFactor or heightFactor, then the size of this component in that direction will be equal to the size of the child times the corresponding factor. For example, if you set heightFactor to 1 then the width of this component will be equal to the width of the parent, but the height will match the height of the child.

AlignComponent(
  child: TextComponent('hello'),
  alignment: Anchor.centerLeft,
);
By default, the child’s anchor is set equal to the alignment value. This achieves traditional alignment behavior: for example, the center of the child will be placed at the center of the current component, or bottom right corner of the child can be placed in the bottom right corner of the component. However, it is also possible to achieve more extravagant placement by giving the child a different anchor and setting keepChildAnchor to true. For example, if you set alignment to topCenter, and child’s anchor to bottomCenter, then the child will effectively be placed above the current component:

PlayerSprite().add(
  AlignComponent(
    child: HealthBar()..anchor = Anchor.bottomCenter,
    alignment: Anchor.topCenter,
    keepChildAnchor: true,
  ),
);

## Constructors

AlignComponent({PositionComponent? child, Anchor alignment = Anchor.topLeft, this.widthFactor, this.heightFactor, this.keepChildAnchor = false})
Creates a component that keeps its child positioned according to the alignment within this component’s bounding box.

More precisely, the child will be placed at alignment relative position within the current component’s bounding box. The child’s anchor will also be set to the alignment, unless keepChildAnchor parameter is true.

## Properties

child ←→ PositionComponent?
The component that will be positioned by this component. The child will be automatically mounted to the current component.

alignment ←→ Anchor
How the child will be positioned within the current component.

Note: unlike Flutter’s Alignment, the top-left corner of the component has relative coordinates (0, 0), while the bottom-right corner has coordinates (1, 1).

widthFactor : double?
If null, then the component’s width will be equal to the width of the parent. Otherwise, the width will be equal to the child’s width multiplied by this factor.

heightFactor : double?
If null, then the component’s height will be equal to the height of the parent. Otherwise, the height will be equal to the child’s height multiplied by this factor.

keepChildAnchor : bool
If false (default), then the child’s anchor will be kept equal to the alignment value. If true, then the child will be allowed to have its own anchor value independent from the parent.