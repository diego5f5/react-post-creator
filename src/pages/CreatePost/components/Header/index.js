import React from "react";

function Header({ stageRef, setSelectedId }) {
  const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = () => {
    setSelectedId(undefined);

    setTimeout(() => {
      const uri = stageRef.current.toDataURL({ pixelRatio: 4 });
      downloadURI(uri, "post.png");
    }, 0);
  };

  return (
    <div
      style={{
        display: "flex",
        width: 785,
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <button onClick={handleExport}>Download</button>
    </div>
  );
}

export default Header;
