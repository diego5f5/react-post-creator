import React, { useEffect, useRef } from "react";
import { Image, Text, Transformer } from "react-konva";
import handleTextInteraction from "./handleTextInteraction";

// Constants
import { defaultAnchors } from "./constants";

const ItemTransformer = ({
  itemProps,
  isSelected,
  onSelect,
  onChange,
  onTextChange,
  stageRef,
}) => {
  const itemRef = useRef();
  const transformerRef = useRef();

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([itemRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleTransformText = () => {
    const node = itemRef.current;
    const scaleX = node.scaleX();

    node.scaleX(1);
    onTextChange({
      ...itemProps,
      x: node.x(),
      y: node.y(),
      width: node.width() * scaleX,
      rotation: node.rotation(),
    });
  };

  const handleTransformEnd = () => {
    const node = itemRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    if (itemProps.itemType === "image") {
      onChange({
        ...itemProps,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(node.height() * scaleY),
        rotation: node.rotation(),
      });
      return;
    }

    onChange({ ...itemProps });
  };

  const handleDragEnd = (e) => {
    onChange({
      ...itemProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  return (
    <>
      {itemProps.itemType === "image" ? (
        <Image
          {...itemProps}
          onClick={onSelect}
          onTap={onSelect}
          ref={itemRef}
          draggable
          onDragEnd={handleDragEnd}
          onTransformEnd={handleTransformEnd}
        />
      ) : itemProps.itemType === "text" ? (
        <Text
          {...itemProps}
          onClick={onSelect}
          onTap={onSelect}
          onDblClick={() =>
            handleTextInteraction(itemRef, transformerRef, stageRef)
          }
          ref={itemRef}
          draggable
          onDragEnd={handleDragEnd}
          onTransformEnd={handleTransformEnd}
          onTransform={handleTransformText}
        />
      ) : null}
      {isSelected && (
        <Transformer
          ref={transformerRef}
          enabledAnchors={defaultAnchors[itemProps.itemType] || []}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ItemTransformer;
