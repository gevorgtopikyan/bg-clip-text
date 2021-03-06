import { useCallback, useEffect, useState } from 'react';
import './App.css';

const fReader = new FileReader();

function App() {
  const [css, setCss] = useState<Record<string, any> | null>(null);

  const onCssChange = useCallback((css) => setCss(css), []);

  return (
    <div className="App">
      <BgCreator onCssChange={onCssChange} />
      {css ? <Preview css={css}></Preview> : 'Select file to preview'}
    </div>
  );
}

interface CreatorProps {
  onCssChange?: (css: Record<string, any>) => void;
}

function BgCreator({ onCssChange }: CreatorProps) {
  const [selectedFile, setSelectedFile] = useState<File>();

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const [bgUrl, setBgUrl] = useState('');

  const [overlayValue, setOverlayValue] = useState('');

  const [opacity, setOpacity] = useState(100);

  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  useEffect(() => {
    if (selectedFile) {
      const onLoad = function () {
        setSelectedFileUrl(fReader.result as string);
      };
      fReader.addEventListener('load', onLoad);
      fReader.readAsDataURL(selectedFile);
      return () => fReader.removeEventListener('load', onLoad);
    }
  }, [selectedFile]);

  useEffect(() => {
    const url = bgUrl || selectedFileUrl;
    const overlay =
      overlayValue.indexOf('gradient') > -1
        ? overlayValue
        : overlayValue
        ? `linear-gradient(${overlayValue}, ${overlayValue})`
        : '';
    let bgImage = `url(${url})`;
    if (overlay) {
      bgImage = `${overlay},${bgImage}`;
    }
    const css = {
      backgroundImage: bgImage,
      opacity: opacity / 100,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${positionX}% ${positionY}%`,
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
    };
    onCssChange?.(css);
  }, [
    onCssChange,
    opacity,
    overlayValue,
    selectedFileUrl,
    bgUrl,
    positionX,
    positionY,
  ]);

  return (
    <form className="input-form">
      <label>
        Choose background image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0])}
        />
      </label>
      <label>
        Background image url
        <input
          type="text"
          value={bgUrl}
          onChange={(e) => setBgUrl(e.target.value)}
        />
      </label>
      <label>
        Overlay color (overlay will be displayed between bg image and text)
        (include opacity in the text, like rgba(0,0,0,0.25)) (or paste full
        gradient code for custom gradients)
        <input
          type="text"
          value={overlayValue}
          onChange={(e) => setOverlayValue(e.target.value)}
        />
      </label>
      <label>
        Opacity
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => setOpacity(parseFloat(e.target.value))}
        />
      </label>
      <div className="input-form-bg-position">
        <label>
          Position horizontal shift
          <input
            type="range"
            min="0"
            max="100"
            value={positionX}
            onChange={(e) => setPositionX(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Position vertical shift
          <input
            type="range"
            min="0"
            max="100"
            value={positionY}
            onChange={(e) => setPositionY(parseFloat(e.target.value))}
          />
        </label>
      </div>
    </form>
  );
}

function Preview({ css }: { css: Record<string, any> }) {
  return (
    <>
      <div className="preview-div" style={css}>
        <TextEditor />
      </div>
      <pre>
        {Object.entries(css).map(
          ([key, value]) => `${key}: ${value.toString().slice(0, 100)};\n`
        )}
      </pre>
    </>
  );
}

function TextEditor() {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState('Double Click to Edit');
  const onDoubleClick = function () {
    setEditMode((t) => !t);
  };
  return editMode ? (
    <div className="d-flex flex-col align-items-start justify-content-start revert-text-color">
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => setEditMode(false)}>Finish Edit</button>
    </div>
  ) : (
    <span className="preview-text" onDoubleClick={onDoubleClick}>
      {text}
    </span>
  );
}

export default App;
