// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const handleTextInteraction = (
  textRef,
  trRef,
  stageRef,
  itemProps,
  onChange,
  setIsTyping,
  stageScale
) => {
  const stage = stageRef.current;
  const textNode = textRef.current;
  const transformNode = trRef.current;

  textNode.hide();
  transformNode.hide();

  const textPosition = textNode.absolutePosition();
  const areaPosition = {
    x: stage.container().offsetLeft + textPosition.x,
    y: stage.container().offsetTop + textPosition.y,
  };
  const rotation = textNode.rotation();
  let transform = '';
  if (rotation) {
    transform += 'rotateZ(' + rotation + 'deg)';
  }

  const textarea = document.createElement('textarea');
  document.body.appendChild(textarea);

  textarea.value = textNode.text();
  textarea.style.position = 'absolute';
  textarea.style.top = `${areaPosition.y}px`;
  textarea.style.left = `${areaPosition.x}px`;
  textarea.style.width = `${
    (textNode.width() - textNode.padding() * 2) * stageScale
  }px`;
  textarea.style.height = `${
    (textNode.height() - textNode.padding() * 2 + 5) * stageScale
  }px`;
  textarea.style.fontSize = `${textNode.fontSize() * stageScale}px`;
  textarea.style.border = 'none';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNode.lineHeight();
  textarea.style.fontFamily = textNode.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNode.align();
  textarea.style.color = textNode.fill();
  textarea.style.transform = transform;
  textarea.style.height = 'auto';
  textarea.style.height = `${textarea.scrollHeight + 3}px`;

  setIsTyping(true);
  textarea.focus();

  textarea.addEventListener('keydown', () => {
    const scale = textNode.getAbsoluteScale().x;
    textarea.style.width = `${textNode.width() * scale}px`;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
  });

  const removeTextarea = () => {
    setIsTyping(false);
    textarea.parentNode.removeChild(textarea);
    window.removeEventListener('click', handleOutsideClick);
    textNode.show();
    transformNode.show();
  };

  const handleOutsideClick = (e) => {
    if (e.target !== textarea) {
      onChange({ ...itemProps, text: textarea.value });
      removeTextarea();

      if (!textarea.value) {
        textNode.destroy();
        transformNode.destroy();
      }
    }
  };

  setTimeout(() => {
    window.addEventListener('click', handleOutsideClick);
  });
};

export default handleTextInteraction;
