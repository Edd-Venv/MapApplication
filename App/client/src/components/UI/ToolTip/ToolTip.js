import classes from "./ToolTip.module.css";

const handleToolTip = (tooltipId, inputId, formId, errorMassage) => {
  if (!document.getElementById(tooltipId)) {
    const toolTip = document.createElement("p");
    toolTip.id = tooltipId;

    if (document.getElementById(inputId)) {
      document.getElementById(formId).appendChild(toolTip);
      const hostElement = document.getElementById(formId);
      const hostElPosLeft = hostElement.offsetLeft;
      const hostElPosTop = hostElement.offsetTop;
      const hostElHeight = hostElement.clientHeight;

      const x = hostElPosLeft + 33;
      const y = hostElPosTop - 43;
      toolTip.className = classes.ToolTip;
      toolTip.style.left = x + "px";
      toolTip.style.top = y + "px";
      toolTip.innerHTML = errorMassage;
    }
  }
};
export default handleToolTip;
